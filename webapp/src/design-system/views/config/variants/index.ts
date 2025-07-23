/**
 * Point d'entrée centralisé pour tous les variants de composants
 */

// Import des sections par composant
import { themeSelectorSections } from './theme-selector-variants'
import { buttonSections } from './button-variants'
import { cardSections } from './card-variants'
import { inputSections } from './input-variants'

/**
 * Configuration complète de tous les variants disponibles
 * Agrège toutes les sections de tous les composants
 */
export const allComponentVariants = [
  ...themeSelectorSections,
  ...buttonSections,
  ...cardSections,
  ...inputSections
]
