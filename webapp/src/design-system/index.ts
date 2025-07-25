// Design System - Point d'entrée principal

// Foundations
export * from './foundations/tokens'

// Components
export * from './components'

// Composables globaux
export { useDesignSystem } from './composables/useDesignSystem'

// Generators (pour configuration externe)
export { generateTailwindConfig } from './generators/tailwind.generator'

// Types & Interfaces
export * from './types'

// Default export pour faciliter l'import
import { useDesignSystem } from './composables/useDesignSystem'
import * as components from './components'

export default {
  useDesignSystem,
  components
}