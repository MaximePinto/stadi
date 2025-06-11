<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()
const userStore = useUserStore()

// Map des layouts disponibles
const layouts = {
  Default: DefaultLayout,
  Auth: AuthLayout
}

// Récupère le layout depuis les meta de la route (défaut: Default)
const currentLayout = computed(() => {
  const layoutName = route.meta?.layout || 'Default'
  return layouts[layoutName as keyof typeof layouts] || layouts.Default
})

// ✅ Vérifier si l'app est prête à être affichée
const isAppReady = computed(() => userStore.isInitialized)
</script>

<template>
  <!-- ✅ Écran de chargement pendant l'initialisation -->
  <div v-if="!isAppReady" class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="text-center">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
      <p class="mt-4 text-gray-600">Chargement...</p>
    </div>
  </div>

  <!-- ✅ App normale avec layouts une fois initialisée -->
  <component v-else :is="currentLayout">
    <RouterView />
  </component>
</template>