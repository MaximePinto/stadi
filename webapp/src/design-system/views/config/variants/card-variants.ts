import { markRaw } from 'vue'
import { DsCard } from '@/design-system'
import type { ComponentSection, ComponentGroup } from '@/design-system/types/demo'

/**
 * Factory pour créer la section principale des cartes
 */
const createCardMainSection = (): ComponentSection => ({
  title: "Cartes de Base",
  component: markRaw(DsCard),
  category: "layout",
  layout: "grid",
  description: "Cartes avec différents types de contenu",
  tags: ["card", "container", "layout"],
  variants: [
    {
      title: "Contenu Simple",
      props: {},
      template: `
        <div class="space-y-2">
          <h3 class="text-lg font-semibold text-text-primary">Titre de la carte</h3>
          <p class="text-text-secondary">Contenu simple avec du texte standard dans une carte.</p>
        </div>
      `,
      description: "Carte basique avec titre et texte",
      complexity: "basic",
      tags: ["simple", "text", "basic"]
    },
    {
      title: "Avec Liste",
      props: {},
      template: `
        <div class="space-y-3">
          <h3 class="text-lg font-semibold text-text-primary">Liste d'éléments</h3>
          <ul class="space-y-1 text-text-secondary">
            <li>• Premier élément</li>
            <li>• Deuxième élément</li>
            <li>• Troisième élément</li>
          </ul>
        </div>
      `,
      description: "Carte contenant une liste d'éléments",
      complexity: "basic",
      tags: ["list", "items", "organized"]
    },
    {
      title: "Contenu Riche",
      props: {},
      template: `
        <div class="space-y-4">
          <div class="flex items-center gap-3">
            <div class="w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold">DS</div>
            <div>
              <h3 class="text-lg font-semibold text-text-primary">Design System</h3>
              <p class="text-sm text-text-secondary">Composant avancé</p>
            </div>
          </div>
          <p class="text-text-secondary">Cette carte démontre un contenu plus complexe avec avatar, titre, sous-titre et description détaillée.</p>
          <div class="flex gap-2 pt-2">
            <span class="px-2 py-1 bg-bg-mute text-text-secondary text-xs rounded">Vue 3</span>
            <span class="px-2 py-1 bg-bg-mute text-text-secondary text-xs rounded">TypeScript</span>
          </div>
        </div>
      `,
      description: "Carte avec contenu riche et éléments multiples",
      complexity: "intermediate",
      tags: ["rich", "avatar", "tags", "complex"]
    }
  ]
})

/**
 * Factory pour créer la section des cartes interactives
 */
const createCardInteractiveSection = (): ComponentSection => ({
  title: "Cartes Interactives",
  component: markRaw(DsCard),
  category: "layout",
  layout: "grid",
  description: "Cartes avec éléments interactifs",
  tags: ["interactive", "buttons", "actions"],
  variants: [
    {
      title: "Avec Actions",
      props: {},
      template: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-text-primary">Carte avec Actions</h3>
          <p class="text-text-secondary">Cette carte contient des boutons d'action pour interagir avec le contenu.</p>
          <div class="flex gap-2 pt-2">
            <button class="px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors">Valider</button>
            <button class="px-3 py-1 border border-border-base text-text-primary rounded text-sm hover:border-border-hover transition-colors">Annuler</button>  
          </div>
        </div>
      `,
      description: "Carte avec boutons d'action intégrés",
      complexity: "intermediate",
      tags: ["actions", "buttons", "interactive"]
    },
    {
      title: "Formulaire",
      props: {},
      template: `
        <div class="space-y-4">
          <h3 class="text-lg font-semibold text-text-primary">Formulaire dans Carte</h3>
          <div class="space-y-3">
            <div>
              <label class="block text-sm font-medium text-text-primary mb-1">Nom</label>
              <input 
                type="text"
                class="w-full p-2 border border-border-base rounded bg-bg-base text-text-primary focus:border-primary focus:outline-none"
                placeholder="Votre nom"
              />
            </div>
            <div>
              <label class="block text-sm font-medium text-text-primary mb-1">Email</label>
              <input 
                type="email" 
                class="w-full p-2 border border-border-base rounded bg-bg-base text-text-primary focus:border-primary focus:outline-none"
                placeholder="votre@email.com"
              />
            </div>
            <button class="w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors">Envoyer</button>
          </div>
        </div>
      `,
      description: "Carte contenant un formulaire complet",
      complexity: "advanced",
      tags: ["form", "input", "validation", "complex"]
    }
  ]
})

/**
 * Factory pour créer la section des variantes visuelles
 */
const createCardVisualSection = (): ComponentSection => ({
  title: "Styles Visuels",
  component: markRaw(DsCard),
  category: "layout",
  layout: "grid",
  description: "Différents styles visuels pour les cartes",
  tags: ["visual", "styles", "appearance"],
  variants: [
    {
      title: "Standard",
      props: {},
      template: `
        <div class="text-center py-4">
          <h3 class="text-lg font-semibold text-text-primary mb-2">Carte Standard</h3>
          <p class="text-text-secondary">Style par défaut avec ombre et bordures</p>
        </div>
      `,
      description: "Style de carte par défaut",
      complexity: "basic",
      tags: ["default", "standard", "shadow"]
    },
    {
      title: "Contenu Minimal",
      props: {},
      template: `
        <div class="text-center py-2">
          <p class="text-text-primary">Contenu minimal</p>
        </div>
      `,
      description: "Carte avec contenu très simple",
      complexity: "basic",
      tags: ["minimal", "simple", "clean"]
    },
    {
      title: "Centré",
      props: {},
      template: `
        <div class="text-center py-6">
          <div class="w-16 h-16 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center">
            <span class="text-white text-xl font-bold">🎨</span>
          </div>
          <h3 class="text-lg font-semibold text-text-primary mb-2">Design System</h3>
          <p class="text-text-secondary text-sm">Carte avec contenu centré et icône</p>
        </div>
      `,
      description: "Carte avec mise en page centrée",
      complexity: "intermediate",
      tags: ["centered", "icon", "featured"]
    }
  ]
})

/**
 * Groupe des cartes de base
 */
const createCardBaseGroup = (): ComponentGroup => ({
  title: "Cartes de Base",
  category: "layout" as const,
  description: "Composant carte avec différents types de contenu",
  tags: ["card", "container", "layout", "content"],
  mainSection: createCardMainSection(),
  variantsSection: {
    title: "",
    component: null,
    category: "layout" as const,
    variants: []
  }
})

/**
 * Groupe des cartes interactives
 */
const createCardInteractiveGroup = (): ComponentGroup => ({
  title: "Cartes Interactives",
  category: "layout" as const,
  description: "Cartes avec éléments interactifs et actions",
  tags: ["card", "interactive", "buttons", "actions"],
  mainSection: {
    title: "",
    component: null,
    category: "layout" as const,
    variants: []
  },
  variantsSection: createCardInteractiveSection()
})

/**
 * Groupe des styles visuels
 */
const createCardVisualGroup = (): ComponentGroup => ({
  title: "Styles Visuels des Cartes",
  category: "layout" as const,
  description: "Différents styles visuels pour les cartes",
  tags: ["card", "visual", "styles", "appearance"],
  mainSection: {
    title: "",
    component: null,
    category: "layout" as const,
    variants: []
  },
  variantsSection: createCardVisualSection()
})

/**
 * Toutes les sections des cartes - Structure ComponentGroup uniquement
 */
export const cardSections = [
  createCardBaseGroup(),
  createCardInteractiveGroup(),
  createCardVisualGroup()
]