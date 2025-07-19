<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSystem } from '../../composables/useDesignSystem'
import type { ThemeChangeEvent } from '../../types'
import {
  SunnyOutline,
  MoonOutline,
  LaptopOutline,
  SettingsOutline
} from '@vicons/ionicons5'


 interface Props {
  showModeToggle?: boolean      // Afficher les boutons mode (☀️🌙💻)
  showPresetSelector?: boolean  // Afficher le sélecteur de presets
  showAdvanced?: boolean        // Afficher le bouton paramètres avancés
  size?: 'small' | 'medium' | 'large'  // Taille des composants
  compact?: boolean             // Layout compact (vertical)
  gaming?: boolean              // Effets visuels gaming
}

interface Emits {
  'mode-change': [mode: 'light' | 'dark' | 'auto']  // Changement de mode
  'preset-change': [preset: string]                 // Changement de preset
  'theme-change': [theme: ThemeChangeEvent]         // Tout changement
}

// Définition des props avec valeurs par défaut
const props = withDefaults(defineProps<Props>(), {
  showModeToggle: true,
  showPresetSelector: true,
  showAdvanced: false,
  size: 'medium',
  compact: false,
  gaming: true
})

// Définition des émissions d'événements
const emit = defineEmits<Emits>()

// Utilisation du système de design unifié
const {
  effectiveMode,    // Mode actuel (résout 'auto' vers 'light' ou 'dark')
  themePreset,      // Preset de thème actuel
  setThemeMode,     // Fonction pour changer le mode
  setThemePreset,   // Fonction pour changer le preset
  toggleTheme,      // Fonction pour basculer light/dark
  currentTokens,    // Tokens de design actuels
  themePresets      // Liste des presets disponibles
} = useDesignSystem()

// Configuration des options pour le sélecteur de mode (light/dark/auto)
const modeOptions = [
  {
    label: 'Clair',
    value: 'light',
    icon: SunnyOutline    // ☀️
  },
  {
    label: 'Sombre',
    value: 'dark',
    icon: MoonOutline     // 🌙
  },
  {
    label: 'Auto',
    value: 'auto',
    icon: LaptopOutline   // 💻
  }
]

// Options calculées pour le sélecteur de préréglage de thème
const presetOptions = computed(() => {
  if (!themePresets || typeof themePresets !== 'object') {
    return []
  }

  return Object.entries(themePresets).map(([key, preset]) => ({
    label: preset.name,
    value: key,
    description: preset.description
  }))
})

// Gestionnaire pour le changement de mode de thème
const handleModeChange = (mode: 'light' | 'dark' | 'auto') => {
  setThemeMode(mode)                                    // Met à jour le mode
  emit('mode-change', mode)                            // Émet l'événement
  emit('theme-change', { mode, type: 'mode' })         // Émet l'événement général
}

// Gestionnaire pour le changement de préréglage de thème
const handlePresetChange = (event: Event) => {
  const target = event.target as HTMLSelectElement
  const preset = target.value
  setThemePreset(preset)                               // Met à jour le preset
  emit('preset-change', preset)                        // Émet l'événement
  emit('theme-change', { preset, type: 'preset' })    // Émet l'événement général
}

// Gestionnaire pour le basculement rapide de thème
const handleToggleTheme = () => {
  toggleTheme()                                        // Bascule light/dark
  emit('theme-change', { type: 'toggle' })            // Émet l'événement
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

// Style CSS dynamique calculé pour les effets de jeu
const gamingStyle = computed(() => {
  if (!props.gaming) return {}

  return {
    '--gaming-glow': currentTokens.value.colors[effectiveMode.value].primary,
    boxShadow: `0 0 20px ${currentTokens.value.colors[effectiveMode.value].primary}20`
  }
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
    :style="gamingStyle"
    class="ds-theme-selector"
  >
    <div
      :class="[
        'ds-theme-container',
        { 'ds-theme-compact': compact }
      ]"
    >
      <!-- Sélecteur de mode de thème (☀️🌙💻) -->
      <template v-if="showModeToggle">
        <button
          v-for="option in modeOptions"
          :key="option.value"
          :class="[
            'ds-theme-mode-btn',
            { 'ds-theme-mode-active': effectiveMode === option.value }
          ]"
          :aria-label="option.label"
          @click="handleModeChange(option.value as 'light' | 'dark' | 'auto')"
          type="button"
        >
          <component :is="option.icon" />
        </button>
      </template>

      <!-- Bascule rapide light/dark -->
      <template v-if="showModeToggle">
        <div class="ds-theme-divider" />
        <button
          class="ds-theme-toggle-btn"
          aria-label="Basculer thème"
          @click="handleToggleTheme"
          type="button"
        >
          <component :is="effectiveMode === 'dark' ? SunnyOutline : MoonOutline" />
        </button>
      </template>

      <!-- Sélecteur de préréglage -->
      <template v-if="showPresetSelector">
        <div class="ds-theme-divider" />
        <select
          :value="themePreset"
          class="ds-theme-preset-select"
          @change="handlePresetChange"
        >
          <option value="" disabled>Choisir un thème</option>
          <option
            v-for="option in presetOptions"
            :key="option.value"
            :value="option.value"
          >
            {{ option.label }}
          </option>
        </select>
      </template>

      <!-- Paramètres avancés -->
      <template v-if="showAdvanced">
        <div class="ds-theme-divider" />
        <button
          class="ds-theme-advanced-btn"
          aria-label="Paramètres avancés"
          type="button"
        >
          <SettingsOutline />
        </button>
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
  padding: var(--ds-spacing-sm);
  background: var(--ds-bg-soft);
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-lg);
  backdrop-filter: blur(10px);
  transition: all var(--ds-transition-normal);
}

.ds-theme-selector:hover {
  border-color: var(--ds-border-hover);
  background: var(--ds-bg-base);
}

.ds-theme-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--ds-spacing-sm);
}

.ds-theme-compact {
  flex-direction: column;
  gap: var(--ds-spacing-xs);
}

/* ================================ */
/* BOUTONS DE MODE */
/* ================================ */

.ds-theme-mode-btn {
  position: relative;
  overflow: hidden;
  transition: all var(--ds-transition-fast);
  background: transparent;
  border: 1px solid var(--ds-border-base);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ds-text-primary);
}

.ds-theme-mode-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  border-color: var(--ds-border-hover);
}

.ds-theme-mode-active {
  background: var(--ds-color-primary) !important;
  color: white !important;
  border-color: var(--ds-color-primary) !important;
  box-shadow: 0 0 15px var(--ds-color-primary)40;
}

.ds-theme-mode-active:hover {
  background: var(--ds-color-primary-hover) !important;
  box-shadow: 0 0 20px var(--ds-color-primary)60;
}

/* ================================ */
/* BOUTON DE BASCULE */
/* ================================ */

.ds-theme-toggle-btn {
  position: relative;
  overflow: hidden;
  transition: all var(--ds-transition-fast);
  background: transparent;
  border: 1px solid var(--ds-border-base);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ds-text-primary);
}

.ds-theme-toggle-btn:hover {
  transform: rotate(180deg) scale(1.1);
  background: var(--ds-color-primary) !important;
  color: white !important;
  border-color: var(--ds-color-primary) !important;
}

/* ================================ */
/* SÉLECTEUR DE PRÉRÉGLAGE */
/* ================================ */

.ds-theme-preset-select {
  min-width: 140px;
  padding: 8px 12px;
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-md);
  background: var(--ds-bg-base);
  color: var(--ds-text-primary);
  font-size: 14px;
  cursor: pointer;
  transition: all var(--ds-transition-fast);
}

.ds-theme-preset-select:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-color: var(--ds-border-hover);
}

.ds-theme-preset-select:focus {
  outline: none;
  border-color: var(--ds-color-primary);
  box-shadow: 0 0 0 2px var(--ds-color-primary)20;
}

/* ================================ */
/* BOUTON AVANCÉ */
/* ================================ */

.ds-theme-advanced-btn {
  position: relative;
  overflow: hidden;
  transition: all var(--ds-transition-fast);
  background: transparent;
  border: 1px solid var(--ds-border-base);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: var(--ds-text-primary);
}

.ds-theme-advanced-btn:hover {
  transform: rotate(90deg);
  background: var(--ds-color-secondary) !important;
  color: white !important;
  border-color: var(--ds-color-secondary) !important;
}

/* ================================ */
/* SÉPARATEURS */
/* ================================ */

.ds-theme-divider {
  width: 1px;
  height: 24px;
  background: var(--ds-border-base);
  margin: 0 var(--ds-spacing-xs);
}

.ds-theme-compact .ds-theme-divider {
  width: 100%;
  height: 1px;
  margin: var(--ds-spacing-xs) 0;
}

/* ================================ */
/* TAILLES */
/* ================================ */

.ds-theme-size-small .ds-theme-mode-btn,
.ds-theme-size-small .ds-theme-toggle-btn,
.ds-theme-size-small .ds-theme-advanced-btn {
  width: 32px;
  height: 32px;
}

.ds-theme-size-small .ds-theme-mode-btn svg,
.ds-theme-size-small .ds-theme-toggle-btn svg,
.ds-theme-size-small .ds-theme-advanced-btn svg {
  width: 16px;
  height: 16px;
}

.ds-theme-size-small .ds-theme-preset-select {
  padding: 6px 10px;
  font-size: 12px;
  min-width: 120px;
}

.ds-theme-size-medium .ds-theme-mode-btn,
.ds-theme-size-medium .ds-theme-toggle-btn,
.ds-theme-size-medium .ds-theme-advanced-btn {
  width: 40px;
  height: 40px;
}

.ds-theme-size-medium .ds-theme-mode-btn svg,
.ds-theme-size-medium .ds-theme-toggle-btn svg,
.ds-theme-size-medium .ds-theme-advanced-btn svg {
  width: 20px;
  height: 20px;
}

.ds-theme-size-medium .ds-theme-preset-select {
  padding: 8px 12px;
  font-size: 14px;
  min-width: 140px;
}

.ds-theme-size-large .ds-theme-mode-btn,
.ds-theme-size-large .ds-theme-toggle-btn,
.ds-theme-size-large .ds-theme-advanced-btn {
  width: 48px;
  height: 48px;
}

.ds-theme-size-large .ds-theme-mode-btn svg,
.ds-theme-size-large .ds-theme-toggle-btn svg,
.ds-theme-size-large .ds-theme-advanced-btn svg {
  width: 24px;
  height: 24px;
}

.ds-theme-size-large .ds-theme-preset-select {
  padding: 10px 14px;
  font-size: 16px;
  min-width: 160px;
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
    var(--gaming-glow),
    transparent,
    var(--gaming-glow)
  );
  border-radius: inherit;
  opacity: 0;
  transition: opacity var(--ds-transition-normal);
  z-index: -1;
}

.ds-theme-selector-gaming:hover::before {
  opacity: 0.3;
}

/* ================================ */
/* ANIMATIONS */
/* ================================ */

@keyframes pulse-glow {
  0%, 100% {
    box-shadow: 0 0 20px var(--gaming-glow)20;
  }
  50% {
    box-shadow: 0 0 30px var(--gaming-glow)40;
  }
}

.ds-theme-selector-gaming:hover {
  animation: pulse-glow 2s ease-in-out infinite;
}

/* ================================ */
/* RESPONSIVE */
/* ================================ */

@media (max-width: 640px) {
  .ds-theme-selector {
    flex-direction: column;
    gap: var(--ds-spacing-sm);
  }

  .ds-theme-container {
    flex-direction: column;
    gap: var(--ds-spacing-sm);
  }

  .ds-theme-divider {
    width: 100%;
    height: 1px;
    margin: var(--ds-spacing-xs) 0;
  }
}

/* ================================ */
/* SPÉCIFICITÉS DU MODE SOMBRE */
/* ================================ */

.dark .ds-theme-selector {
  background: var(--ds-bg-mute);
  border-color: var(--ds-border-base);
}

.dark .ds-theme-selector:hover {
  background: var(--ds-bg-soft);
  border-color: var(--ds-border-hover);
}

/* ================================ */
/* ACCESSIBILITÉ */
/* ================================ */

.ds-theme-mode-btn:focus,
.ds-theme-toggle-btn:focus,
.ds-theme-advanced-btn:focus {
  outline: none;
  box-shadow: 0 0 0 2px var(--ds-color-primary)40;
}

.ds-theme-mode-btn:active,
.ds-theme-toggle-btn:active,
.ds-theme-advanced-btn:active {
  transform: scale(0.95);
}
</style>
