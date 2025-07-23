import { markRaw } from 'vue'
import { DsInput } from '@/design-system'
import type { ComponentSection } from '@/design-system/types/demo'

/**
 * Factory pour créer la section principale des inputs
 */
const createInputMainSection = (): ComponentSection => ({
  title: "Champs de Saisie Principaux",
  component: markRaw(DsInput),
  category: "forms",
  layout: "grid",
  description: "Champs de saisie couramment utilisés",
  tags: ["input", "forms", "text"],
  variants: [
    {
      title: "Texte Standard",
      props: {
        modelValue: "",
        placeholder: "Saisissez votre texte",
        label: "Texte",
        type: "text"
      },
      description: "Champ de texte basique",
      complexity: "basic",
      tags: ["text", "standard", "basic"]
    },
    {
      title: "Email",
      props: {
        modelValue: "",
        placeholder: "votre@email.com",
        label: "Adresse Email",
        type: "email"
      },
      description: "Champ pour adresse email",
      complexity: "basic",
      tags: ["email", "validation", "contact"]
    }
  ]
})

/**
 * Factory pour créer la section des types d'inputs
 */
const createInputTypesSection = (): ComponentSection => ({
  title: "Types de Champs",
  component: markRaw(DsInput),
  category: "forms",
  layout: "grid",
  description: "Différents types de champs de saisie",
  tags: ["types", "validation", "forms"],
  variants: [
    {
      title: "Texte",
      props: {
        modelValue: "",
        placeholder: "Texte libre",
        label: "Champ Texte",
        type: "text"
      },
      description: "Saisie de texte libre",
      complexity: "basic",
      tags: ["text", "free-form"]
    },
    {
      title: "Email",
      props: {
        modelValue: "",
        placeholder: "utilisateur@exemple.com",
        label: "Email",
        type: "email"
      },
      description: "Validation automatique d'email",
      complexity: "basic",
      tags: ["email", "validation"]
    },
    {
      title: "Mot de Passe",
      props: {
        modelValue: "",
        placeholder: "••••••••",
        label: "Mot de Passe",
        type: "password"
      },
      description: "Saisie sécurisée masquée",
      complexity: "basic",
      tags: ["password", "secure", "hidden"]
    },
    {
      title: "Nombre",
      props: {
        modelValue: "",
        placeholder: "0",
        label: "Nombre",
        type: "number"
      },
      description: "Saisie numérique uniquement",
      complexity: "basic",
      tags: ["number", "numeric", "validation"]
    }
  ]
})

/**
 * Factory pour créer la section des états d'inputs
 */
const createInputStatesSection = (): ComponentSection => ({
  title: "États des Champs",
  component: markRaw(DsInput),
  category: "forms",
  layout: "grid",
  description: "Différents états possibles des champs",
  tags: ["states", "disabled", "readonly"],
  variants: [
    {
      title: "Normal",
      props: {
        modelValue: "",
        placeholder: "Saisie normale",
        label: "État Normal",
        disabled: false
      },
      description: "État par défaut, saisie active",
      complexity: "basic",
      tags: ["normal", "active", "default"]
    },
    {
      title: "Désactivé",
      props: {
        modelValue: "Valeur non modifiable",
        label: "Champ Désactivé",
        disabled: true
      },
      description: "Champ inactif, non modifiable",
      complexity: "basic",
      tags: ["disabled", "inactive", "readonly"]
    },
    {
      title: "Avec Valeur",
      props: {
        modelValue: "Valeur pré-remplie",
        label: "Champ Pré-rempli",
        placeholder: "Placeholder"
      },
      description: "Champ avec valeur par défaut",
      complexity: "basic",
      tags: ["prefilled", "value", "default"]
    }
  ]
})

/**
 * Factory pour créer la section des labels et placeholders
 */
const createInputLabelsSection = (): ComponentSection => ({
  title: "Labels et Textes d'Aide",
  component: markRaw(DsInput),
  category: "forms",
  layout: "grid",
  description: "Variations de labels et textes d'aide",
  tags: ["labels", "placeholder", "accessibility"],
  variants: [
    {
      title: "Avec Label",
      props: {
        modelValue: "",
        placeholder: "Placeholder avec label",
        label: "Nom d'Utilisateur"
      },
      description: "Champ avec label explicite",
      complexity: "basic",
      tags: ["label", "accessibility", "clear"]
    },
    {
      title: "Sans Label",
      props: {
        modelValue: "",
        placeholder: "Rechercher..."
      },
      description: "Champ avec placeholder uniquement",
      complexity: "basic",
      tags: ["no-label", "placeholder-only", "minimal"]
    },
    {
      title: "Label Long",
      props: {
        modelValue: "",
        placeholder: "Détails de votre question",
        label: "Description Détaillée de Votre Problème ou Question"
      },
      description: "Gestion des labels longs",
      complexity: "intermediate",
      tags: ["long-label", "detailed", "wrapping"]
    },
    {
      title: "Placeholder Long",
      props: {
        modelValue: "",
        placeholder: "Veuillez décrire en détail votre demande afin que nous puissions vous aider au mieux",
        label: "Demande"
      },
      description: "Gestion des placeholders descriptifs",
      complexity: "intermediate",
      tags: ["long-placeholder", "descriptive", "help"]
    }
  ]
})

/**
 * Factory pour créer la section des cas d'usage spécialisés
 */
const createInputSpecializedSection = (): ComponentSection => ({
  title: "Cas d'Usage Spécialisés",
  component: markRaw(DsInput),
  category: "forms",
  layout: "grid",
  description: "Champs pour des besoins spécifiques",
  tags: ["specialized", "specific", "advanced"],
  variants: [
    {
      title: "Recherche",
      props: {
        modelValue: "",
        placeholder: "🔍 Rechercher dans le contenu...",
        label: "Recherche"
      },
      description: "Champ de recherche avec icône",
      complexity: "intermediate",
      tags: ["search", "icon", "filter"]
    },
    {
      title: "Code/Token",
      props: {
        modelValue: "",
        placeholder: "ABC123XYZ",
        label: "Code d'Activation",
        type: "text"
      },
      description: "Saisie de codes ou tokens",
      complexity: "intermediate",
      tags: ["code", "token", "activation"]
    },
    {
      title: "URL",
      props: {
        modelValue: "",
        placeholder: "https://exemple.com",
        label: "Site Web",
        type: "text"
      },
      description: "Saisie d'adresse web",
      complexity: "intermediate",
      tags: ["url", "website", "link"]
    }
  ]
})

/**
 * Toutes les sections des inputs
 */
export const inputSections = [
  createInputMainSection(),
  createInputTypesSection(),
  createInputStatesSection(),
  createInputLabelsSection(),
  createInputSpecializedSection()
]
