<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
import { DsThemeSelector } from '@/components/UI'

const user = useUserStore()
</script>

<template>
  <header class="header-container">
    <nav class="header-nav">
      <div class="nav-links">
        <RouterLink class="nav-link" to="/">Accueil</RouterLink>
        <RouterLink class="nav-link" to="/about">À propos</RouterLink>
        <RouterLink class="nav-link" to="/heroes">Héros</RouterLink>
        <RouterLink v-if="user.isAdmin" class="nav-link" to="/admin">Administration</RouterLink>
        <RouterLink class="nav-link" to="/theme-demo">🎨 Thèmes</RouterLink>
      </div>

      <div class="header-actions">
        <DsThemeSelector show-color-picker />
        
        <div v-if="user.isLogged" class="user-menu">
          <button class="logout-btn" @click="user.logout()">Se déconnecter</button>
        </div>
        
        <div v-else class="auth-menu">
          <RouterLink class="auth-link" to="/login">Connexion</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
/* ================================ */
/* HEADER CONTAINER */
/* ================================ */

.header-container {
  background: linear-gradient(to right, var(--surface), var(--surface-hover));
  color: var(--text);
  box-shadow: var(--shadow-md);
  border-bottom: 1px solid var(--border);
}

.header-nav {
  container: mx-auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-md);
  max-width: 1200px;
  margin: 0 auto;
}

/* ================================ */
/* NAVIGATION LINKS */
/* ================================ */

.nav-links {
  display: flex;
  align-items: center;
  gap: var(--space-lg);
  font-weight: 500;
}

.nav-link {
  color: var(--text-muted);
  text-decoration: none;
  transition: color var(--transition-fast);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
}

.nav-link:hover {
  color: var(--primary);
  background: var(--surface-hover);
}

.nav-link.router-link-active {
  color: var(--primary);
  background: var(--surface-pressed);
}

/* ================================ */
/* HEADER ACTIONS */
/* ================================ */

.header-actions {
  display: flex;
  align-items: center;
  gap: var(--space-md);
}

.user-menu,
.auth-menu {
  display: flex;
  align-items: center;
  gap: var(--space-sm);
}

.logout-btn,
.auth-link {
  color: var(--text-muted);
  text-decoration: none;
  background: transparent;
  border: 1px solid var(--border);
  padding: var(--space-xs) var(--space-sm);
  border-radius: var(--radius-sm);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.logout-btn:hover {
  background: var(--error);
  color: var(--on-error);
  border-color: var(--error);
}

.auth-link:hover {
  background: var(--primary);
  color: var(--on-primary);
  border-color: var(--primary);
}

/* ================================ */
/* RESPONSIVE */
/* ================================ */

@media (max-width: 768px) {
  .header-nav {
    flex-direction: column;
    gap: var(--space-md);
  }

  .nav-links {
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--space-sm);
  }

  .header-actions {
    order: -1; /* Placer les actions en premier sur mobile */
  }
}

@media (max-width: 480px) {
  .nav-links {
    flex-direction: column;
    width: 100%;
    text-align: center;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
    padding: var(--space-sm);
  }
}
</style>