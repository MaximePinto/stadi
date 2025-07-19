<script setup lang="ts">
/**
 * Props for the DsCard component.
 * (No props defined for this simple version, but can be extended later)
 */
// interface Props {
//   // Example: title?: string;
// }
// const props = defineProps<Props>();
</script>

<template>
  <div
    class="
      bg-bg-soft           <!-- Using design system background soft -->
      p-lg                 <!-- Using design system spacing lg -->
      border border-border-base <!-- Using design system border base -->
      rounded-lg           <!-- Using design system border radius lg -->
      shadow-md            <!-- Using design system shadow md -->
      card                 <!-- Using design system card utility -->
    "
  >
    <slot />
  </div>
</template>

<style scoped>
/* Add any specific scoped styles if necessary */
.card-enter-active, .card-leave-active {
  transition: all 0.3s ease-out;
}
.card-enter-from, .card-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
