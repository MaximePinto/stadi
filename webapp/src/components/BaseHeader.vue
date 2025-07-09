<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
import { DsThemeSelector } from '@/components/UI'

const user = useUserStore()
</script>

<template>
  <header
    class="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 text-white shadow-md"
  >
    <nav
      class="container mx-auto flex flex-wrap justify-between items-center p-4"
    >
      <div class="flex space-x-6 font-medium">
        <RouterLink class="hover:text-blue-400" to="/">Accueil</RouterLink>
        <RouterLink class="hover:text-blue-400" to="/about">À propos</RouterLink>
        <RouterLink class="hover:text-blue-400" to="/heroes">Héros</RouterLink>
        <RouterLink
          v-if="user.isAdmin"
          class="hover:text-blue-400"
          to="/admin"
        >Administration</RouterLink>
        <RouterLink class="hover:text-blue-400" to="/theme-demo">🎨 Thèmes</RouterLink>
      </div>

      <div class="flex items-center space-x-4">
        <!-- Sélecteur de thème -->
        <DsThemeSelector
          :compact="true"
          :size="'small'"
          :show-advanced="false"
          class="theme-selector-header"
        />

        <!-- Bouton de connexion/déconnexion -->
        <div>
          <RouterLink
            v-if="!user.isLogged"
            to="/login"
            class="hover:text-blue-400"
            >Connexion</RouterLink
          >
          <button
            v-else
            @click="user.logout()"
            class="hover:text-blue-400"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.theme-selector-header {
  /* Ajustements pour l'intégration dans le header */
  background: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.2);
  backdrop-filter: blur(10px);
}

.theme-selector-header:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

/* Responsive */
@media (max-width: 768px) {
  nav {
    flex-direction: column;
    gap: var(--ds-spacing-md);
  }

  .theme-selector-header {
    order: -1; /* Placer le sélecteur en premier sur mobile */
  }
}
</style>
