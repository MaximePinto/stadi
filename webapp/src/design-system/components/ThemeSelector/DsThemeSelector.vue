<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSystem } from '@/composables/useDesignSystem'
import { Icon } from '@iconify/vue'
import type { ThemePreset } from '@/stores/theme'

interface Props {
  size?: 'small' | 'medium' | 'large'
  gaming?: boolean
}

interface Emits {
  'mode-toggle': [mode: 'light' | 'dark']
  'preset-change': [preset: string]
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
  gaming: true
})

const emit = defineEmits<Emits>()

const designSystem = useDesignSystem({
  autoDetectPreferences: true,
  syncWithSystem: true,
  enableReducedMotion: true
})

const { themeStore } = designSystem

const presetOptions = computed(() => themeStore.availablePresets)

const handleToggleTheme = () => {
  designSystem.smartToggle()
  emit('mode-toggle', themeStore.mode)
}

const handlePresetChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const preset = target.value as ThemePreset
  
  designSystem.setPresetWithMotion(preset)
  emit('preset-change', preset)
}

const gamingClasses = computed(() => {
  if (!props.gaming || designSystem.isReducedMotion) return ''
  
  return [
    'ds-theme-selector-gaming',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'hover:glow',
    'rounded-md'
  ].join(' ')
})

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'small': return 'ds-theme-size-small'
    case 'large': return 'ds-theme-size-large'
    default: return 'ds-theme-size-medium'
  }
})
</script>

<template>
  <div
    :class="[gamingClasses, sizeClasses]"
    class="ds-theme-selector"
  >
    <div class="ds-theme-container">
      <!-- Bascule rapide light/dark -->
      <button
        class="ds-theme-toggle-btn"
        aria-label="Basculer thème"
        @click="handleToggleTheme"
        type="button"
      >
        <Icon :icon="themeStore.mode === 'dark' ? 'radix-icons:sun' : 'radix-icons:moon'" />
      </button>

      <div class="ds-theme-divider" />

      <!-- Sélecteur de préréglage -->
      <select
        :value="themeStore.preset"
        class="ds-theme-preset-select"
        @change="handlePresetChange"
      >
        <option
          v-for="option in presetOptions"
          :key="option.id"
          :value="option.id"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<style scoped>
/* ================================ */
/* BASE : Styles du sélecteur de thème */
/* ================================ */

.ds-theme-selector {
  display: inline-flex;
  align-items: center;
  padding: var(--space-sm);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
  backdrop-filter: blur(10px);
  transition: all var(--transition-normal);
}

.ds-theme-selector:hover {
  border-color: var(--border-hover);
  background: var(--surface-hover);
}

.ds-theme-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-sm);
}

/* ================================ */
/* BOUTON DE BASCULE */
/* ================================ */

.ds-theme-toggle-btn {
  position: relative;
  overflow: hidden;
  transition: all var(--transition-fast);
  background: transparent;
  border: 1px solid var(--border);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--text);
}

.ds-theme-toggle-btn:hover {
  transform: rotate(180deg) scale(1.1);
  background: var(--primary) !important;
  color: var(--on-primary) !important;
  border-color: var(--primary) !important;
}

/* ================================ */
/* SÉLECTEUR DE PRÉRÉGLAGE */
/* ================================ */

.ds-theme-preset-select {
  min-width: 140px;
  padding: 8px 12px;
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
  background: var(--surface);
  color: var(--text);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--transition-fast);
}

.ds-theme-preset-select:hover {
  transform: translateY(-1px);
  box-shadow: var(--shadow-sm);
  border-color: var(--border-hover);
}

.ds-theme-preset-select:focus {
  outline: none;
  border-color: var(--primary);
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 20%, transparent);
}

/* ================================ */
/* SÉPARATEURS */
/* ================================ */

.ds-theme-divider {
  width: 1px;
  height: 24px;
  background: var(--border);
  margin: 0 var(--space-xs);
}

/* ================================ */
/* TAILLES */
/* ================================ */

/* Small */
.ds-theme-size-small {
  padding: 4px;
}

.ds-theme-size-small .ds-theme-toggle-btn {
  width: 28px;
  height: 28px;
}

.ds-theme-size-small .ds-theme-preset-select {
  min-width: 100px;
  padding: 4px 8px;
  font-size: 12px;
}

.ds-theme-size-small .ds-theme-divider {
  height: 20px;
}

/* Large */
.ds-theme-size-large {
  padding: 12px;
}

.ds-theme-size-large .ds-theme-toggle-btn {
  width: 48px;
  height: 48px;
}

.ds-theme-size-large .ds-theme-preset-select {
  min-width: 180px;
  padding: 12px 16px;
  font-size: 16px;
}

.ds-theme-size-large .ds-theme-divider {
  height: 28px;
}

/* ================================ */
/* EFFETS DE JEU */
/* ================================ */

.ds-theme-selector-gaming {
  position: relative;
}

.ds-theme-selector-gaming::before {
  content: '';
  position: absolute;
  inset: -2px;
  background: linear-gradient(45deg,
    var(--primary),
    transparent,
    var(--primary)
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--transition-normal);
  z-index: -1;
}

.ds-theme-selector-gaming:hover::before {
  opacity: 0.3;
}

/* ================================ */
/* ACCESSIBILITÉ */
/* ================================ */

.ds-theme-toggle-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent);
}

.ds-theme-toggle-btn:active {
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .ds-theme-selector,
  .ds-theme-toggle-btn {
    animation: none !important;
    transition: none !important;
  }

  .ds-theme-selector-gaming::before {
    display: none !important;
  }
}
</style>