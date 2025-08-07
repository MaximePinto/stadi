/**
 * 🎨 Composable Design System avec VueUse
 * Intégration avancée pour la gestion des thèmes
 */

import {
  useDark,
  usePreferredColorScheme,
  usePreferredReducedMotion,
  useMediaQuery,
  useToggle
} from '@vueuse/core'
import { computed, watch, ref } from 'vue'
import { useThemeStore, type ThemeMode, type ThemePreset } from '@/stores/theme'

export interface DesignSystemConfig {
  autoDetectPreferences?: boolean
  syncWithSystem?: boolean
  enableReducedMotion?: boolean
  responsiveBreakpoints?: {
    mobile: string
    tablet: string
    desktop: string
  }
}

export const useDesignSystem = (config: DesignSystemConfig = {}) => {
  // Configuration par défaut
  const {
    autoDetectPreferences = true,
    syncWithSystem = true,
    enableReducedMotion = true,
    responsiveBreakpoints = {
      mobile: '(max-width: 768px)',
      tablet: '(min-width: 769px) and (max-width: 1024px)',
      desktop: '(min-width: 1025px)'
    }
  } = config

  // ================================
  // VueUse Composables
  // ================================

  // Détection mode sombre automatique avec VueUse
  const isDark = useDark({
    selector: 'html',
    attribute: 'class',
    valueDark: 'dark',
    valueLight: 'light',
    disableTransition: false
  })

  // Bascule du mode sombre
  const toggleDark = useToggle(isDark)

  // Préférence système de couleurs
  const preferredColorScheme = usePreferredColorScheme()

  // Détection des animations réduites (accessibilité)
  const isReducedMotion = enableReducedMotion ? usePreferredReducedMotion() : ref(false)

  // Détection responsive
  const isMobile = useMediaQuery(responsiveBreakpoints.mobile)
  const isTablet = useMediaQuery(responsiveBreakpoints.tablet)
  const isDesktop = useMediaQuery(responsiveBreakpoints.desktop)

  // ================================
  // Store Pinia Integration
  // ================================

  const themeStore = useThemeStore()

  // ================================
  // Synchronisation automatique
  // ================================

  // Synchronise VueUse isDark avec le store Pinia
  if (syncWithSystem) {
    watch(isDark, (dark) => {
      const newMode: ThemeMode = dark ? 'dark' : 'light'
      if (themeStore.mode !== newMode) {
        themeStore.setMode(newMode)
      }
    }, { immediate: false })

    // Synchronise le store avec VueUse (bidirectionnel)
    watch(() => themeStore.mode, (mode) => {
      const shouldBeDark = mode === 'dark'
      if (isDark.value !== shouldBeDark) {
        isDark.value = shouldBeDark
      }
    }, { immediate: false })
  }

  // ================================
  // Getters calculés
  // ================================

  // Détection du type d'appareil
  const deviceType = computed(() => {
    if (isMobile.value) return 'mobile'
    if (isTablet.value) return 'tablet'
    if (isDesktop.value) return 'desktop'
    return 'unknown'
  })

  // Détection si le système supporte les préférences
  const systemSupportsColorScheme = computed(() => {
    return preferredColorScheme.value !== 'no-preference'
  })

  // Mode adaptatif selon les préférences système
  const adaptiveMode = computed((): ThemeMode => {
    if (!autoDetectPreferences) return themeStore.mode

    // Si l'utilisateur a fait un choix manuel, le respecter
    if (themeStore.mode && themeStore.mode !== 'light') {
      return themeStore.mode
    }

    // Sinon, utiliser les préférences système
    return preferredColorScheme.value === 'dark' ? 'dark' : 'light'
  })

  // Configuration optimale du ThemeSelector selon l'appareil
  const optimalThemeSelectorConfig = computed(() => ({
    size: isMobile.value ? 'small' : 'medium',
    compact: isMobile.value,
    gaming: !isReducedMotion.value,
    showModeToggle: true,
    showPresetSelector: !isMobile.value || isTablet.value,
    showColorPicker: isDesktop.value
  }))

  // ================================
  // Actions avancées
  // ================================

  /**
   * Bascule intelligente du thème
   * Prend en compte les préférences système
   */
  const smartToggle = () => {
    if (syncWithSystem) {
      toggleDark()
    } else {
      themeStore.toggleMode()
    }
  }

  /**
   * Réinitialise aux préférences système
   */
  const resetToSystemPreferences = () => {
    if (autoDetectPreferences && systemSupportsColorScheme.value) {
      const systemMode: ThemeMode = preferredColorScheme.value === 'dark' ? 'dark' : 'light'
      themeStore.setMode(systemMode)
    }
  }

  /**
   * Applique un preset avec gestion des animations
   */
  const setPresetWithMotion = (preset: ThemePreset) => {
    if (isReducedMotion.value) {
      // Appliquer immédiatement sans transition
      document.documentElement.style.setProperty('--transition-normal', '0s')
      themeStore.setPreset(preset)

      // Restaurer les transitions après un court délai
      setTimeout(() => {
        document.documentElement.style.removeProperty('--transition-normal')
      }, 50)
    } else {
      themeStore.setPreset(preset)
    }
  }

  /**
   * Configuration automatique selon l'appareil
   */
  const autoConfigureForDevice = () => {
    if (isMobile.value) {
      // Sur mobile, simplifier l'interface
      return {
        showCompactMode: true,
        reducedAnimations: true,
        quickToggleOnly: true
      }
    }

    return {
      showCompactMode: false,
      reducedAnimations: isReducedMotion.value,
      quickToggleOnly: false
    }
  }

  // ================================
  // Initialisation
  // ================================

  /**
   * Initialise le design system avec détection automatique
   */
  const initDesignSystem = () => {
    if (autoDetectPreferences && !themeStore.mode) {
      resetToSystemPreferences()
    }
  }

  // Initialisation automatique
  initDesignSystem()

  // ================================
  // API publique
  // ================================

  return {
    // États VueUse
    isDark,
    preferredColorScheme,
    isReducedMotion,

    // États responsive
    isMobile,
    isTablet,
    isDesktop,
    deviceType,

    // États calculés
    adaptiveMode,
    systemSupportsColorScheme,
    optimalThemeSelectorConfig,

    // Store Pinia (accès direct)
    themeStore,

    // Actions VueUse
    toggleDark,

    // Actions avancées
    smartToggle,
    resetToSystemPreferences,
    setPresetWithMotion,
    autoConfigureForDevice,
    initDesignSystem
  }
}

// ================================
// Export du type pour TypeScript
// ================================
export type DesignSystemComposable = ReturnType<typeof useDesignSystem>
