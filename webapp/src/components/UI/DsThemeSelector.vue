<script setup lang="ts">
import { computed } from 'vue'
import { NSelect, NButton, NIcon, NTooltip, NSpace } from 'naive-ui'
import { useDesignSystem } from '@/composables/useDesignSystem'
import {
  SunnyOutline,
  MoonOutline,
  LaptopOutline,
  ColorPaletteOutline,
  SettingsOutline
} from '@vicons/ionicons5'

/**
 * Props pour le composant DsThemeSelector.
 */
interface Props {
  /** Indique s'il faut afficher le bouton de basculement de mode. */
  showModeToggle?: boolean
  /** Indique s'il faut afficher le sélecteur de préréglage. */
  showPresetSelector?: boolean
  /** Indique s'il faut afficher les paramètres avancés. */
  showAdvanced?: boolean
  /** Taille du composant. */
  size?: 'small' | 'medium' | 'large'
  /** Indique s'il faut utiliser une mise en page compacte. */
  compact?: boolean
  /** Indique s'il faut utiliser les effets de jeu. */
  gaming?: boolean
}

/**
 * Émissions pour le composant DsThemeSelector.
 */
interface Emits {
  /** Émis lors du changement de mode de thème. */
  'mode-change': [mode: 'light' | 'dark' | 'auto']
  /** Émis lors du changement de préréglage de thème. */
  'preset-change': [preset: string]
  /** Émis lors de tout changement de thème. */
  'theme-change': [theme: any]
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
  effectiveMode,
  setThemeMode,
  setThemePreset,
  toggleTheme,
  currentTokens,
  themePresets
} = useDesignSystem()

// Configuration des options pour le sélecteur de mode (light/dark/auto)
const modeOptions = [
  {
    label: 'Clair',
    value: 'light',
    icon: SunnyOutline
  },
  {
    label: 'Sombre',
    value: 'dark',
    icon: MoonOutline
  },
  {
    label: 'Auto',
    value: 'auto',
    icon: LaptopOutline
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
  setThemeMode(mode)
  emit('mode-change', mode)
  emit('theme-change', { mode, type: 'mode' })
}

// Gestionnaire pour le changement de préréglage de thème
const handlePresetChange = (preset: string) => {
  setThemePreset(preset as any)
  emit('preset-change', preset)
  emit('theme-change', { preset, type: 'preset' })
}

// Gestionnaire pour le basculement rapide de thème
const handleToggleTheme = () => {
  toggleTheme()
  emit('theme-change', { type: 'toggle' })
}

// Classes CSS calculées pour les effets de jeu
const gamingClasses = computed(() => {
  if (!props.gaming) return ''

  return [
    'ds-theme-selector-gaming',
    'transition-all',
    'duration-300',
    'ease-in-out',
    'hover:shadow-glow',
    'rounded-radius-md'
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

// Taille des composants Naive UI calculée selon la prop size
const naiveSize = computed(() => {
  switch (props.size) {
    case 'small': return 'small'
    case 'large': return 'large'
    default: return 'medium'
  }
})
</script>

<template>
  <div
    :class="gamingClasses"
    :style="gamingStyle"
    class="ds-theme-selector"
  >
    <NSpace
      :size="compact ? 'small' : 'medium'"
      :vertical="!compact"
      align="center"
      justify="center"
    >
      <!-- Sélecteur de mode de thème -->
      <template v-if="showModeToggle">
        <NTooltip
          v-for="option in modeOptions"
          :key="option.value"
          :content="option.label"
          placement="top"
        >
          <template #trigger>
            <NButton
              :type="effectiveMode === option.value ? 'primary' : 'default'"
              :size="naiveSize"
              :ghost="effectiveMode !== option.value"
              :class="[
                'ds-theme-mode-btn',
                { 'ds-theme-mode-active': effectiveMode === option.value }
              ]"
              @click="handleModeChange(option.value as 'light' | 'dark' | 'auto')"
              circle
            >
              <NIcon>
                <component :is="option.icon" />
              </NIcon>
            </NButton>
          </template>
        </NTooltip>
      </template>

      <!-- Bascule rapide light/dark -->
      <template v-if="showModeToggle">
        <div class="ds-theme-divider" />
        <NTooltip content="Basculer thème" placement="top">
          <template #trigger>
            <NButton
              :type="'default'"
              :size="naiveSize"
              ghost
              class="ds-theme-toggle-btn"
              @click="handleToggleTheme"
            >
              <NIcon>
                <component :is="effectiveMode === 'dark' ? SunnyOutline : MoonOutline" />
              </NIcon>
            </NButton>
          </template>
        </NTooltip>
      </template>

      <!-- Sélecteur de préréglage -->
      <template v-if="showPresetSelector">
        <div class="ds-theme-divider" />
        <NTooltip content="Changer de thème" placement="top">
          <template #trigger>
            <NSelect
              :value="themePreset"
              :options="presetOptions"
              :size="naiveSize"
              placeholder="Choisir un thème"
              class="ds-theme-preset-select"
              @update:value="handlePresetChange"
            >
              <template #prefix>
                <NIcon>
                  <ColorPaletteOutline />
                </NIcon>
              </template>
            </NSelect>
          </template>
        </NTooltip>
      </template>

      <!-- Paramètres avancés -->
      <template v-if="showAdvanced">
        <div class="ds-theme-divider" />
        <NTooltip content="Paramètres avancés" placement="top">
          <template #trigger>
            <NButton
              type="default"
              :size="naiveSize"
              ghost
              class="ds-theme-advanced-btn"
            >
              <NIcon>
                <SettingsOutline />
              </NIcon>
            </NButton>
          </template>
        </NTooltip>
      </template>
    </NSpace>
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

/* ================================ */
/* BOUTONS DE MODE */
/* ================================ */

.ds-theme-mode-btn {
  position: relative;
  overflow: hidden;
  transition: all var(--ds-transition-fast);
}

.ds-theme-mode-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.ds-theme-mode-active {
  background: var(--ds-color-primary) !important;
  color: white !important;
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
}

.ds-theme-toggle-btn:hover {
  transform: rotate(180deg) scale(1.1);
  background: var(--ds-color-primary) !important;
  color: white !important;
}

/* ================================ */
/* SÉLECTEUR DE PRÉRÉGLAGE */
/* ================================ */

.ds-theme-preset-select {
  min-width: 140px;
  transition: all var(--ds-transition-fast);
}

.ds-theme-preset-select:hover {
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* ================================ */
/* BOUTON AVANCÉ */
/* ================================ */

.ds-theme-advanced-btn {
  position: relative;
  overflow: hidden;
  transition: all var(--ds-transition-fast);
}

.ds-theme-advanced-btn:hover {
  transform: rotate(90deg);
  background: var(--ds-color-secondary) !important;
  color: white !important;
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
</style>
