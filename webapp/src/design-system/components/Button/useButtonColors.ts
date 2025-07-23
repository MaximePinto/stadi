/**
 * 🎨 Composable pour les couleurs de boutons dynamiques
 *
 * Ce composable génère des couleurs de boutons modernes et cohérentes
 * basées sur le preset actuel tout en gardant la sémantique des rôles
 */

import { computed, readonly } from 'vue'
import { useDesignSystem } from '../../composables/useDesignSystem'
import type { SemanticColors } from '../../types'

export type ButtonVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

export interface ButtonColorScheme {
  base: string
  hover: string
  pressed: string
  glow: string
  gradient: string
  borderGlow: string
}

/**
 * Génère des couleurs de boutons intelligentes
 */
export function useButtonColors() {
  const { currentColors, effectiveMode, themePreset } = useDesignSystem()

  /**
   * Génère des variantes de couleurs basées sur la couleur primaire du preset
   */
  const generatePresetVariants = computed(() => {
    const colors = currentColors.value
    const primary = colors.primaryBase

    // Extraction des composantes RGB pour générer des variantes
    const rgb = hexToRgb(primary)
    if (!rgb) return null

    // Génération de variantes HSL pour plus de contrôle
    const hsl = rgbToHsl(rgb.r, rgb.g, rgb.b)

    return {
      // Variante secondaire : même teinte, saturation réduite
      secondary: {
        base: hslToHex(hsl.h, Math.max(hsl.s * 0.3, 0.1), Math.min(hsl.l + 0.4, 0.9)),
        hover: hslToHex(hsl.h, Math.max(hsl.s * 0.4, 0.15), Math.min(hsl.l + 0.3, 0.85)),
        pressed: hslToHex(hsl.h, Math.max(hsl.s * 0.5, 0.2), Math.min(hsl.l + 0.2, 0.8))
      },
      // Variante tertiaire : teinte complémentaire
      tertiary: {
        base: hslToHex((hsl.h + 180) % 360, hsl.s * 0.8, hsl.l),
        hover: hslToHex((hsl.h + 180) % 360, hsl.s * 0.9, Math.max(hsl.l - 0.1, 0.1)),
        pressed: hslToHex((hsl.h + 180) % 360, hsl.s, Math.max(hsl.l - 0.2, 0.05))
      },
      // Variante accent : teinte analogique
      accent: {
        base: hslToHex((hsl.h + 30) % 360, hsl.s, hsl.l),
        hover: hslToHex((hsl.h + 30) % 360, Math.min(hsl.s + 0.1, 1), Math.max(hsl.l - 0.1, 0.1)),
        pressed: hslToHex((hsl.h + 30) % 360, Math.min(hsl.s + 0.2, 1), Math.max(hsl.l - 0.2, 0.05))
      }
    }
  })

  /**
   * Configuration des couleurs par variante de bouton
   */
  const buttonColors = computed((): Record<ButtonVariant, ButtonColorScheme> => {
    const colors = currentColors.value
    const variants = generatePresetVariants.value

    // Préparation des variantes conditionnelles
    let secondaryColors: ButtonColorScheme
    if (variants) {
      secondaryColors = {
        base: variants.secondary.base,
        hover: variants.secondary.hover,
        pressed: variants.secondary.pressed,
        glow: variants.secondary.base,
        gradient: `linear-gradient(135deg, ${variants.secondary.base}, ${variants.secondary.hover})`,
        borderGlow: `0 0 15px ${variants.secondary.base}40`
      }
    } else {
      secondaryColors = {
        base: colors.secondaryBase,
        hover: colors.secondaryHover,
        pressed: colors.secondaryPressed,
        glow: colors.secondaryBase,
        gradient: `linear-gradient(135deg, ${colors.secondaryBase}, ${colors.secondaryHover})`,
        borderGlow: `0 0 15px ${colors.secondaryBase}40`
      }
    }

    let infoColors: ButtonColorScheme
    if (variants) {
      infoColors = {
        base: variants.accent.base,
        hover: variants.accent.hover,
        pressed: variants.accent.pressed,
        glow: variants.accent.base,
        gradient: `linear-gradient(135deg, ${variants.accent.base}, ${variants.accent.hover})`,
        borderGlow: `0 0 15px ${variants.accent.base}40`
      }
    } else {
      infoColors = {
        base: colors.infoBase,
        hover: colors.infoHover,
        pressed: colors.infoPressed,
        glow: colors.infoBase,
        gradient: `linear-gradient(135deg, ${colors.infoBase}, ${colors.infoHover})`,
        borderGlow: `0 0 15px ${colors.infoBase}40`
      }
    }

    const baseConfig = {
      primary: {
        base: colors.primaryBase,
        hover: colors.primaryHover,
        pressed: colors.primaryPressed,
        glow: colors.primaryBase,
        gradient: `linear-gradient(135deg, ${colors.primaryBase}, ${colors.primaryHover})`,
        borderGlow: `0 0 15px ${colors.primaryBase}40`
      },
      secondary: secondaryColors,
      success: {
        base: colors.successBase,
        hover: colors.successHover,
        pressed: colors.successPressed,
        glow: colors.successBase,
        gradient: `linear-gradient(135deg, ${colors.successBase}, ${colors.successHover})`,
        borderGlow: `0 0 15px ${colors.successBase}40`
      },
      warning: {
        base: colors.warningBase,
        hover: colors.warningHover,
        pressed: colors.warningPressed,
        glow: colors.warningBase,
        gradient: `linear-gradient(135deg, ${colors.warningBase}, ${colors.warningHover})`,
        borderGlow: `0 0 15px ${colors.warningBase}40`
      },
      error: {
        base: colors.errorBase,
        hover: colors.errorHover,
        pressed: colors.errorPressed,
        glow: colors.errorBase,
        gradient: `linear-gradient(135deg, ${colors.errorBase}, ${colors.errorHover})`,
        borderGlow: `0 0 15px ${colors.errorBase}40`
      },
      info: infoColors
    }

    return baseConfig
  })

  /**
   * Obtient les couleurs pour une variante spécifique
   */
  const getButtonColors = (variant: ButtonVariant): ButtonColorScheme => {
    return buttonColors.value[variant]
  }

  /**
   * Génère des couleurs supplémentaires pour des presets spéciaux
   */
  const getPresetSpecificColors = computed(() => {
    const preset = themePreset.value

    switch (preset) {
      case 'cyberpunk':
        return {
          neon: '#00ff00',
          electric: '#ff00ff',
          cyber: '#00ffff'
        }
      case 'ocean':
        return {
          wave: '#20b2aa',
          deep: '#191970',
          foam: '#f0f8ff'
        }
      case 'forest':
        return {
          leaf: '#228b22',
          bark: '#8b4513',
          moss: '#adff2f'
        }
      default:
        return {}
    }
  })

  return {
    buttonColors: readonly(buttonColors),
    getButtonColors,
    generatePresetVariants: readonly(generatePresetVariants),
    presetSpecificColors: readonly(getPresetSpecificColors),
    currentPreset: readonly(themePreset),
    effectiveMode: readonly(effectiveMode)
  }
}

// ================================
// UTILITAIRES COULEURS
// ================================

function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

function rgbToHsl(r: number, g: number, b: number): { h: number; s: number; l: number } {
  r /= 255
  g /= 255
  b /= 255

  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  let h = 0
  let s = 0
  const l = (max + min) / 2

  if (max === min) {
    h = s = 0 // achromatic
  } else {
    const d = max - min
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min)

    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break
      case g: h = (b - r) / d + 2; break
      case b: h = (r - g) / d + 4; break
    }
    h /= 6
  }

  return { h: h * 360, s, l }
}

function hslToHex(h: number, s: number, l: number): string {
  h /= 360
  const a = s * Math.min(l, 1 - l)
  const f = (n: number) => {
    const k = (n + h * 12) % 12
    const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
    return Math.round(255 * color).toString(16).padStart(2, '0')
  }
  return `#${f(0)}${f(8)}${f(4)}`
}
