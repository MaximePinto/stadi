<script setup lang="ts">
import { computed } from 'vue'
import { useThemeStore } from '@/stores/theme'
import {
  SunnyOutline,
  MoonOutline,
  SettingsOutline,
  ColorPaletteOutline
} from '@vicons/ionicons5'

interface Props {
  showModeToggle?: boolean      // Afficher les boutons mode (☀️🌙)
  showPresetSelector?: boolean  // Afficher le sélecteur de presets
  showColorPicker?: boolean     // Afficher le color picker
  size?: 'small' | 'medium' | 'large'  // Taille des composants
  compact?: boolean             // Layout compact (vertical)
  gaming?: boolean              // Effets visuels gaming
}

interface Emits {
  'mode-change': [mode: 'light' | 'dark']
  'preset-change': [preset: string]
  'color-change': [colorKey: string, color: string]
}

// Définition des props avec valeurs par défaut
const props = withDefaults(defineProps<Props>(), {
  showModeToggle: true,
  showPresetSelector: true,
  showColorPicker: false,
  size: 'medium',
  compact: false,
  gaming: true
})

// Définition des émissions d'événements
const emit = defineEmits<Emits>()

// Utilisation du store de thème
const themeStore = useThemeStore()

// Configuration des options pour le sélecteur de mode
const modeOptions = [
  {
    label: 'Clair',
    value: 'light' as const,
    icon: SunnyOutline
  },
  {
    label: 'Sombre',
    value: 'dark' as const,
    icon: MoonOutline
  }
]

// Configuration des presets
const presetOptions = [
  { label: 'Indigo Gaming', value: 'indigo', description: 'Thème par défaut avec indigo' },
  { label: 'Gaming Purple', value: 'gaming', description: 'Style gaming avec purple' },
  { label: 'Ocean Blue', value: 'ocean', description: 'Thème océan avec cyan' },
  { label: 'Forest Green', value: 'forest', description: 'Thème nature avec emerald' }
]

// Gestionnaire pour le changement de mode de thème
const handleModeChange = (mode: 'light' | 'dark') => {
  themeStore.setMode(mode)
  emit('mode-change', mode)
}

// Gestionnaire pour le changement de préréglage de thème
const handlePresetChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const preset = target.value as any
  themeStore.setPreset(preset)
  emit('preset-change', preset)
}

// Gestionnaire pour le basculement rapide de thème
const handleToggleTheme = () => {
  themeStore.toggleMode()
}

// Gestionnaire pour le changement de couleur personnalisée
const handleColorChange = (colorKey: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const color = target.value
  themeStore.setCustomColor(colorKey, color)
  emit('color-change', colorKey, color)
}

// Classes CSS calculées pour les effets de jeu
const gamingClasses = computed(() => {
  if (!props.gaming) return ''

  return [
    'ds-theme-selector-gaming',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'hover:glow',
    'rounded-md'
  ].join(' ')
})

// Classes de taille calculées selon la prop size
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
    <div
      :class="[
        'ds-theme-container',
        { 'ds-theme-compact': compact }
      ]"
    >
      <!-- Sélecteur de mode de thème (☀️🌙) -->
      <template v-if="showModeToggle">
        <button
          v-for="option in modeOptions"
          :key="option.value"
          :class="[
            'ds-theme-mode-btn',
            { 'ds-theme-mode-active': themeStore.mode === option.value }
          ]"
          :aria-label="option.label"
          @click="handleModeChange(option.value)"
          type="button"
        >
          <component :is="option.icon" />
        </button>
        
        <div class="ds-theme-divider" />
        
        <!-- Bascule rapide light/dark -->
        <button
          class="ds-theme-toggle-btn"
          aria-label="Basculer thème"
          @click="handleToggleTheme"
          type="button"
        >
          <component :is="themeStore.mode === 'dark' ? SunnyOutline : MoonOutline" />
        </button>
      </template>

      <!-- Sélecteur de préréglage -->
      <template v-if="showPresetSelector">
        <div class="ds-theme-divider" />
        <select
          :value="themeStore.preset"
          class="ds-theme-preset-select"
          @change="handlePresetChange"
        >
          <option
            v-for="option in presetOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </template>

      <!-- Color Picker pour customisation -->
      <template v-if="showColorPicker">
        <div class="ds-theme-divider" />
        <div class="ds-color-picker-group">
          <input
            type="color"
            :value="themeStore.customColors.primary || '#4338ca'"
            @change="handleColorChange('primary', $event)"
            class="ds-color-input"
            title="Couleur primaire"
          >
          <input
            type="color"
            :value="themeStore.customColors.accent || '#9333ea'"
            @change="handleColorChange('accent', $event)"
            class="ds-color-input"
            title="Couleur d'accent"
          >
          <button
            @click="themeStore.resetCustomColors()"
            class="ds-reset-btn"
            title="Reset couleurs"
          >
            <SettingsOutline />
          </button>
        </div>
      </template>
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

.ds-theme-compact {
  flex-direction: column;
  gap: var(--space-xs);
}

/* ================================ */
/* BOUTONS DE MODE */
/* ================================ */

.ds-theme-mode-btn {
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

.ds-theme-mode-btn:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
  border-color: var(--border-hover);
}

.ds-theme-mode-active {
  background: var(--primary) !important;
  color: var(--on-primary) !important;
  border-color: var(--primary) !important;
  box-shadow: var(--shadow-glow-primary);
}

.ds-theme-mode-active:hover {
  background: var(--primary-hover) !important;
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
/* COLOR PICKER */
/* ================================ */

.ds-color-picker-group {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.ds-color-input {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 50%;
  cursor: pointer;
  background: none;
  padding: 0;
  overflow: hidden;
}

.ds-color-input::-webkit-color-swatch-wrapper {
  padding: 0;
}

.ds-color-input::-webkit-color-swatch {
  border: none;
  border-radius: 50%;
}

.ds-reset-btn {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 50%;
  background: transparent;
  color: var(--text);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all var(--transition-fast);
}

.ds-reset-btn:hover {
  background: var(--error);
  color: var(--on-error);
  border-color: var(--error);
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

.ds-theme-compact .ds-theme-divider {
  width: 100%;
  height: 1px;
  margin: var(--space-xs) 0;
}

/* ================================ */
/* TAILLES */
/* ================================ */

.ds-theme-size-small .ds-theme-mode-btn,
.ds-theme-size-small .ds-theme-toggle-btn,
.ds-theme-size-small .ds-color-input,
.ds-theme-size-small .ds-reset-btn {
  width: 28px;
  height: 28px;
}

.ds-theme-size-large .ds-theme-mode-btn,
.ds-theme-size-large .ds-theme-toggle-btn,
.ds-theme-size-large .ds-color-input,
.ds-theme-size-large .ds-reset-btn {
  width: 48px;
  height: 48px;
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
/* RESPONSIVE */
/* ================================ */

@media (max-width: 640px) {
  .ds-theme-selector {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .ds-theme-container {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .ds-theme-divider {
    width: 100%;
    height: 1px;
    margin: var(--space-xs) 0;
  }
}

/* ================================ */
/* ACCESSIBILITÉ */
/* ================================ */

.ds-theme-mode-btn:focus,
.ds-theme-toggle-btn:focus,
.ds-reset-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--primary) 40%, transparent);
}

.ds-theme-mode-btn:active,
.ds-theme-toggle-btn:active,
.ds-reset-btn:active {
  transform: scale(0.95);
}

@media (prefers-reduced-motion: reduce) {
  .ds-theme-selector,
  .ds-theme-mode-btn,
  .ds-theme-toggle-btn {
    animation: none !important;
    transition: none !important;
  }
}
</style>