/**
 * Point d'entrée centralisé pour tous les variants de composants
 */

// Import des sections par composant
import { themeSelectorSections } from './theme-selector-variants'

/**
 * Configuration complète de tous les variants disponibles
 * Agrège toutes les sections de tous les composants
 */
export const allComponentVariants = [
  ...themeSelectorSections
  // Ajouter ici d'autres composants :
  // ...buttonSections,
  // ...inputSections,
  // etc.
]
