/**
 * 🎨 Store Pinia pour la gestion des thèmes
 * Version améliorée avec intégration VueUse
 */

import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

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
   * Initialise le thème (simplifié - VueUse gère la détection système)
   */
  const initTheme = () => {
    // VueUse via useDesignSystem gère maintenant la détection automatique
    // On applique juste le thème actuel
    applyTheme()
  }

  // ================================
  // GETTERS
  // ================================
  
  /**
   * Liste des presets disponibles avec métadonnées
   */
  const availablePresets = computed(() => [
    { 
      id: 'indigo' as ThemePreset, 
      label: 'Indigo Gaming', 
      description: 'Thème par défaut avec indigo',
      colors: { primary: '#4338ca', accent: '#9333ea' }
    },
    { 
      id: 'gaming' as ThemePreset, 
      label: 'Gaming Purple', 
      description: 'Style gaming avec purple',
      colors: { primary: '#9333ea', accent: '#4338ca' }
    },
    { 
      id: 'ocean' as ThemePreset, 
      label: 'Ocean Blue', 
      description: 'Thème océan avec cyan',
      colors: { primary: '#0891b2', accent: '#2563eb' }
    },
    { 
      id: 'forest' as ThemePreset, 
      label: 'Forest Green', 
      description: 'Thème nature avec emerald',
      colors: { primary: '#059669', accent: '#16a34a' }
    }
  ])
  
  /**
   * Liste des modes disponibles
   */
  const availableModes: ThemeMode[] = ['light', 'dark']

  /**
   * Preset actuel avec métadonnées
   */
  const currentPreset = computed(() => 
    availablePresets.value.find(p => p.id === preset.value)
  )

  /**
   * Vérifie si des couleurs personnalisées sont définies
   */
  const hasCustomColors = computed(() => 
    Object.keys(customColors.value).length > 0
  )

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
    
    // Getters calculés
    availablePresets,
    currentPreset,
    hasCustomColors,
    
    // Métadonnées
    availableModes,
  }
}, {
  persist: {
    key: 'stadi-theme',
    storage: typeof window !== 'undefined' ? localStorage : undefined,
  }
})