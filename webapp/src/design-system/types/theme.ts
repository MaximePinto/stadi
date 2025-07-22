/**
 * Theme System Types
 * Types relatifs au système de thème du Design System
 */

// ============================================================================
// TYPES DE BASE POUR LE THÈME
// ============================================================================

/**
 * Mode de thème disponible
 */
export type ThemeMode = 'light' | 'dark' | 'auto'

/**
 * @deprecated Utiliser ThemeMode à la place
 */
export type ThemeModeInterface = ThemeMode

// ============================================================================
// ÉVÉNEMENTS DE THÈME
// ============================================================================

/**
 * Événement émis lors d'un changement de thème
 */
export type ThemeChangeEvent =
  | { mode: ThemeMode; type: 'mode' }
  | { preset: string; type: 'preset' }
  | { type: 'toggle' }

// ============================================================================
// CONFIGURATION DU THÈME
// ============================================================================

/**
 * Configuration d'un thème
 */
export interface ThemeConfig {
  /** Mode actuel du thème */
  mode: ThemeMode
  /** Preset de thème sélectionné */
  preset: string
  /** Indique si le mode gaming est activé */
  gaming: boolean
  /** Préférences utilisateur */
  preferences: {
    /** Respect de la préférence système */
    respectSystemPreference: boolean
    /** Transitions animées */
    enableTransitions: boolean
  }
}