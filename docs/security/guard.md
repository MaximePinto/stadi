# Guard fetchMe - Système de protection des routes

## Vue d'ensemble

Le guard est un système de protection des routes côté frontend qui utilise le router guard de Vue Router pour sécuriser l'application. Il intercepte toutes les navigations et applique une logique de protection basée sur l'état d'authentification de l'utilisateur.

## Architecture du guard

### Composant principal

**Router Guard** (`webapp/src/router/index.ts`)
- Intercepte toutes les navigations via `router.beforeEach`
- Applique la logique de protection des routes
- Gère les redirections automatiques

### Dépendances

1. **Store User** (`webapp/src/stores/user.ts`)
   - Fournit l'état d'authentification (`isLogged`, `isAdmin`)
   - Expose la méthode `fetchMe()` pour récupérer les données utilisateur

2. **Service API** (`webapp/src/services/api.ts`)
   - Gère les requêtes HTTP avec authentification automatique
   - Utilise les cookies HTTP-only pour la sécurité

## Implémentation du guard

### Configuration du router

```typescript
// webapp/src/router/index.ts
import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '../stores/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'home', component: HomeView },
    { path: '/about', name: 'about', component: () => import('../views/AboutView.vue') },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue'),
      meta: { layout: 'Auth', fetchMe: false }
    },
    { 
      path: '/admin', 
      name: 'admin', 
      component: () => import('../views/AdminView.vue'), 
      meta: { requiresAdmin: true } 
    },
    // ... autres routes
  ],
})
```

### Logique du guard

```typescript
router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // Récupérer les données user SAUF si explicitement désactivé
  if (to.meta.fetchMe !== false) {
    await store.fetchMe()
  }

  // Route login
  if (to.path === '/login') {
    await store.logoutWithoutRedirect()
    return
  }

  // Vérification de l'authentification pour les routes protégées
  if (!store.isLogged) {
    return '/login'
  }

  // Vérification des droits admin si nécessaire
  if (to.meta.requiresAdmin && !store.isAdmin) {
    return '/'
  }

  next()
})
```

## Fonctionnement détaillé

### 1. Interception des navigations

Le guard s'exécute **avant chaque navigation** et suit cette logique :

1. **Récupération des données utilisateur**
   - Appel de `store.fetchMe()` sauf si `meta.fetchMe === false`
   - Met à jour l'état d'authentification

2. **Gestion de la page de login**
   - Si navigation vers `/login` → déconnexion automatique
   - Évite les conflits d'état

3. **Vérification d'authentification**
   - Si non connecté → redirection vers `/login`
   - Si connecté → continuation

4. **Vérification des droits admin**
   - Si route admin sans droits → redirection vers `/`
   - Si droits suffisants → continuation

5. **Autorisation de navigation**
   - Appel de `next()` pour autoriser la navigation

### 2. Métadonnées des routes

#### fetchMe: false
```typescript
{
  path: '/login',
  meta: { fetchMe: false }  // Pas d'appel fetchMe
}
```
- Désactive l'appel automatique de `fetchMe()`
- Utilisé pour les pages publiques

#### requiresAdmin: true
```typescript
{
  path: '/admin',
  meta: { requiresAdmin: true }  // Vérification admin
}
```
- Ajoute une vérification du rôle admin
- Redirection si l'utilisateur n'est pas admin

#### Par défaut
```typescript
{
  path: '/',
  // Pas de meta spécifique
}
```
- `fetchMe()` appelé automatiquement
- Authentification requise
- Pas de vérification admin

## Types de protection

### 1. Protection d'authentification (par défaut)

**Comportement :**
- Toutes les routes nécessitent une authentification
- Redirection automatique vers `/login` si non connecté
- Appel automatique de `fetchMe()` pour vérifier l'état

**Exemple :**
```typescript
{ path: '/heroes', name: 'heroes', component: () => import('../views/HeroesView.vue') }
```

### 2. Routes publiques

**Comportement :**
- Pas de vérification d'authentification
- `fetchMe()` désactivé
- Déconnexion automatique si accès en étant connecté

**Exemple :**
```typescript
{
  path: '/login',
  name: 'login',
  component: () => import('../views/LoginView.vue'),
  meta: { layout: 'Auth', fetchMe: false }
}
```

### 3. Routes admin

**Comportement :**
- Authentification requise
- Vérification supplémentaire du rôle `ROLE_ADMIN`
- Redirection vers `/` si pas admin

**Exemple :**
```typescript
{ 
  path: '/admin', 
  name: 'admin', 
  component: () => import('../views/AdminView.vue'), 
  meta: { requiresAdmin: true } 
}
```

## Flux de navigation

### Navigation normale (utilisateur connecté)

```
1. Navigation vers /heroes
2. Guard s'exécute
3. fetchMe() appelé → utilisateur récupéré
4. isLogged = true → navigation autorisée
5. Page /heroes affichée
```

### Navigation sans authentification

```
1. Navigation vers /heroes
2. Guard s'exécute
3. fetchMe() appelé → échec (401)
4. isLogged = false → redirection vers /login
5. Page /login affichée
```

### Navigation admin sans droits

```
1. Navigation vers /admin
2. Guard s'exécute
3. fetchMe() appelé → utilisateur récupéré
4. isLogged = true → continuation
5. isAdmin = false → redirection vers /
6. Page d'accueil affichée
```

### Navigation vers login (connecté)

```
1. Navigation vers /login
2. Guard s'exécute
3. fetchMe() désactivé (meta.fetchMe = false)
4. logoutWithoutRedirect() appelé
5. Navigation vers /login autorisée
6. Page /login affichée (déconnecté)
```

## Gestion des erreurs

### Erreur réseau lors de fetchMe

```typescript
// Dans le store user
async function fetchMe() {
  try {
    user.value = await api.get<User>('/api/me')
  } catch {
    user.value = null  // Échec silencieux
  }
}
```

**Comportement du guard :**
- `fetchMe()` échoue silencieusement
- `user.value` devient `null`
- `isLogged` devient `false`
- Redirection automatique vers `/login`

### Session expirée

**Comportement :**
- Backend retourne 401
- `fetchMe()` échoue
- Utilisateur redirigé vers `/login`
- Pas de message d'erreur affiché

## Configuration avancée

### Ajouter de nouveaux types de protection

```typescript
// Exemple : route modérateur
{
  path: '/moderation',
  name: 'moderation',
  component: () => import('../views/ModerationView.vue'),
  meta: { requiresModerator: true }
}

// Dans le guard
if (to.meta.requiresModerator && !store.isModerator) {
  return '/'
}
```

### Désactiver complètement le guard

```typescript
// Pour une route complètement publique
{
  path: '/public',
  name: 'public',
  component: () => import('../views/PublicView.vue'),
  meta: { fetchMe: false, public: true }
}

// Dans le guard
if (to.meta.public) {
  return next()
}
```

## Bonnes pratiques

### 1. Toujours définir les métadonnées

```typescript
// ✅ Bon
{
  path: '/login',
  meta: { fetchMe: false }
}

// ❌ Éviter
{
  path: '/login'
  // Pas de meta définie
}
```

### 2. Utiliser les computed properties du store

```typescript
// ✅ Bon
if (!store.isLogged) {
  return '/login'
}

// ❌ Éviter
if (!store.user) {
  return '/login'
}
```

### 3. Gérer les redirections de manière cohérente

```typescript
// ✅ Bon - Redirections logiques
if (!store.isLogged) return '/login'
if (to.meta.requiresAdmin && !store.isAdmin) return '/'

// ❌ Éviter - Redirections incohérentes
if (!store.isLogged) return '/about'
if (to.meta.requiresAdmin && !store.isAdmin) return '/heroes'
```

### 4. Éviter les appels fetchMe multiples

```typescript
// ✅ Bon - Le guard gère fetchMe automatiquement
router.beforeEach(async (to, from, next) => {
  if (to.meta.fetchMe !== false) {
    await store.fetchMe()
  }
  // ...
})

// ❌ Éviter - Appels manuels dans les composants
onMounted(async () => {
  await store.fetchMe()  // Déjà fait par le guard
})
```

## Intégration avec Vue Router

### Ordre d'exécution

1. **Navigation déclenchée** (clic, programmatique)
2. **Router guard s'exécute** (`beforeEach`)
3. **fetchMe() appelé** (si activé)
4. **Vérifications effectuées** (auth, admin)
5. **Redirection ou continuation**
6. **Composant monté** (si autorisé)

### Hooks disponibles

```typescript
// Guard global (déjà implémenté)
router.beforeEach(async (to, from, next) => {
  // Logique de protection
})

// Autres hooks disponibles si nécessaire
router.beforeResolve(async (to, from) => {
  // Logique supplémentaire
})

router.afterEach((to, from) => {
  // Actions post-navigation
})
``` 