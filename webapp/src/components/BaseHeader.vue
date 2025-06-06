<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
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
        <RouterLink
          v-if="user.isAdmin"
          class="hover:text-blue-400"
          to="/admin"
        >Administration</RouterLink>
      </div>
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
    </nav>
  </header>
</template>
