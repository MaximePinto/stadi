<script setup lang="ts">
import BaseHeader from './components/BaseHeader.vue'
import BaseFooter from './components/BaseFooter.vue'
</script>

<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader />
    <main class="flex-grow container mx-auto py-8">
      <RouterView />
    </main>
    <BaseFooter />
  </div>
</template>
