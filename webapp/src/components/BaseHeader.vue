<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
import { DsThemeSelector } from '@/components/UI'
import { useDesignSystem } from '@/design-system/composables/useDesignSystem'

const user = useUserStore()
const { currentTokens, effectiveMode } = useDesignSystem()
</script>

<template>
  <header
    class="shadow-md"
    :style="{
      background: `linear-gradient(to right, ${currentTokens.colors[effectiveMode].surface}, ${currentTokens.colors[effectiveMode].surfaceHover}, ${currentTokens.colors[effectiveMode].surfaceActive})`,
      color: currentTokens.colors[effectiveMode].textPrimary
    }"
  >
    <nav
      class="container mx-auto flex flex-wrap justify-between items-center"
      :style="{ padding: currentTokens.spacing.md }"
    >
      <div 
        class="flex font-medium"
        :style="{ gap: currentTokens.spacing.lg }"
      >
        <RouterLink 
          class="nav-link transition-colors duration-200"
          :style="{ 
            color: currentTokens.colors[effectiveMode].textSecondary
          }"
          to="/"
        >Accueil</RouterLink>
        <RouterLink 
          class="nav-link transition-colors duration-200"
          :style="{ 
            color: currentTokens.colors[effectiveMode].textSecondary
          }"
          to="/about"
        >À propos</RouterLink>
        <RouterLink 
          class="nav-link transition-colors duration-200"
          :style="{ 
            color: currentTokens.colors[effectiveMode].textSecondary
          }"
          to="/heroes"
        >Héros</RouterLink>
        <RouterLink
          v-if="user.isAdmin"
          class="nav-link transition-colors duration-200"
          :style="{ 
            color: currentTokens.colors[effectiveMode].textSecondary
          }"
          to="/admin"
        >Administration</RouterLink>
        <RouterLink 
          class="nav-link transition-colors duration-200"
          :style="{ 
            color: currentTokens.colors[effectiveMode].textSecondary
          }"
          to="/theme-demo"
        >🎨 Thèmes</RouterLink>
      </div>

      <div 
        class="flex items-center"
        :style="{ gap: currentTokens.spacing.md }"
      >
        <!-- Sélecteur de thème -->
        <DsThemeSelector/>

        <!-- Bouton de connexion/déconnexion -->
        <div>
          <RouterLink
            v-if="!user.isLogged"
            to="/login"
            class="nav-link transition-colors duration-200"
            :style="{ 
              color: currentTokens.colors[effectiveMode].textSecondary
            }"
            >Connexion</RouterLink
          >
          <button
            v-else
            @click="user.logout()"
            class="nav-link transition-colors duration-200"
            :style="{ 
              color: currentTokens.colors[effectiveMode].textSecondary
            }"
          >
            Se déconnecter
          </button>
        </div>
      </div>
    </nav>
  </header>
</template>

<style scoped>
.nav-link {
  transition: color 0.2s ease;
}

.nav-link:hover {
  color: v-bind('currentTokens.colors[effectiveMode].primaryBase') !important;
}

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
    gap: v-bind('currentTokens.spacing.md');
  }

  .theme-selector-header {
    order: -1; /* Placer le sélecteur en premier sur mobile */
  }
}
</style>
