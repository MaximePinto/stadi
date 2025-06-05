# Stadi

Stadi est un outil de création de builds pour **Overwatch 2** dans son mode **Stadium**. Ce dépôt réunit une API Symfony et une application Vue 3 permettant de gérer les données et l'interface utilisateur nécessaires à la composition des builds.

## Fonctionnalités principales
- Création et gestion de builds pour OW2 Stadium.
- Backend API en **Symfony 7.3** (PHP 8.3).
- Frontend en **Vue 3** propulsé par **Vite**.
- Environnement de développement conteneurisé avec **DDEV**, incluant Node 22 et MariaDB 10.11.
- Tests unitaires via **Vitest** et tests end‑to‑end via **Cypress**.

## Structure du projet
- `backend/` : code de l’API Symfony.
- `webapp/` : application Vue 3 générée par Vite.
- `.ddev/` : configuration DDEV pour lancer les conteneurs locaux.
- `Makefile` : raccourcis pour l’installation, le démarrage et diverses tâches.

## Installation
1. Installez les dépendances en lançant :
   ```bash
   make install
   ```
   Cette commande démarre DDEV, installe les dépendances PHP avec Composer puis les dépendances Node de l’interface.
2. Une fois l’installation terminée, les URL de développement sont affichées :
   - API : `https://stadi.ddev.site`
   - Frontend : `https://app.stadi.ddev.site`

## Développement
- Lancer l’environnement complet et le serveur de développement :
  ```bash
  make up
  ```
- Accéder à un shell dans le conteneur principal :
  ```bash
  make ssh
  ```

Les variables d’environnement par défaut (base de données, serveur SMTP, etc.) sont définies dans le fichier `.env.local`.

## Authentification API
L’API utilise maintenant un système **JWT**. Deux points d’entrée principaux sont disponibles :

- `POST /api/register` : crée un nouvel utilisateur en envoyant un `email` et un `password` dans le corps JSON.
- `POST /api/login` : retourne un token JWT à partir des mêmes informations d’identification.

Pour accéder aux routes protégées, ajoutez l’en‑tête :

```http
Authorization: Bearer <token>
```

Un exemple de route protégée est `GET /api/me` qui retourne les informations de l’utilisateur connecté.

## Tests
Dans `webapp/` :
- Exécuter les tests unitaires :
  ```bash
  npm run test:unit -- --run
  ```
- Lancer les tests end‑to‑end :
  ```bash
  npm run test:e2e
  ```

## Construction pour la production
- Construire l’interface Vue :
  ```bash
  npm run build
  ```

## Contributions
Les issues et pull requests sont les bienvenues pour améliorer l’outil et ajouter de nouvelles fonctionnalités autour des builds Stadium d’Overwatch 2.
