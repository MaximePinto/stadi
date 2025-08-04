<template>
  <!-- Conteneur principal de la démo du design system -->
  <div class="theme-demo">
    <!-- En-tête de la page de démonstration -->
    <div class="theme-demo-header">
      <h1 class="text-3xl font-bold text-text-primary mb-4">
        🎨 Démonstration du Design System
      </h1>
      <p class="text-text-secondary mb-8">
        Explorez tous les composants et leurs variantes dans différents thèmes
      </p>
    </div>

    <!-- Boucle sur chaque groupe de composants -->
    <div
      v-for="(group, index) in componentVariants"
      :key="group.title"
      class="theme-demo-section"
    >
      <!-- En-tête du groupe -->
      <div class="section-header mb-4">
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-2 mb-2">
            <h2 class="text-xl font-semibold text-text-primary">
              {{ group.title }}
            </h2>
            <span class="category-badge">{{ group.category }}</span>
          </div>
          <button 
            @click="toggleSection(index)"
            class="collapse-toggle"
            :class="{ 'rotated': isSectionCollapsed(index) }"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M4 6l4 4 4-4H4z"/>
            </svg>
          </button>
        </div>
        <p v-if="group.description" class="text-text-secondary mb-2">
          {{ group.description }}
        </p>
        <div v-if="group.tags" class="flex flex-wrap gap-1 mb-2">
          <span v-for="tag in group.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- Structure groupée : Principal + Variantes -->
      <div 
        class="component-group-container"
        :class="{ 'collapsed': isSectionCollapsed(index) }"
      >
        <!-- Bloc Principal (si il y a des variantes) -->
        <div v-if="group.mainSection.variants.length > 0" class="component-main-section">
          <h3 class="text-lg font-medium text-text-primary mb-3">{{ group.mainSection.title }}</h3>
          <div v-if="group.mainSection.layout === 'inline'" class="flex flex-wrap gap-4 items-center">
            <component
              :is="group.mainSection.component"
              v-for="(variant, index) in group.mainSection.variants"
              :key="`main-${index}`"
              v-bind="variant.props"
              v-on="variant.events || {}"
            />
            <!-- Affichage du mode de thème actuel -->
            <div class="text-sm text-text-secondary">
              Mode actuel: <span class="font-medium">{{ currentMode }}</span>
            </div>
          </div>
          <div v-else class="theme-variants-grid">
            <div
              v-for="(variant, index) in group.mainSection.variants"
              :key="`main-${index}`"
              class="theme-variant-card"
            >
              <!-- Bloc Principal : Métadonnées de la variante -->
              <div class="component-main-block">
                <div class="variant-header">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="text-base font-medium text-text-primary">
                      {{ variant.title }}
                    </h4>
                    <span v-if="variant.complexity" class="complexity-badge">
                      {{ variant.complexity }}
                    </span>
                  </div>
                  <p v-if="variant.description" class="text-sm text-text-secondary mb-2">
                    {{ variant.description }}
                  </p>
                  <div v-if="variant.tags" class="flex flex-wrap gap-1">
                    <span v-for="tag in variant.tags" :key="tag" class="tag tag-small">{{ tag }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Bloc Variante : Rendu du composant -->
              <div class="component-variant-block">
                <component
                  :is="group.mainSection.component"
                  v-bind="variant.props"
                  v-on="variant.events || {}"
                >
                  <!-- Contenu du slot si template fourni -->
                  <div v-if="variant.template" v-html="variant.template"></div>
                </component>
              </div>
            </div>
          </div>
        </div>

        <!-- Bloc Variantes (si il y a des variantes) -->
        <div v-if="group.variantsSection.variants.length > 0" class="component-variants-section">
          <h3 class="text-lg font-medium text-text-primary mb-3">{{ group.variantsSection.title }}</h3>
          <div class="theme-variants-grid">
            <div
              v-for="(variant, index) in group.variantsSection.variants"
              :key="`variant-${index}`"
              class="theme-variant-card"
            >
              <!-- Bloc Principal : Métadonnées de la variante -->
              <div class="component-main-block">
                <div class="variant-header">
                  <div class="flex items-center gap-2 mb-1">
                    <h4 class="text-base font-medium text-text-primary">
                      {{ variant.title }}
                    </h4>
                    <span v-if="variant.complexity" class="complexity-badge">
                      {{ variant.complexity }}
                    </span>
                  </div>
                  <p v-if="variant.description" class="text-sm text-text-secondary mb-2">
                    {{ variant.description }}
                  </p>
                  <div v-if="variant.tags" class="flex flex-wrap gap-1">
                    <span v-for="tag in variant.tags" :key="tag" class="tag tag-small">{{ tag }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Bloc Variante : Rendu du composant -->
              <div class="component-variant-block">
                <component
                  :is="group.variantsSection.component"
                  v-bind="variant.props"
                  v-on="variant.events || {}"
                >
                  <!-- Contenu du slot si template fourni -->
                  <div v-if="variant.template" v-html="variant.template"></div>
                </component>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useThemeStore } from '@/stores/theme'
import { DsButton, DsThemeSelector } from '@/design-system/components'

// Utilisation du store de thème
const themeStore = useThemeStore()

// État local
const currentMode = computed(() => themeStore.mode)

// État de collapse pour chaque section (basé sur l'index)
const collapsedSections = ref<Set<number>>(new Set())

// Fonction pour basculer l'état de collapse d'une section
const toggleSection = (index: number) => {
  if (collapsedSections.value.has(index)) {
    collapsedSections.value.delete(index)
  } else {
    collapsedSections.value.add(index)
  }
}

// Vérifier si une section est collapsed
const isSectionCollapsed = (index: number) => {
  return collapsedSections.value.has(index)
}

// Configuration simple des composants de demo
const componentVariants = [
  {
    title: "Boutons",
    category: "Interactive",
    description: "Boutons avec différentes variantes et tailles",
    mainSection: {
      title: "Variants",
      component: DsButton,
      layout: "inline",
      variants: [
        { props: { text: "Primary", variant: "primary" } },
        { props: { text: "Secondary", variant: "secondary" } },
        { props: { text: "Success", variant: "success" } },
        { props: { text: "Warning", variant: "warning" } },
        { props: { text: "Error", variant: "error" } },
      ]
    },
    variantsSection: {
      title: "États",
      component: DsButton,
      variants: [
        { title: "Normal", props: { text: "Normal", variant: "primary" } },
        { title: "Loading", props: { text: "Loading...", variant: "primary", loading: true } },
        { title: "Disabled", props: { text: "Disabled", variant: "primary", disabled: true } },
        { title: "Ghost", props: { text: "Ghost", variant: "primary", ghost: true } },
      ]
    }
  },
  {
    title: "Sélecteur de thème",
    category: "System",
    description: "Contrôles pour changer les thèmes",
    mainSection: {
      title: "Sélecteur",
      component: DsThemeSelector,
      layout: "inline",
      variants: [
        { props: { showColorPicker: true } }
      ]
    },
    variantsSection: { title: "", component: null, variants: [] }
  }
]
</script>

<style scoped>
.theme-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-xl);
}

.theme-demo-header {
  text-align: center;
  margin-bottom: var(--space-2xl);
}

.theme-demo-section {
  margin-bottom: var(--space-2xl);
  padding: var(--space-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.theme-variant-card {
  background: var(--surface);
  border: 2px solid var(--border);
  border-radius: var(--radius-lg);
  transition: all var(--transition-normal);
  overflow: hidden;
  box-shadow: var(--shadow-sm);
}

.theme-variant-card:hover {
  border-color: var(--border-hover);
  box-shadow: var(--shadow-lg);
  transform: translateY(-2px);
}

.theme-variants-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem; /* Augmenté pour mieux séparer les cartes */
}

.theme-variant-card {
  flex: 0 0 auto;
  min-width: 320px; /* Légèrement augmenté */
}

/* Bloc Principal : Métadonnées */
.component-main-block {
  padding: var(--space-lg);
  background: var(--surface-hover);
  border-bottom: 1px solid var(--border);
}

/* Bloc Variante : Composant rendu */
.component-variant-block {
  padding: var(--space-lg);
  background: var(--surface);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-test-zone {
  background: var(--surface);
  border-radius: var(--radius-md);
  padding: var(--space-lg);
}

.theme-test-card {
  padding: var(--space-lg);
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-md);
}

/* Nouveaux styles pour les metadata */
.category-badge {
  background: var(--primary);
  color: var(--on-primary);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.experimental-badge {
  background: var(--warning);
  color: var(--on-warning);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
}

.complexity-badge {
  background: var(--surface-pressed);
  color: var(--text-muted);
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  font-weight: 500;
  text-transform: capitalize;
}

.tag {
  background: var(--surface-pressed);
  color: var(--text-muted);
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: var(--radius-sm);
  font-weight: 400;
}

.tag-small {
  font-size: 0.65rem;
  padding: 0.15rem 0.3rem;
}

.section-header {
  border-bottom: 1px solid var(--border);
  padding-bottom: var(--space-sm);
}

/* Styles pour le bouton de collapse */
.collapse-toggle {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  color: var(--text-muted);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.collapse-toggle:hover {
  background: var(--surface-pressed);
  border-color: var(--border-hover);
  color: var(--text);
}

.collapse-toggle svg {
  transition: transform var(--transition-fast);
}

.collapse-toggle.rotated svg {
  transform: rotate(-180deg);
}

.variant-header {
  /* Plus de border-bottom pour unifier les blocs */
  margin-bottom: var(--space-sm);
}

/* Préparation pour le système réduisible */
.component-variant-block {
  transition: all var(--transition-normal);
}

.component-variant-block.collapsed {
  display: none;
}

.component-variant-block.expanded {
  display: flex;
}

/* Styles pour la structure groupée */
.component-group-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-xl);
  overflow: hidden;
  transition: max-height var(--transition-normal) ease-out, opacity var(--transition-fast) ease-out;
  max-height: 2000px; /* Valeur assez haute pour le contenu normal */
  opacity: 1;
}

.component-group-container.collapsed {
  max-height: 0;
  opacity: 0;
  margin: 0;
  padding: 0;
}

.component-main-section {
  padding: var(--space-lg);
  background: var(--surface-hover);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.component-variants-section {
  padding: var(--space-lg);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .theme-demo {
    padding: var(--space-md);
  }

  .theme-demo-section {
    padding: var(--space-md);
  }
}
</style>
