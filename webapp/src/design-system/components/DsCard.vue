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
      bg-neutral/50        <!-- Using neutral.DEFAULT (slate-800) / 50 from preset -->
      p-md                 <!-- Using p-md (1rem) from preset spacing -->
      border border-neutral-light <!-- Using neutral.light (slate-700) for border -->
      rounded-md           <!-- Using rounded-md (0.5rem) from preset borderRadius -->
      shadow-lg            <!-- Standard Tailwind shadow -->
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
