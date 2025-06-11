<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'

const route = useRoute()

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
</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
</template>
