<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSystem } from '@/composables/useDesignSystem'
import {
  SunnyOutline,
  MoonOutline,
  SettingsOutline,
  ColorPaletteOutline,
  PhonePortraitOutline,
  DesktopOutline
} from '@vicons/ionicons5'

interface Props {
  showModeToggle?: boolean      // Afficher les boutons mode (☀️🌙)
  showPresetSelector?: boolean  // Afficher le sélecteur de presets
  showColorPicker?: boolean     // Afficher le color picker
  showSystemInfo?: boolean      // Afficher les infos système (VueUse)
  autoAdaptive?: boolean        // Configuration automatique selon l'appareil
  size?: 'small' | 'medium' | 'large'  // Taille des composants
  compact?: boolean             // Layout compact (vertical)
  gaming?: boolean              // Effets visuels gaming
}

interface Emits {
  'mode-change': [mode: 'light' | 'dark']
  'preset-change': [preset: string]
  'color-change': [colorKey: string, color: string]
  'system-reset': []
}

// Définition des props avec valeurs par défaut
const props = withDefaults(defineProps<Props>(), {
  showModeToggle: true,
  showPresetSelector: true,
  showColorPicker: false,
  showSystemInfo: false,
  autoAdaptive: true,
  size: 'medium',
  compact: false,
  gaming: true
})

// Définition des émissions d'événements
const emit = defineEmits<Emits>()

// Utilisation du Design System avec VueUse
const designSystem = useDesignSystem({
  autoDetectPreferences: true,
  syncWithSystem: true,
  enableReducedMotion: true
})

// Accès au store via le design system
const { themeStore } = designSystem

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

// Configuration des presets (utilise les données du store)
const presetOptions = computed(() => themeStore.availablePresets)

// Gestionnaire pour le changement de mode de thème (avec VueUse)
const handleModeChange = (mode: 'light' | 'dark') => {
  designSystem.smartToggle() // Utilise le toggle intelligent de VueUse
  emit('mode-change', mode)
}

// Gestionnaire pour le changement de préréglage de thème
const handlePresetChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const preset = target.value as any
  
  // Utilise la méthode avec gestion des animations
  designSystem.setPresetWithMotion(preset)
  emit('preset-change', preset)
}

// Gestionnaire pour le basculement rapide de thème
const handleToggleTheme = () => {
  designSystem.smartToggle()
}

// Gestionnaire pour reset aux préférences système
const handleSystemReset = () => {
  designSystem.resetToSystemPreferences()
  emit('system-reset')
}

// Gestionnaire pour le changement de couleur personnalisée
const handleColorChange = (colorKey: string, event: Event) => {
  const target = event.target as HTMLInputElement
  const color = target.value
  themeStore.setCustomColor(colorKey, color)
  emit('color-change', colorKey, color)
}

// Configuration adaptative basée sur VueUse
const adaptiveConfig = computed(() => {
  if (!props.autoAdaptive) {
    return {
      size: props.size,
      compact: props.compact,
      gaming: props.gaming && !designSystem.isReducedMotion,
      showPresetSelector: props.showPresetSelector,
      showColorPicker: props.showColorPicker
    }
  }
  
  // Configuration automatique selon l'appareil et les préférences
  const optimal = designSystem.optimalThemeSelectorConfig.value
  return {
    size: optimal.size,
    compact: optimal.compact,
    gaming: optimal.gaming,
    showPresetSelector: optimal.showPresetSelector,
    showColorPicker: optimal.showColorPicker
  }
})

// Classes CSS calculées pour les effets de jeu
const gamingClasses = computed(() => {
  if (!adaptiveConfig.value.gaming) return ''

  return [
    'ds-theme-selector-gaming',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'hover:glow',
    'rounded-md'
  ].join(' ')
})

// Classes de taille calculées selon la configuration adaptative
const sizeClasses = computed(() => {
  switch (adaptiveConfig.value.size) {
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
        { 'ds-theme-compact': adaptiveConfig.compact }
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
      <template v-if="adaptiveConfig.showPresetSelector">
        <div class="ds-theme-divider" />
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
      </template>

      <!-- Color Picker pour customisation -->
      <template v-if="adaptiveConfig.showColorPicker">
        <div class="ds-theme-divider" />
        <div class="ds-color-picker-group">
          <input
            type="color"
            :value="themeStore.customColors.primary || themeStore.currentPreset?.colors.primary || '#4338ca'"
            @change="handleColorChange('primary', $event)"
            class="ds-color-input"
            title="Couleur primaire"
          >
          <input
            type="color"
            :value="themeStore.customColors.accent || themeStore.currentPreset?.colors.accent || '#9333ea'"
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

      <!-- Informations système VueUse -->
      <template v-if="showSystemInfo">
        <div class="ds-theme-divider" />
        <div class="ds-system-info">
          <div class="ds-info-item" :title="`Préférence système: ${designSystem.preferredColorScheme.value}`">
            <component :is="designSystem.preferredColorScheme.value === 'dark' ? MoonOutline : SunnyOutline" />
          </div>
          <div class="ds-info-item" :title="`Appareil: ${designSystem.deviceType}`">
            <component :is="designSystem.isMobile ? PhonePortraitOutline : DesktopOutline" />
          </div>
          <button
            @click="handleSystemReset"
            class="ds-system-reset-btn"
            title="Retour aux préférences système"
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
/* INFORMATIONS SYSTÈME (VUEUSE) */
/* ================================ */

.ds-system-info {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
}

.ds-info-item {
  width: 32px;
  height: 32px;
  border: 1px solid var(--border);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--text-muted);
  background: var(--surface);
  cursor: help;
}

.ds-system-reset-btn {
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

.ds-system-reset-btn:hover {
  background: var(--accent);
  color: var(--on-accent);
  border-color: var(--accent);
  transform: scale(1.05);
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
  .ds-theme-toggle-btn,
  .ds-system-reset-btn {
    animation: none !important;
    transition: none !important;
  }
  
  .ds-theme-selector-gaming::before {
    display: none !important;
  }
}
</style>