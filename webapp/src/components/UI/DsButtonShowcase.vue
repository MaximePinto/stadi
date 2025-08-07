<script setup lang="ts">
import { DsButton, DsThemeSelector } from '@/design-system'
import { useThemeStore } from '@/stores/theme'

const themeStore = useThemeStore()

const buttonVariants = ['primary', 'secondary', 'success', 'warning', 'error'] as const
const buttonSizes = ['tiny', 'small', 'medium', 'large'] as const
</script>

<template>
  <div class="p-8 space-y-8">
    <!-- Header avec sélecteur de thème -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
      <div>
        <h1 class="text-2xl font-bold mb-2">🎨 Showcase des Boutons</h1>
        <p class="text-gray-600">
          Preset actuel : <strong>{{ themeStore.preset }}</strong> | Mode : <strong>{{ themeStore.mode }}</strong>
        </p>
      </div>
      <DsThemeSelector show-color-picker />
    </div>

    <!-- Variants -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Variants</h2>
      <div class="flex flex-wrap gap-4">
        <DsButton
          v-for="variant in buttonVariants"
          :key="variant"
          :text="variant.charAt(0).toUpperCase() + variant.slice(1)"
          :variant="variant"
        />
      </div>
    </section>

    <!-- Sizes -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Tailles</h2>
      <div class="flex flex-wrap items-center gap-4">
        <DsButton
          v-for="size in buttonSizes"
          :key="size"
          :text="size.charAt(0).toUpperCase() + size.slice(1)"
          :size="size"
          variant="primary"
        />
      </div>
    </section>

    <!-- States -->
    <section>
      <h2 class="text-xl font-semibold mb-4">États</h2>
      <div class="flex flex-wrap gap-4">
        <DsButton text="Normal" variant="primary" />
        <DsButton text="Loading..." variant="primary" loading />
        <DsButton text="Disabled" variant="primary" disabled />
        <DsButton text="Ghost" variant="primary" ghost />
      </div>
    </section>

    <!-- Gaming Effects -->
    <section>
      <h2 class="text-xl font-semibold mb-4">Effets Gaming</h2>
      <div class="flex flex-wrap gap-4">
        <DsButton text="Gaming ON" variant="primary" gaming />
        <DsButton text="Gaming OFF" variant="primary" :gaming="false" />
        <DsButton text="Gaming + Ghost" variant="secondary" gaming ghost />
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Utilisation des variables CSS du design system */
.p-8 { padding: var(--space-xl); }
.space-y-8 > * + * { margin-top: var(--space-xl); }
.gap-4 { gap: var(--space-md); }
.mb-2 { margin-bottom: var(--space-xs); }
.mb-4 { margin-bottom: var(--space-md); }
</style>