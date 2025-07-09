# Gestion de fetchMe - Mécanisme de récupération des données utilisateur

## Qu'est-ce que fetchMe ?

`fetchMe` est une méthode du store utilisateur qui récupère les informations de l'utilisateur actuellement connecté depuis le backend. Elle constitue le cœur du système d'authentification côté frontend.

## Implémentation

### Définition dans le store user

```typescript
// webapp/src/stores/user.ts
async function fetchMe() {
  try {
    user.value = await api.get<User>('/api/me')
  } catch {
    user.value = null
  }
}
```

### Interface User

```typescript
// webapp/src/types/entities.ts
export interface User {
  id: number;
  email: string;
  roles: string[];
}
```

## Fonctionnement

### 1. Appel à l'API

- **Endpoint** : `GET /api/me`
- **Authentification** : Automatique via cookies HTTP-only
- **Réponse** : Données utilisateur ou erreur 401

### 2. Gestion des réponses

#### Succès (utilisateur authentifié)
```json
{
  "id": 1,
  "email": "user@example.com",
  "roles": ["ROLE_USER", "ROLE_ADMIN"]
}
```
→ `user.value` est mis à jour avec les données

#### Échec (non authentifié)
- Backend retourne une erreur 401
- `user.value` devient `null`
- Aucune erreur affichée à l'utilisateur

### 3. Gestion silencieuse des erreurs

```typescript
try {
  user.value = await api.get<User>('/api/me')
} catch {
  user.value = null  // Échec silencieux
}
```

**Pourquoi une gestion silencieuse ?**
- Évite les messages d'erreur inutiles
- L'utilisateur sera automatiquement redirigé vers `/login`
- UX fluide sans interruption

## Utilisation dans l'application

### 1. Appel automatique via le router guard

```typescript
// webapp/src/router/index.ts
router.beforeEach(async (to, from, next) => {
  const store = useUserStore()

  // Récupérer les données user SAUF si explicitement désactivé
  if (to.meta.fetchMe !== false) {
    await store.fetchMe()
  }
  // ...
})
```

**Comportement :**
- Appelé automatiquement à chaque navigation
- Peut être désactivé avec `meta: { fetchMe: false }`
- Garantit que l'état utilisateur est toujours à jour

### 2. Appel manuel lors de la connexion

```typescript
async function login(email: string, password: string): Promise<boolean> {
  try {
    await api.post('/api/login_check', { email, password })
    await fetchMe()  // Récupère les données après connexion
    await router.push('/')
    return true
  } catch {
    return false
  }
}
```

### 3. Utilisation dans les composants

```typescript
// Dans un composant Vue
const userStore = useUserStore()

// Accès aux données utilisateur
console.log(userStore.user?.email)
console.log(userStore.isLogged)  // computed property
console.log(userStore.isAdmin)   // computed property
```

## États possibles

### 1. Utilisateur connecté
```typescript
user.value = {
  id: 1,
  email: "admin@example.com",
  roles: ["ROLE_USER", "ROLE_ADMIN"]
}
```

### 2. Utilisateur non connecté
```typescript
user.value = null
```

### 3. État de chargement
- Pendant l'appel à `fetchMe()`
- L'utilisateur peut voir un loader si configuré

## Computed Properties

### isLogged
```typescript
const isLogged = computed(() => !!user.value)
```
- `true` si `user.value` existe
- `false` si `user.value` est `null`

### isAdmin
```typescript
const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN'))
```
- `true` si l'utilisateur a le rôle `ROLE_ADMIN`
- `false` sinon (même si connecté)

## Configuration des routes

### Désactiver fetchMe
```typescript
{
  path: '/login',
  name: 'login',
  component: () => import('../views/LoginView.vue'),
  meta: { layout: 'Auth', fetchMe: false }  // Pas d'appel fetchMe
}
```

### Activer fetchMe (par défaut)
```typescript
{ 
  path: '/', 
  name: 'home', 
  component: HomeView 
  // fetchMe sera appelé automatiquement
}
```

## Cas d'usage

### 1. Vérification d'authentification
```typescript
if (!store.isLogged) {
  // Redirection vers login
  router.push('/login')
}
```

### 2. Vérification des droits admin
```typescript
if (to.meta.requiresAdmin && !store.isAdmin) {
  // Redirection vers page d'accueil
  return '/'
}
```

### 3. Affichage conditionnel
```vue
<template>
  <div v-if="userStore.isLogged">
    Bienvenue {{ userStore.user?.email }}
  </div>
  <div v-else>
    <RouterLink to="/login">Se connecter</RouterLink>
  </div>
</template>
```

## Gestion des erreurs

### Types d'erreurs possibles

1. **Erreur réseau**
   - Problème de connexion
   - Serveur indisponible

2. **Session expirée**
   - Cookie invalide ou expiré
   - Backend retourne 401

3. **Erreur serveur**
   - Problème côté backend
   - Erreur 500

### Stratégie de gestion

- **Toutes les erreurs** sont gérées silencieusement
- **user.value** devient `null` en cas d'échec
- **Redirection automatique** vers `/login` par le router guard
- **Pas d'affichage d'erreur** à l'utilisateur

## Bonnes pratiques

### 1. Toujours utiliser fetchMe pour vérifier l'état
```typescript
// ✅ Bon
if (store.isLogged) {
  // Action sécurisée
}

// ❌ Éviter
if (store.user) {
  // Peut être obsolète
}
```

### 2. Utiliser les computed properties
```typescript
// ✅ Bon
if (store.isAdmin) {
  // Accès admin
}

// ❌ Éviter
if (store.user?.roles.includes('ROLE_ADMIN')) {
  // Logique répétée
}
```

### 3. Gérer les états de chargement
```typescript
// Si nécessaire, ajouter un état de chargement
const isLoading = ref(false)

async function fetchMeWithLoading() {
  isLoading.value = true
  try {
    await fetchMe()
  } finally {
    isLoading.value = false
  }
}
```

### 4. Éviter les appels multiples
- `fetchMe` est déjà appelé automatiquement par le router
- Pas besoin d'appel manuel sauf cas spécifiques (connexion, rafraîchissement)

## Intégration avec le backend

### Endpoint attendu
```
GET /api/me
```

### Réponse attendue
```json
{
  "id": 1,
  "email": "user@example.com",
  "roles": ["ROLE_USER"]
}
```

### Authentification
- Via cookies HTTP-only
- Géré automatiquement par le service API
- Pas de token à gérer côté frontend 