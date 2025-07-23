import { markRaw } from 'vue'
import { DsButton } from '@/design-system'
import type { ComponentSection, ComponentGroup } from '@/design-system/types/demo'

/**
 * Factory pour créer la section principale des boutons
 */
const createButtonMainSection = (): ComponentSection => ({
  title: "Boutons Principaux",
  component: markRaw(DsButton),
  category: "forms",
  layout: "inline",
  description: "Boutons utilisés couramment dans l'interface",
  tags: ["button", "primary", "action"],
  variants: [
    {
      title: "Primaire",
      props: { text: "Action Principale", variant: "primary" },
      description: "Action principale de l'interface",
      complexity: "basic",
      tags: ["primary", "main-action"]
    },
    {
      title: "Secondaire",
      props: { text: "Action Secondaire", variant: "secondary" },
      description: "Action alternative",
      complexity: "basic",
      tags: ["secondary", "alternative"]
    }
  ]
})

/**
 * Factory pour créer la section des variantes de boutons
 */
const createButtonVariantsSection = (): ComponentSection => ({
  title: "Variantes des Boutons",
  component: markRaw(DsButton),
  category: "forms",
  layout: "grid",
  description: "Toutes les variantes disponibles pour les boutons",
  tags: ["variants", "states", "styles"],
  variants: [
    {
      title: "Primaire",
      props: { text: "Bouton Primaire", variant: "primary" },
      description: "Action principale standard",
      complexity: "basic",
      tags: ["primary", "standard"]
    },
    {
      title: "Secondaire",
      props: { text: "Bouton Secondaire", variant: "secondary" },
      description: "Action secondaire standard",
      complexity: "basic",
      tags: ["secondary", "standard"]
    },
    {
      title: "Succès",
      props: { text: "Action Réussie", variant: "success" },
      description: "Pour les confirmations et actions réussies",
      complexity: "basic",
      tags: ["success", "confirmation"]
    },
    {
      title: "Avertissement",
      props: { text: "Attention", variant: "warning" },
      description: "Pour attirer l'attention sur une action importante",
      complexity: "basic",
      tags: ["warning", "attention"]
    },
    {
      title: "Erreur",
      props: { text: "Action Critique", variant: "error" },
      description: "Pour les actions destructives ou critiques",
      complexity: "basic",
      tags: ["error", "destructive"]
    },
    {
      title: "Désactivé",
      props: { text: "Non Disponible", variant: "primary", disabled: true },
      description: "État inactif du bouton",
      complexity: "basic",
      tags: ["disabled", "inactive"]
    },
    {
      title: "Chargement",
      props: { text: "Traitement...", variant: "primary", loading: true },
      description: "État de chargement avec spinner",
      complexity: "intermediate",
      tags: ["loading", "processing"]
    },
    {
      title: "Ghost",
      props: { text: "Style Ghost", variant: "primary", ghost: true },
      description: "Style transparent avec bordure",
      complexity: "intermediate",
      tags: ["ghost", "transparent"]
    }
  ]
})

/**
 * Factory pour créer la section des tailles de boutons
 */
const createButtonSizesSection = (): ComponentSection => ({
  title: "Tailles des Boutons",
  component: markRaw(DsButton),
  category: "forms",
  layout: "inline",
  description: "Différentes tailles disponibles",
  tags: ["sizes", "dimensions"],
  variants: [
    {
      title: "Petit",
      props: { text: "Petit", variant: "primary", size: "tiny" },
      description: "Taille réduite pour espaces contraints",
      complexity: "basic",
      tags: ["tiny", "small"]
    },
    {
      title: "Moyen",
      props: { text: "Moyen", variant: "primary", size: "small" },
      description: "Taille standard",
      complexity: "basic",
      tags: ["small", "standard"]
    },
    {
      title: "Normal",
      props: { text: "Normal", variant: "primary", size: "medium" },
      description: "Taille par défaut",
      complexity: "basic",
      tags: ["medium", "default"]
    },
    {
      title: "Grand",
      props: { text: "Grand", variant: "primary", size: "large" },
      description: "Taille élargie pour CTAs importantes",
      complexity: "basic",
      tags: ["large", "cta"]
    }
  ]
})

/**
 * Factory pour créer la section des effets gaming
 */
const createButtonGamingSection = (): ComponentSection => ({
  title: "Effets Gaming",
  component: markRaw(DsButton),
  category: "forms",
  layout: "grid",
  description: "Boutons avec et sans effets gaming",
  tags: ["gaming", "effects", "visual"],
  variants: [
    {
      title: "Avec Gaming",
      props: { text: "Style Gaming", variant: "primary", gaming: true },
      description: "Effets visuels gaming activés",
      complexity: "intermediate",
      tags: ["gaming", "effects", "enhanced"]
    },
    {
      title: "Sans Gaming",
      props: { text: "Style Standard", variant: "primary", gaming: false },
      description: "Style classique sans effets",
      complexity: "basic",
      tags: ["standard", "minimal", "clean"]
    },
    {
      title: "Gaming + Ghost",
      props: { text: "Gaming Ghost", variant: "primary", gaming: true, ghost: true },
      description: "Combinaison gaming et ghost",
      complexity: "advanced",
      tags: ["gaming", "ghost", "advanced"]
    }
  ]
})

/**
 * Groupe principal des boutons (Principal + Variantes)
 */
const createButtonGroup = (): ComponentGroup => ({
  title: "Boutons",
  category: "forms" as const,
  description: "Système complet de boutons avec toutes les variantes",
  tags: ["button", "action", "forms"],
  mainSection: createButtonMainSection(),
  variantsSection: createButtonVariantsSection()
})

/**
 * Groupe des tailles de boutons
 */
const createButtonSizesGroup = (): ComponentGroup => ({
  title: "Tailles des Boutons", 
  category: "forms" as const,
  description: "Différentes tailles disponibles pour les boutons",
  tags: ["button", "sizes", "dimensions"],
  mainSection: createButtonSizesSection(),
  variantsSection: {
    title: "",
    component: null,
    category: "forms" as const,
    variants: []
  }
})

/**
 * Groupe des effets gaming
 */
const createButtonGamingGroup = (): ComponentGroup => ({
  title: "Effets Gaming",
  category: "forms" as const, 
  description: "Boutons avec et sans effets gaming",
  tags: ["button", "gaming", "effects", "visual"],
  mainSection: {
    title: "",
    component: null,
    category: "forms" as const,
    variants: []
  },
  variantsSection: createButtonGamingSection()
})

/**
 * Toutes les sections des boutons - Structure ComponentGroup uniquement
 */
export const buttonSections = [
  createButtonGroup(),
  createButtonSizesGroup(),
  createButtonGamingGroup()
]