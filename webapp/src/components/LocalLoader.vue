<script setup lang="ts">
// Ce composant reçoit une seule prop : 'loading' (un booléen)
defineProps({
  loading: {
    type: Boolean,
    required: true
  }
})
</script>

<template>
  <Transition name="fade-local">
    <div
      v-if="loading"
      class="absolute inset-0 z-10 flex items-center justify-center bg-white bg-opacity-70 backdrop-blur-sm"
    >
      <div class="animate-spin rounded-full h-10 w-10 border-b-2 border-blue-600"></div>
    </div>
  </Transition>
</template>

<style scoped>
/* On utilise une transition distincte pour ne pas créer de conflit */
.fade-local-enter-active,
.fade-local-leave-active {
  transition: opacity 0.2s ease;
}

.fade-local-enter-from,
.fade-local-leave-to {
  opacity: 0;
}
</style>