<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { useUserStore } from '../stores/user'
const user = useUserStore()
</script>

<template>
  <header class="bg-gray-800 text-white p-4">
    <nav class="container mx-auto flex justify-between items-center">
      <div class="flex space-x-4">
        <RouterLink class="hover:underline" to="/">Accueil</RouterLink>
        <RouterLink class="hover:underline" to="/about">À propos</RouterLink>
        <RouterLink
          v-if="user.isAdmin"
          class="hover:underline"
          to="/admin"
        >Administration</RouterLink>
      </div>
      <div>
        <RouterLink v-if="!user.isLogged" to="/login" class="hover:underline"
          >Connexion</RouterLink>
        <button
          v-else
          @click="user.logout()"
          class="hover:underline"
        >Se déconnecter</button>
      </div>
    </nav>
  </header>
</template>
