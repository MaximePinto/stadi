/**
 * 🎨 Composable unifié pour le système de design
 *
 * Ce composable fait le lien entre :
 * - Les design tokens centralisés
 * - Naive UI theme overrides
 * - Variables CSS personnalisées
 * - Classes Tailwind dynamiques
 * - Persistance des préférences
 */

import { ref, computed, watch, readonly } from 'vue'
import { darkTheme, useOsTheme, type GlobalTheme } from 'naive-ui'
import { designTokens, themePresets, type DesignTokens, type SemanticColors } from '@/design-system/tokens'
import { generateNaiveUIThemeOverrides } from '@/design-system/naive-ui.generator'

// ================================
// TYPES
// ================================

export type ThemeMode = 'light' | 'dark' | 'auto'
export type ThemePresetKey = keyof typeof themePresets

export interface ThemeState {
  mode: ThemeMode
  preset: ThemePresetKey
  customTokens?: Partial<DesignTokens>
}

// ================================
// ÉTAT GLOBAL
// ================================

// État réactif global (singleton)
const themeState = ref<ThemeState>({
  mode: 'auto',
  preset: 'default'
})

// Cache pour les thèmes générés
const themeCache = new Map<string, any>()

/**
 * Composable principal pour le système de design unifié
 */
export function useDesignSystem() {
  const osTheme = useOsTheme()

  // ================================
  // ÉTAT CALCULÉ
  // ================================

  /**
   * Mode effectif (résout 'auto' vers 'light' ou 'dark')
   */
  const effectiveMode = computed<'light' | 'dark'>(() => {
    if (themeState.value.mode === 'auto') {
      return osTheme.value === 'dark' ? 'dark' : 'light'
    }
    return themeState.value.mode
  })

  /**
   * Tokens de design actuels (avec preset et customizations)
   */
  const currentTokens = computed<DesignTokens>(() => {
    const baseTokens = themePresets[themeState.value.preset]?.tokens || designTokens

    // Fusion avec les customizations si présentes
    if (themeState.value.customTokens) {
      return mergeTokens(baseTokens, themeState.value.customTokens)
    }

    return baseTokens
  })

  /**
   * Couleurs pour le mode actuel
   */
  const currentColors = computed<SemanticColors>(() => {
    return currentTokens.value.colors[effectiveMode.value]
  })

  /**
   * Thème Naive UI (null pour light, darkTheme pour dark)
   */
  const naiveTheme = computed<GlobalTheme | null>(() => {
    return effectiveMode.value === 'dark' ? darkTheme : null
  })

  /**
   * Overrides Naive UI générés à partir des tokens
   */
  const naiveThemeOverrides = computed(() => {
    const cacheKey = `${themeState.value.preset}-${themeState.value.mode}-${JSON.stringify(themeState.value.customTokens)}`

    if (!themeCache.has(cacheKey)) {
      const overrides = generateNaiveUIThemeOverrides(effectiveMode.value, currentTokens.value)
      themeCache.set(cacheKey, overrides)
    }

    return themeCache.get(cacheKey)
  })

  /**
   * Variables CSS à injecter dans le DOM
   */
  const cssVariables = computed(() => {
    const colors = currentColors.value
    const tokens = currentTokens.value

    return {
      // Couleurs
      '--ds-color-primary': colors.primary,
      '--ds-color-primary-hover': colors.primaryHover,
      '--ds-color-primary-pressed': colors.primaryPressed,
      '--ds-color-secondary': colors.secondary,
      '--ds-color-secondary-hover': colors.secondaryHover,
      '--ds-color-info': colors.info,
      '--ds-color-success': colors.success,
      '--ds-color-warning': colors.warning,
      '--ds-color-error': colors.error,

      // Texte
      '--ds-text-primary': colors.textPrimary,
      '--ds-text-secondary': colors.textSecondary,
      '--ds-text-disabled': colors.textDisabled,

      // Arrière-plans
      '--ds-bg-base': colors.background,
      '--ds-bg-soft': colors.backgroundSoft,
      '--ds-bg-mute': colors.backgroundMute,

      // Bordures
      '--ds-border-base': colors.border,
      '--ds-border-hover': colors.borderHover,
      '--ds-border-focus': colors.borderFocus,

      // Espacements
      '--ds-spacing-xs': tokens.spacing.xs,
      '--ds-spacing-sm': tokens.spacing.sm,
      '--ds-spacing-md': tokens.spacing.md,
      '--ds-spacing-lg': tokens.spacing.lg,
      '--ds-spacing-xl': tokens.spacing.xl,

      // Border radius
      '--ds-radius-sm': tokens.borderRadius.sm,
      '--ds-radius-md': tokens.borderRadius.md,
      '--ds-radius-lg': tokens.borderRadius.lg,

      // Ombres
      '--ds-shadow-sm': tokens.shadows.sm,
      '--ds-shadow-md': tokens.shadows.md,
      '--ds-shadow-lg': tokens.shadows.lg,
      '--ds-shadow-glow': tokens.shadows.glow,

      // Transitions
      '--ds-transition-fast': tokens.transitions.fast,
      '--ds-transition-normal': tokens.transitions.normal,
      '--ds-transition-slow': tokens.transitions.slow,
    }
  })

  // ================================
  // ACTIONS
  // ================================

  /**
   * Change le mode de thème
   */
  const setThemeMode = (mode: ThemeMode) => {
    themeState.value.mode = mode
    saveThemeState()
  }

  /**
   * Change le preset de thème
   */
  const setThemePreset = (preset: ThemePresetKey) => {
    themeState.value.preset = preset
    themeState.value.customTokens = undefined // Reset les customizations
    saveThemeState()
  }

  /**
   * Bascule entre light/dark (ignore auto)
   */
  const toggleTheme = () => {
    if (themeState.value.mode === 'auto') {
      setThemeMode(effectiveMode.value === 'dark' ? 'light' : 'dark')
    } else {
      setThemeMode(themeState.value.mode === 'dark' ? 'light' : 'dark')
    }
  }

  /**
   * Met à jour les couleurs personnalisées
   */
  const updateCustomColors = (mode: 'light' | 'dark', colors: Partial<SemanticColors>) => {
    if (!themeState.value.customTokens) {
      themeState.value.customTokens = {
        colors: {
          light: { ...designTokens.colors.light },
          dark: { ...designTokens.colors.dark }
        }
      }
    }

    themeState.value.customTokens.colors = {
      light: { ...designTokens.colors.light, ...themeState.value.customTokens.colors?.light },
      dark: { ...designTokens.colors.dark, ...themeState.value.customTokens.colors?.dark },
      [mode]: {
        ...designTokens.colors[mode],
        ...themeState.value.customTokens.colors?.[mode],
        ...colors
      }
    }

    saveThemeState()
  }

  /**
   * Remet à zéro les customizations
   */
  const resetCustomizations = () => {
    themeState.value.customTokens = undefined
    saveThemeState()
  }

  /**
   * Exporte la configuration actuelle
   */
  const exportThemeConfig = () => {
    return {
      mode: themeState.value.mode,
      preset: themeState.value.preset,
      customTokens: themeState.value.customTokens,
      timestamp: new Date().toISOString()
    }
  }

  /**
   * Importe une configuration
   */
  const importThemeConfig = (config: any) => {
    if (config.mode && ['light', 'dark', 'auto'].includes(config.mode)) {
      themeState.value.mode = config.mode
    }
    if (config.preset && themePresets[config.preset]) {
      themeState.value.preset = config.preset
    }
    if (config.customTokens) {
      themeState.value.customTokens = config.customTokens
    }
    saveThemeState()
  }

  /**
   * Obtient une couleur CSS pour le mode actuel
   */
  const getColor = (colorKey: keyof SemanticColors): string => {
    return currentColors.value[colorKey]
  }

  /**
   * Obtient une valeur de token
   */
  const getToken = (path: string): any => {
    return getNestedValue(currentTokens.value, path)
  }

  // ================================
  // PERSISTANCE
  // ================================

  /**
   * Sauvegarde l'état dans localStorage
   */
  const saveThemeState = () => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('design-system-theme', JSON.stringify(themeState.value))
    }
  }

  /**
   * Charge l'état depuis localStorage
   */
  const loadThemeState = () => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('design-system-theme')
        if (saved) {
          const parsed = JSON.parse(saved)
          themeState.value = { ...themeState.value, ...parsed }
        }
      } catch (error) {
        console.warn('Erreur lors du chargement du thème:', error)
      }
    }
  }

  // ================================
  // EFFETS DE BORD
  // ================================

  /**
   * Applique les variables CSS au DOM
   */
  const applyCSSVariables = () => {
    if (typeof document !== 'undefined') {
      const root = document.documentElement
      const vars = cssVariables.value

      Object.entries(vars).forEach(([key, value]) => {
        root.style.setProperty(key, value)
      })

      // Ajoute les classes pour le mode
      root.classList.remove('light', 'dark')
      root.classList.add(effectiveMode.value)
    }
  }

  // Watchers pour synchroniser
  watch(cssVariables, applyCSSVariables, { immediate: true })
  watch(effectiveMode, applyCSSVariables)

  // Chargement initial
  loadThemeState()

  // ================================
  // API PUBLIQUE
  // ================================

  return {
    // État (readonly)
    themeMode: readonly(computed(() => themeState.value.mode)),
    themePreset: readonly(computed(() => themeState.value.preset)),
    effectiveMode: readonly(effectiveMode),
    currentTokens: readonly(currentTokens),
    currentColors: readonly(currentColors),
    naiveTheme: readonly(naiveTheme),
    naiveThemeOverrides: readonly(naiveThemeOverrides),
    cssVariables: readonly(cssVariables),

    // Actions
    setThemeMode,
    setThemePreset,
    toggleTheme,
    updateCustomColors,
    resetCustomizations,
    exportThemeConfig,
    importThemeConfig,
    getColor,
    getToken,

    // Métadonnées
    availablePresets: Object.keys(themePresets) as ThemePresetKey[],
    availableModes: ['light', 'dark', 'auto'] as ThemeMode[],
  }
}

// ================================
// UTILITAIRES
// ================================

/**
 * Fusionne deux objets de tokens en profondeur
 */
function mergeTokens(base: DesignTokens, custom: Partial<DesignTokens>): DesignTokens {
  const result = JSON.parse(JSON.stringify(base)) // Deep clone

  // Fusion récursive
  return mergeDeep(result, custom)
}

function mergeDeep(target: any, source: any): any {
  for (const key in source) {
    if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
      if (!target[key]) target[key] = {}
      mergeDeep(target[key], source[key])
    } else {
      target[key] = source[key]
    }
  }
  return target
}

/**
 * Obtient une valeur imbriquée d'un objet via un chemin
 */
function getNestedValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj)
}
