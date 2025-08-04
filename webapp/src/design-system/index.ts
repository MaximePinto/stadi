// Design System - Point d'entrée principal

// Components
export * from './components'

// Store de thème
export { useThemeStore } from '@/stores/theme'

// Default export pour faciliter l'import
import * as components from './components'

export default {
  components
}