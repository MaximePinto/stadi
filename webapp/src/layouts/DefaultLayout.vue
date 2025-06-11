<template>
  <div class="min-h-screen flex flex-col">
    <BaseHeader />
    <main class="flex-grow container mx-auto px-4 py-8">
      <slot></slot>
    </main>
    <BaseFooter />
  </div>
</template>

<script setup lang="ts">
import BaseHeader from '../components/BaseHeader.vue'
import BaseFooter from '../components/BaseFooter.vue'
// Layout logic here if needed
</script>
