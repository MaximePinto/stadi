/**
 * 🎨 Store Pinia pour la gestion des thèmes
 * Version simplifiée avec variables CSS pures
 */

import { defineStore } from 'pinia'
import { ref } from 'vue'

export type ThemeMode = 'light' | 'dark'
export type ThemePreset = 'indigo' | 'gaming' | 'ocean' | 'forest'

export const useThemeStore = defineStore('theme', () => {
  // ================================
  // ÉTAT
  // ================================
  
  const mode = ref<ThemeMode>('light')
  const preset = ref<ThemePreset>('indigo')
  const customColors = ref<Record<string, string>>({})

  // ================================
  // ACTIONS
  // ================================
  
  /**
   * Change le mode light/dark
   */
  const setMode = (newMode: ThemeMode) => {
    mode.value = newMode
    applyTheme()
  }

  /**
   * Bascule entre light et dark
   */
  const toggleMode = () => {
    setMode(mode.value === 'light' ? 'dark' : 'light')
  }
  
  /**
   * Change le preset de thème
   */
  const setPreset = (newPreset: ThemePreset) => {
    preset.value = newPreset
    customColors.value = {} // Reset custom colors when changing preset
    applyTheme()
  }
  
  /**
   * Définit une couleur personnalisée 
   */
  const setCustomColor = (colorKey: string, color: string) => {
    customColors.value[colorKey] = color
    applyTheme()
  }

  /**
   * Supprime une couleur personnalisée
   */
  const removeCustomColor = (colorKey: string) => {
    delete customColors.value[colorKey]
    applyTheme()
  }

  /**
   * Reset toutes les customisations
   */
  const resetCustomColors = () => {
    customColors.value = {}
    applyTheme()
  }

  /**
   * Applique le thème au DOM
   */
  const applyTheme = () => {
    if (typeof document === 'undefined') return

    const root = document.documentElement
    
    // Applique le mode (classe CSS)
    root.classList.remove('light', 'dark')
    root.classList.add(mode.value)
    
    // Applique le preset (data attribute)
    root.dataset.theme = preset.value
    
    // Applique les couleurs personnalisées (CSS custom properties)
    Object.entries(customColors.value).forEach(([key, value]) => {
      root.style.setProperty(`--${key}`, value)
    })
  }

  /**
   * Initialise le thème (à appeler au démarrage de l'app)
   */
  const initTheme = () => {
    // Détecte la préférence système si aucun mode sauvegardé
    if (mode.value === 'light' && typeof window !== 'undefined') {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
      if (prefersDark) {
        mode.value = 'dark'
      }
    }
    
    applyTheme()
  }

  // ================================
  // GETTERS
  // ================================
  
  /**
   * Liste des presets disponibles
   */
  const availablePresets: ThemePreset[] = ['indigo', 'gaming', 'ocean', 'forest']
  
  /**
   * Liste des modes disponibles
   */
  const availableModes: ThemeMode[] = ['light', 'dark']

  return {
    // État (réactif)
    mode,
    preset,
    customColors,
    
    // Actions
    setMode,
    toggleMode,
    setPreset,
    setCustomColor,
    removeCustomColor,
    resetCustomColors,
    applyTheme,
    initTheme,
    
    // Métadonnées
    availablePresets,
    availableModes,
  }
}, {
  persist: {
    key: 'stadi-theme',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  }
})