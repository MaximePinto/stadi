<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
// import { useUserStore } from '@/stores/user' // Plus nécessaire ici
import DefaultLayout from './layouts/DefaultLayout.vue'
import AuthLayout from './layouts/AuthLayout.vue'
import GlobalLoader from './components/GlobalLoader.vue'

const route = useRoute()

const layouts = {
  Default: DefaultLayout,
  Auth: AuthLayout
}

const currentLayout = computed(() => {
  const layoutName = route.meta?.layout || 'Default'
  return layouts[layoutName as keyof typeof layouts] || layouts.Default
})

</script>

<template>
  <component :is="currentLayout">
    <RouterView />
  </component>
  <GlobalLoader />
</template>