<script setup lang="ts">
import BaseHeader from './components/BaseHeader.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <BaseHeader />
  <main class="container mx-auto py-8">
    <RouterView />
  </main>
  <BaseFooter />
</template>
