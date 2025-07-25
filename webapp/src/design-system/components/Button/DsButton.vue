<script setup lang="ts">
import { computed } from 'vue'
import { useDesignSystem } from '../../composables/useDesignSystem'

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
  gaming: true
})

const emit = defineEmits<Emits>()

// Utilisation du système de design unifié
const { currentColors, currentTokens, themePreset } = useDesignSystem()

// Configuration des tailles utilisant les tokens
const sizeConfig = {
  tiny: {
    paddingX: currentTokens.value.spacing.sm,
    paddingY: currentTokens.value.spacing.xs,
    fontSize: currentTokens.value.typography.caption.fontSize,
    lineHeight: currentTokens.value.typography.caption.lineHeight,
    minHeight: '24px'
  },
  small: {
    paddingX: currentTokens.value.spacing.md,
    paddingY: currentTokens.value.spacing.sm,
    fontSize: '0.875rem',
    lineHeight: '1.25rem',
    minHeight: '32px'
  },
  medium: {
    paddingX: currentTokens.value.spacing.lg,
    paddingY: currentTokens.value.spacing.sm,
    fontSize: currentTokens.value.typography.body.fontSize,
    lineHeight: currentTokens.value.typography.body.lineHeight,
    minHeight: '40px'
  },
  large: {
    paddingX: currentTokens.value.spacing.xl,
    paddingY: currentTokens.value.spacing.md,
    fontSize: '1.125rem',
    lineHeight: '1.75rem',
    minHeight: '48px'
  }
} as const

// Configuration des couleurs par variante utilisant les tokens
const variantColors = computed(() => {
  const colors = currentColors.value
  return {
    primary: {
      base: colors.primaryBase,
      hover: colors.primaryHover,
      pressed: colors.primaryPressed,
      gradient: `linear-gradient(135deg, ${colors.primaryBase}, ${colors.primaryHover})`,
      glow: `0 0 15px ${colors.primaryBase}40`
    },
    secondary: {
      base: colors.secondaryBase,
      hover: colors.secondaryHover,
      pressed: colors.secondaryPressed,
      gradient: `linear-gradient(135deg, ${colors.secondaryBase}, ${colors.secondaryHover})`,
      glow: `0 0 15px ${colors.secondaryBase}40`
    },
    success: {
      base: colors.successBase,
      hover: colors.successHover,
      pressed: colors.successPressed,
      gradient: `linear-gradient(135deg, ${colors.successBase}, ${colors.successHover})`,
      glow: `0 0 15px ${colors.successBase}40`
    },
    warning: {
      base: colors.warningBase,
      hover: colors.warningHover,
      pressed: colors.warningPressed,
      gradient: `linear-gradient(135deg, ${colors.warningBase}, ${colors.warningHover})`,
      glow: `0 0 15px ${colors.warningBase}40`
    },
    error: {
      base: colors.errorBase,
      hover: colors.errorHover,
      pressed: colors.errorPressed,
      gradient: `linear-gradient(135deg, ${colors.errorBase}, ${colors.errorHover})`,
      glow: `0 0 15px ${colors.errorBase}40`
    }
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
    'border',
    'transition-all',
    'duration-200',
    'ease-in-out',
    'focus:outline-none',
    'focus:ring-2',
    'focus:ring-offset-2'
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
  const colors = variantColors.value[props.variant]
  const size = sizeConfig[props.size]
  const style: Record<string, string> = {}

  // Taille
  style.padding = `${size.paddingY} ${size.paddingX}`
  style.fontSize = size.fontSize
  style.lineHeight = size.lineHeight
  style.minHeight = size.minHeight
  style.borderRadius = currentTokens.value.borderRadius.md

  // Couleurs selon le style
  if (props.gaming && !props.ghost) {
    // Style gaming avec gradients
    style.background = colors.gradient
    style.borderColor = colors.base
    style.boxShadow = `${colors.glow}, ${currentTokens.value.shadows.md}`
    style.color = currentColors.value.onPrimary
  } else if (props.ghost) {
    // Style ghost
    style.background = 'transparent'
    style.borderColor = colors.base
    style.color = colors.base
  } else {
    // Style normal
    style.background = colors.base
    style.borderColor = colors.base
    style.color = currentColors.value.onPrimary
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
    :data-preset="themePreset"
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
        :style="{ 
          width: currentTokens.spacing.md, 
          height: currentTokens.spacing.md,
          marginRight: currentTokens.spacing.sm
        }"
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
        class="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none z-20"
        :style="{ borderRadius: currentTokens.borderRadius.md }"
      />

      <!-- Effet de "sheen" (brillance animée) -->
      <div 
        class="absolute inset-0 overflow-hidden pointer-events-none z-20"
        :style="{ borderRadius: currentTokens.borderRadius.md }"
      >
        <div class="sheen-effect absolute top-0 left-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full transition-transform duration-700 ease-in-out" />
      </div>

      <!-- Particules flottantes (pour bouton primary seulement) -->
      <div 
        v-if="variant === 'primary'" 
        class="gaming-particles absolute inset-0 pointer-events-none z-10"
        :style="{ borderRadius: currentTokens.borderRadius.md }"
      >
        <div class="particle particle-1" />
        <div class="particle particle-2" />
        <div class="particle particle-3" />
      </div>
    </template>
  </div>
</template>

<style scoped>
/* ================================ */
/* BASE : Styles du bouton */
/* ================================ */

.ds-button-wrapper {
  display: inline-block;
  border-radius: v-bind('currentTokens.borderRadius.md');
  position: relative;
}

/* Styles de base du bouton */
.ds-button {
  font-family: inherit;
  
  /* Effets hover utilisant les tokens */
  &:hover:not(:disabled) {
    background: var(--button-hover) !important;
    transform: translateY(-1px);
  }
  
  &:active:not(:disabled) {
    background: var(--button-pressed) !important;
    transform: translateY(0);
  }
  
  /* Focus states avec tokens */
  &:focus {
    ring-color: var(--button-hover);
    box-shadow: 0 0 0 2px v-bind('currentColors.borderFocus');
  }
}

/* Styles gaming pour le bouton */
.ds-gaming-button {
  backdrop-filter: blur(8px);
  
  &:hover:not(:disabled) {
    border-color: var(--button-hover) !important;
  }
  
  &:active:not(:disabled) {
    border-color: var(--button-pressed) !important;
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
  transform: translateX(200%) skewX(-12deg);
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
.particle {
  position: absolute;
  background: v-bind('currentColors.primaryBase');
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
</style>