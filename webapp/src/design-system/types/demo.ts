/**
 * Demo System Types
 * Types spécifiques au système de démonstration des composants
 */

// ============================================================================
// TYPES DE BASE POUR LES DÉMOS
// ============================================================================

/**
 * Gestionnaire d'événements générique
 */
export type EventHandler = (...args: unknown[]) => void

/**
 * Catégories de composants pour l'organisation
 */
export type ComponentCategory = 'theming' | 'forms' | 'navigation' | 'layout' | 'feedback'

/**
 * Niveaux de complexité des variantes
 */
export type ComplexityLevel = 'basic' | 'intermediate' | 'advanced'

/**
 * Modes d'affichage des sections de démo
 */
export type DisplayLayout = 'grid' | 'inline'

// ============================================================================
// INTERFACES POUR LA CONFIGURATION DES DÉMOS
// ============================================================================

/**
 * Configuration d'une variante de composant
 */
export interface ComponentVariant {
  /** Nom de la variante */
  title: string
  /** Props à passer au composant */
  props: Record<string, unknown>
  /** Événements à écouter */
  events?: Record<string, EventHandler>
  /** Description courte de la variante */
  description?: string
  /** Tags pour faciliter la recherche */
  tags?: string[]
  /** Niveau de complexité */
  complexity?: ComplexityLevel
}

/**
 * Configuration d'une section de démonstration
 */
export interface ComponentSection {
  /** Titre de la section */
  title: string
  /** Référence du composant Vue */
  component: unknown
  /** Description de la section */
  description?: string
  /** Catégorie du composant */
  category: ComponentCategory
  /** Mode d'affichage des variants */
  layout?: DisplayLayout
  /** Tags pour faciliter la recherche */
  tags?: string[]
  /** Indique si c'est un composant expérimental */
  experimental?: boolean
  /** Liste des variantes à démontrer */
  variants: ComponentVariant[]
}

/**
 * Groupe de composants avec section principale et variantes
 */
export interface ComponentGroup {
  /** Titre du groupe */
  title: string
  /** Catégorie du composant */
  category: ComponentCategory
  /** Description du groupe */
  description?: string
  /** Tags pour faciliter la recherche */
  tags?: string[]
  /** Section principale (layout inline généralement) */
  mainSection: ComponentSection
  /** Section des variantes (layout grid généralement) */
  variantsSection: ComponentSection
}