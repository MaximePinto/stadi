import { markRaw, h } from 'vue'
import { DsCard } from '@/design-system'
import type { ComponentSection } from '@/design-system/types/demo'

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
      props: {
        default: () => h('div', { class: 'space-y-2' }, [
          h('h3', { class: 'text-lg font-semibold text-text-primary' }, 'Titre de la carte'),
          h('p', { class: 'text-text-secondary' }, 'Contenu simple avec du texte standard dans une carte.')
        ])
      },
      description: "Carte basique avec titre et texte",
      complexity: "basic",
      tags: ["simple", "text", "basic"]
    },
    {
      title: "Avec Liste",
      props: {
        default: () => h('div', { class: 'space-y-3' }, [
          h('h3', { class: 'text-lg font-semibold text-text-primary' }, 'Liste d\'éléments'),
          h('ul', { class: 'space-y-1 text-text-secondary' }, [
            h('li', '• Premier élément'),
            h('li', '• Deuxième élément'),
            h('li', '• Troisième élément')
          ])
        ])
      },
      description: "Carte contenant une liste d'éléments",
      complexity: "basic",
      tags: ["list", "items", "organized"]
    },
    {
      title: "Contenu Riche",
      props: {
        default: () => h('div', { class: 'space-y-4' }, [
          h('div', { class: 'flex items-center gap-3' }, [
            h('div', { 
              class: 'w-12 h-12 bg-primary rounded-full flex items-center justify-center text-white font-bold' 
            }, 'DS'),
            h('div', [
              h('h3', { class: 'text-lg font-semibold text-text-primary' }, 'Design System'),
              h('p', { class: 'text-sm text-text-secondary' }, 'Composant avancé')
            ])
          ]),
          h('p', { class: 'text-text-secondary' }, 'Cette carte démontre un contenu plus complexe avec avatar, titre, sous-titre et description détaillée.'),
          h('div', { class: 'flex gap-2 pt-2' }, [
            h('span', { class: 'px-2 py-1 bg-bg-mute text-text-secondary text-xs rounded' }, 'Vue 3'),
            h('span', { class: 'px-2 py-1 bg-bg-mute text-text-secondary text-xs rounded' }, 'TypeScript')
          ])
        ])
      },
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
      props: {
        default: () => h('div', { class: 'space-y-4' }, [
          h('h3', { class: 'text-lg font-semibold text-text-primary' }, 'Carte avec Actions'),
          h('p', { class: 'text-text-secondary' }, 'Cette carte contient des boutons d\'action pour interagir avec le contenu.'),
          h('div', { class: 'flex gap-2 pt-2' }, [
            h('button', { 
              class: 'px-3 py-1 bg-primary text-white rounded text-sm hover:bg-primary-hover transition-colors' 
            }, 'Valider'),
            h('button', { 
              class: 'px-3 py-1 border border-border-base text-text-primary rounded text-sm hover:border-border-hover transition-colors' 
            }, 'Annuler')
          ])
        ])
      },
      description: "Carte avec boutons d'action intégrés",
      complexity: "intermediate",
      tags: ["actions", "buttons", "interactive"]
    },
    {
      title: "Formulaire",
      props: {
        default: () => h('div', { class: 'space-y-4' }, [
          h('h3', { class: 'text-lg font-semibold text-text-primary' }, 'Formulaire dans Carte'),
          h('div', { class: 'space-y-3' }, [
            h('div', [
              h('label', { class: 'block text-sm font-medium text-text-primary mb-1' }, 'Nom'),
              h('input', { 
                type: 'text',
                class: 'w-full p-2 border border-border-base rounded bg-bg-base text-text-primary focus:border-primary focus:outline-none',
                placeholder: 'Votre nom'
              })
            ]),
            h('div', [
              h('label', { class: 'block text-sm font-medium text-text-primary mb-1' }, 'Email'),
              h('input', { 
                type: 'email',
                class: 'w-full p-2 border border-border-base rounded bg-bg-base text-text-primary focus:border-primary focus:outline-none',
                placeholder: 'votre@email.com'
              })
            ]),
            h('button', { 
              class: 'w-full px-4 py-2 bg-primary text-white rounded hover:bg-primary-hover transition-colors' 
            }, 'Envoyer')
          ])
        ])
      },
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
      props: {
        default: () => h('div', { class: 'text-center py-4' }, [
          h('h3', { class: 'text-lg font-semibold text-text-primary mb-2' }, 'Carte Standard'),
          h('p', { class: 'text-text-secondary' }, 'Style par défaut avec ombre et bordures')
        ])
      },
      description: "Style de carte par défaut",
      complexity: "basic",
      tags: ["default", "standard", "shadow"]
    },
    {
      title: "Contenu Minimal",
      props: {
        default: () => h('div', { class: 'text-center py-2' }, [
          h('p', { class: 'text-text-primary' }, 'Contenu minimal')
        ])
      },
      description: "Carte avec contenu très simple",
      complexity: "basic",
      tags: ["minimal", "simple", "clean"]
    },
    {
      title: "Centré",
      props: {
        default: () => h('div', { class: 'text-center py-6' }, [
          h('div', { class: 'w-16 h-16 bg-primary rounded-full mx-auto mb-3 flex items-center justify-center' }, [
            h('span', { class: 'text-white text-xl font-bold' }, '🎨')
          ]),
          h('h3', { class: 'text-lg font-semibold text-text-primary mb-2' }, 'Design System'),
          h('p', { class: 'text-text-secondary text-sm' }, 'Carte avec contenu centré et icône')
        ])
      },
      description: "Carte avec mise en page centrée",
      complexity: "intermediate",
      tags: ["centered", "icon", "featured"]
    }
  ]
})

/**
 * Toutes les sections des cartes
 */
export const cardSections = [
  createCardMainSection(),
  createCardInteractiveSection(),
  createCardVisualSection()
]