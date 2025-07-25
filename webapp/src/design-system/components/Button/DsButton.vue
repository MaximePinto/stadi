<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSystem } from '../../composables/useDesignSystem'
import { useButtonColors } from './useButtonColors'

/**
 * Props for the DsButton component.
 */
interface Props {
  /** The text content of the button. */
  text: string
  /** Visual variant of the button. */
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error'
  /** Size of the button. */
  size?: 'tiny' | 'small' | 'medium' | 'large'
  /** Whether the button is disabled. */
  disabled?: boolean
  /** Whether the button is in a loading state. */
  loading?: boolean
  /** Icon to display (optional). */
  icon?: any
  /** Whether to display as ghost style. */
  ghost?: boolean
  /** Whether to use gaming effects. */
  gaming?: boolean
}

/**
 * Emits for the DsButton component.
 */
interface Emits {
  /** Emitted when the button is clicked. */
  click: []
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'primary',
  size: 'medium',
  disabled: false,
  loading: false,
  ghost: false,
  gaming: true // Par défaut, on garde le style gaming
})

const emit = defineEmits<Emits>()

// Utilisation du système de design unifié
const { currentColors, getColor } = useDesignSystem()
const { getButtonColors, currentPreset } = useButtonColors()

// Mapping des tailles vers les classes CSS
const sizeClasses = {
  tiny: 'px-2 py-1 text-xs min-h-[24px]',
  small: 'px-3 py-1.5 text-sm min-h-[32px]',
  medium: 'px-4 py-2 text-base min-h-[40px]',
  large: 'px-6 py-3 text-lg min-h-[48px]'
} as const

// Configuration gaming (effets visuels additionnels) - Maintenant dynamique
const gamingConfig = computed(() => {
  const colors = getButtonColors(props.variant)
  
  return {
    gradient: colors.gradient,
    glowColor: colors.glow,
    borderGlow: colors.borderGlow,
    baseColor: colors.base,
    hoverColor: colors.hover,
    pressedColor: colors.pressed
  }
})

// Classes CSS de base pour le bouton
const buttonClasses = computed(() => {
  const baseClasses = [
    'ds-button',
    'inline-flex',
    'items-center',
    'justify-center',
    'font-medium',
    'rounded-md',
    'border',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2',
    sizeClasses[props.size]
  ]

  // Classes pour les états
  if (props.disabled) {
    baseClasses.push('opacity-50', 'cursor-not-allowed')
  } else {
    baseClasses.push('cursor-pointer')
  }

  // Classes gaming
  if (props.gaming) {
    baseClasses.push(
      'ds-gaming-button',
      'relative',
      'overflow-hidden'
    )
    
    if (!props.disabled && !props.loading) {
      baseClasses.push(
        'hover:scale-105',
        'active:scale-95',
        'hover:shadow-lg'
      )
    }
  }

  return baseClasses.join(' ')
})

// Style CSS dynamique pour le bouton
const buttonStyle = computed(() => {
  const colors = getButtonColors(props.variant)
  const style: Record<string, string> = {}

  if (props.gaming && !props.ghost) {
    // Style gaming avec gradients
    style.background = colors.gradient
    style.borderColor = colors.base
    style.boxShadow = `${colors.borderGlow}, 0 4px 15px rgba(0, 0, 0, 0.2)`
    style.color = 'white'
  } else if (props.ghost) {
    // Style ghost
    style.background = 'transparent'
    style.borderColor = colors.base
    style.color = colors.base
  } else {
    // Style normal
    style.background = colors.base
    style.borderColor = colors.base
    style.color = 'white'
  }

  // Variables CSS pour les effets hover
  style['--button-hover'] = colors.hover
  style['--button-pressed'] = colors.pressed

  return style
})

const handleClick = () => {
  if (!props.disabled && !props.loading) {
    emit('click')
  }
}
</script>

<template>
  <div
    :data-preset="currentPreset"
    class="ds-button-wrapper"
  >
    <!-- Bouton natif -->
    <button
      :class="buttonClasses"
      :style="buttonStyle"
      :disabled="disabled || loading"
      @click="handleClick"
      type="button"
    >
      <!-- Icône de chargement -->
      <svg
        v-if="loading"
        class="animate-spin -ml-1 mr-2 h-4 w-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          class="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          stroke-width="4"
        ></circle>
        <path
          class="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>

      <!-- Icône personnalisée -->
      <component
        v-else-if="icon"
        :is="icon"
        class="w-4 h-4 mr-2"
      />

      <!-- Contenu avec effets gaming -->
      <span class="relative z-10">
        {{ text }}
      </span>
    </button>

    <!-- Effets gaming additionnels -->
    <template v-if="gaming && !disabled && !loading">
      <!-- Effet de surbrillance au hover -->
      <div
        class="absolute inset-0 rounded-md bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
      />

      <!-- Effet de "sheen" (brillance animée) -->
      <div class="absolute inset-0 rounded-md overflow-hidden pointer-events-none z-20">
        <div class="sheen-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out" />
      </div>

      <!-- Particules flottantes (optionnel, pour l'effet gaming ultime) -->
      <div v-if="variant === 'primary'" class="gaming-particles absolute inset-0 pointer-events-none z-10">
        <div class="particle particle-1" />
        <div class="particle particle-2" />
        <div class="particle particle-3" />
      </div>
    </template>
  </div>
</template>

<style scoped>
/* ================================ */
/* BASE : Styles du bouton natif */
/* ================================ */

.ds-button-wrapper {
  display: inline-block;
  border-radius: var(--ds-radius-md);
  position: relative;
}

/* Styles de base du bouton */
.ds-button {
  font-family: inherit;
  
  /* Effets hover */
  &:hover:not(:disabled) {
    background: var(--button-hover) !important;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    background: var(--button-pressed) !important;
    transform: translateY(0);
  }
  
  /* Focus states */
  &:focus {
    ring-color: var(--button-hover);
  }
}

/* Styles gaming pour le bouton natif */
.ds-gaming-button {
  backdrop-filter: blur(8px);
  
  &:hover:not(:disabled) {
    border-color: var(--button-hover) !important;
  }
  
  &:active:not(:disabled) {
    border-color: var(--gaming-pressed, rgba(255, 255, 255, 0.6)) !important;
    transform: translateY(0);
  }
}

/* Effet d'apparition */
.ds-button-wrapper {
  animation: ds-fadeInUp 0.5s ease-out;
}

@keyframes ds-fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* ================================ */
/* EFFETS GAMING */
/* ================================ */

/* Effet sheen amélioré */
.ds-button-wrapper:hover .sheen-effect {
  animation: sheen-slide 0.7s ease-in-out;
}

@keyframes sheen-slide {
  0% {
    transform: translateX(-100%) skewX(-12deg);
  }
  100% {
    transform: translateX(200%) skewX(-12deg);
  }
}

/* Particules flottantes pour bouton primary */
.gaming-particles {
  border-radius: var(--ds-radius-md);
}

.particle {
  position: absolute;
  background: var(--ds-color-primary);
  border-radius: 50%;
  opacity: 0.6;
  animation: float 3s ease-in-out infinite;
}

.particle-1 {
  width: 4px;
  height: 4px;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.particle-2 {
  width: 3px;
  height: 3px;
  top: 60%;
  right: 30%;
  animation-delay: 1s;
}

.particle-3 {
  width: 2px;
  height: 2px;
  bottom: 30%;
  left: 70%;
  animation-delay: 2s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) scale(1);
    opacity: 0.6;
  }
  50% {
    transform: translateY(-8px) scale(1.2);
    opacity: 0.9;
  }
}

/* ================================ */
/* MODES SOMBRE/CLAIR ET PRESETS */
/* ================================ */

/* Mode sombre : effets plus intenses */
.dark .ds-button-wrapper {
  --gaming-glow-intensity: 0.8;
}

/* Mode clair : effets plus subtils */
.light .ds-button-wrapper {
  --gaming-glow-intensity: 0.4;
}

/* Styles spécifiques aux presets */
.ds-button-wrapper[data-preset="cyberpunk"] {
  filter: saturate(1.2) contrast(1.1);
}

.ds-button-wrapper[data-preset="cyberpunk"]:hover {
  filter: saturate(1.4) contrast(1.2);
  animation: pulse-glow 1s ease-in-out infinite;
}

.ds-button-wrapper[data-preset="ocean"] {
  filter: hue-rotate(10deg) saturate(1.1);
}

.ds-button-wrapper[data-preset="ocean"]:hover {
  filter: hue-rotate(10deg) saturate(1.3);
  box-shadow: 0 0 25px var(--gaming-glow), 0 0 50px var(--gaming-glow);
}

.ds-button-wrapper[data-preset="forest"] {
  filter: sepia(0.1) saturate(1.2);
}

.ds-button-wrapper[data-preset="forest"]:hover {
  filter: sepia(0.2) saturate(1.4);
  transform: scale(1.02) translateY(-1px);
}

/* ================================ */
/* RESPONSIVE */
/* ================================ */

@media (max-width: 768px) {
  .ds-button-wrapper:hover {
    transform: none; /* Désactive les effets hover sur mobile */
  }

  .particle {
    display: none; /* Cache les particules sur mobile pour les performances */
  }
}

/* ================================ */
/* ACCESSIBILITÉ */
/* ================================ */

@media (prefers-reduced-motion: reduce) {
  .ds-button-wrapper,
  .sheen-effect,
  .particle {
    animation: none !important;
    transition: none !important;
  }

  .ds-button-wrapper:hover {
    transform: none !important;
  }
}

/* Focus visible amélioré */
.ds-button-base:focus-visible {
  outline: 2px solid var(--ds-border-focus);
  outline-offset: 2px;
}
</style>
