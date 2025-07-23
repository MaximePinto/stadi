import { markRaw } from 'vue'
import { DsThemeSelector } from '@/design-system'
import type { ComponentSection, ComponentGroup } from '@/design-system/types/demo'

/**
 * Factory pour créer la section du sélecteur de thème principal
 */
const createThemeSelectorMainSection = (): ComponentSection => ({
  title: "Sélecteur de Thème Principal",
  component: markRaw(DsThemeSelector),
  category: "theming",
  layout: "inline",
  description: "Version complète avec tous les contrôles",
  tags: ["theme", "mode", "preset", "principal"],
  variants: [{
    title: "Défaut",
    props: {},
    description: "Configuration par défaut avec toutes les fonctionnalités",
    complexity: "intermediate",
    tags: ["default", "complete"]
  }]
})

/**
 * Factory pour créer la section des variantes du sélecteur de thème
 */
const createThemeSelectorVariantsSection = (): ComponentSection => ({
  title: "Variantes du Sélecteur",
  component: markRaw(DsThemeSelector),
  category: "theming",
  layout: "grid",
  description: "Différentes configurations du sélecteur de thème",
  tags: ["variants", "configurations", "sizes"],
  variants: [
    {
      title: "Compact",
      props: {
        compact: true,
        size: "small",
        "show-advanced": false
      },
      description: "Version compacte pour les espaces restreints",
      complexity: "basic",
      tags: ["compact", "small", "minimal"]
    },
    {
      title: "Large",
      props: {
        size: "large",
        "show-advanced": true
      },
      description: "Version étendue avec options avancées",
      complexity: "intermediate",
      tags: ["large", "advanced", "extended"]
    },
    {
      title: "Sans Gaming",
      props: {
        gaming: false,
        "show-preset-selector": false
      },
      description: "Version simplifiée sans thèmes gaming",
      complexity: "basic",
      tags: ["simple", "no-gaming", "minimal"]
    },
    {
      title: "Mode uniquement",
      props: {
        "show-preset-selector": false,
        "show-advanced": false
      },
      description: "Seul le toggle dark/light mode",
      complexity: "basic",
      tags: ["mode-only", "toggle", "simple"]
    },
    {
      title: "Preset uniquement",
      props: {
        "show-mode-toggle": false,
        "show-advanced": false
      },
      description: "Seul le sélecteur de presets",
      complexity: "basic",
      tags: ["preset-only", "selector", "themes"]
    },
    {
      title: "Complet",
      props: {
        "show-advanced": true,
        gaming: true
      },
      description: "Toutes les fonctionnalités activées",
      complexity: "advanced",
      tags: ["complete", "full-featured", "advanced"]
    }
  ]
})

/**
 * Groupe du sélecteur de thème
 */
const createThemeSelectorGroup = (): ComponentGroup => ({
  title: "Sélecteur de Thème",
  category: "theming" as const,
  description: "Composant pour changer les thèmes et modes d'affichage",
  tags: ["theme", "mode", "preset", "selector"],
  mainSection: createThemeSelectorMainSection(),
  variantsSection: createThemeSelectorVariantsSection()
})

/**
 * Toutes les sections du ThemeSelector - Structure ComponentGroup uniquement
 */
export const themeSelectorSections = [
  createThemeSelectorGroup()
]
