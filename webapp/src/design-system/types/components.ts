/**
 * Components Types - Consolidated
 * Regroupe tous les types liés aux composants du design system
 */

import type { ThemeMode, ThemeChangeEvent } from './theme'

// ============================================================================
// TYPES DE BASE ET UTILITAIRES
// ============================================================================

/**
 * Gestionnaire d'événements générique
 */
export type ComponentEventHandler = (...args: unknown[]) => void

/**
 * Tailles communes aux composants
 */
export type ComponentSize = 'tiny' | 'small' | 'medium' | 'large' | 'xl'

/**
 * Variantes sémantiques communes
 */
export type SemanticVariant = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info'

/**
 * Types de boutons HTML
 */
export type ButtonType = 'button' | 'submit' | 'reset'

/**
 * Types d'inputs
 */
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

/**
 * Modes d'affichage des composants
 */
export type DisplayMode = 'default' | 'ghost' | 'outline' | 'gaming'

// ============================================================================
// PROPS ET ÉVÉNEMENTS DES COMPOSANTS
// ============================================================================

/**
 * Props du composant DsButton
 */
export interface DsButtonProps {
  text: string
  variant?: SemanticVariant
  size?: ComponentSize
  disabled?: boolean
  loading?: boolean
  icon?: any
  ghost?: boolean
  gaming?: boolean
  type?: ButtonType
}

/**
 * Événements du composant DsButton
 */
export interface DsButtonEmits {
  click: []
}

/**
 * Props du composant DsInput
 */
export interface DsInputProps {
  modelValue: string | number | null
  placeholder?: string
  label?: string
  disabled?: boolean
  type?: InputType
  id?: string
}

/**
 * Événements du composant DsInput
 */
export interface DsInputEmits {
  'update:modelValue': [value: string | number | null]
}

/**
 * Props du composant DsCard
 */
export interface DsCardProps {
  title?: string
  elevation?: 'none' | 'sm' | 'md' | 'lg' | 'xl'
  bordered?: boolean
}

/**
 * Props du composant DsThemeSelector
 */
export interface DsThemeSelectorProps {
  showModeToggle?: boolean
  showPresetSelector?: boolean
  showAdvanced?: boolean
  size?: ComponentSize
  compact?: boolean
  gaming?: boolean
}

/**
 * Événements du composant DsThemeSelector
 */
export interface DsThemeSelectorEmits {
  'mode-change': [mode: ThemeMode]
  'preset-change': [preset: string]
  'theme-change': [theme: ThemeChangeEvent]
}

// ============================================================================
// TYPES POUR LE SYSTÈME DE THÈME
// ============================================================================

/**
 * Mode de thème - défini dans theme.ts
 */
// export type ThemeMode = 'light' | 'dark' | 'auto' // Supprimé pour éviter la duplication

/**
 * Événement de changement de thème - défini dans theme.ts
 */
// export type ThemeChangeEvent = ... // Supprimé pour éviter la duplication

// ============================================================================
// TYPES POUR LE SYSTÈME DE COULEURS DES COMPOSANTS
// ============================================================================

/**
 * Schéma de couleurs pour un bouton
 */
export interface ButtonColorScheme {
  base: string
  hover: string
  pressed: string
  glow: string
  gradient: string
  borderGlow: string
}

// Note: Les types de démo sont maintenant dans demo.ts pour éviter les conflits

// ============================================================================
// TYPES LEGACY (à migrer progressivement)
// ============================================================================

/**
 * @deprecated Utiliser DsButtonProps à la place
 * Interface legacy pour les variantes de boutons
 */
export interface ButtonVariantInterface {
  variant: 'primary' | 'secondary' | 'outline' | 'ghost' | 'gaming'
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
  disabled?: boolean
  loading?: boolean
}