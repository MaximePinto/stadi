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
      v-for="group in componentVariants"
      :key="group.title"
      class="theme-demo-section"
    >
      <!-- En-tête du groupe -->
      <div class="section-header mb-4">
        <div class="flex items-center gap-2 mb-2">
          <h2 class="text-xl font-semibold text-text-primary">
            {{ group.title }}
          </h2>
          <span class="category-badge">{{ group.category }}</span>
        </div>
        <p v-if="group.description" class="text-text-secondary mb-2">
          {{ group.description }}
        </p>
        <div v-if="group.tags" class="flex flex-wrap gap-1 mb-2">
          <span v-for="tag in group.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- Structure groupée : Principal + Variantes -->
      <div class="component-group-container">
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
import { computed } from 'vue'
import { useDesignSystem } from '@/design-system'
import { themeDemoConfig } from './config/theme-demo-config'

// Utilisation du système de design
const { effectiveMode } = useDesignSystem()

// État local
const currentMode = computed(() => effectiveMode.value)

// Configuration des variantes de composants (externalisée)
const componentVariants = themeDemoConfig
console.log(componentVariants)
</script>

<style scoped>
.theme-demo {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--ds-spacing-xl);
}

.theme-demo-header {
  text-align: center;
  margin-bottom: var(--ds-spacing-2xl);
}

.theme-demo-section {
  margin-bottom: var(--ds-spacing-2xl);
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-soft);
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-lg);
}

.theme-variant-card {
  background: var(--ds-bg-base);
  border: 2px solid var(--ds-border-base);
  border-radius: var(--ds-radius-lg);
  transition: all var(--ds-transition-normal);
  overflow: hidden;
  box-shadow: var(--ds-shadow-sm);
}

.theme-variant-card:hover {
  border-color: var(--ds-border-hover);
  box-shadow: var(--ds-shadow-lg);
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
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-soft);
  border-bottom: 1px solid var(--ds-border-base);
}

/* Bloc Variante : Composant rendu */
.component-variant-block {
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-base);
  min-height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.theme-test-zone {
  background: var(--ds-bg-base);
  border-radius: var(--ds-radius-md);
  padding: var(--ds-spacing-lg);
}

.theme-test-card {
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-soft);
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-md);
}

/* Nouveaux styles pour les metadata */
.category-badge {
  background: var(--ds-color-primary);
  color: white;
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--ds-radius-sm);
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.experimental-badge {
  background: var(--ds-color-warning);
  color: var(--ds-text-primary);
  font-size: 0.75rem;
  padding: 0.25rem 0.5rem;
  border-radius: var(--ds-radius-sm);
  font-weight: 500;
}

.complexity-badge {
  background: var(--ds-bg-mute);
  color: var(--ds-text-secondary);
  font-size: 0.7rem;
  padding: 0.2rem 0.4rem;
  border-radius: var(--ds-radius-sm);
  font-weight: 500;
  text-transform: capitalize;
}

.tag {
  background: var(--ds-bg-mute);
  color: var(--ds-text-secondary);
  font-size: 0.75rem;
  padding: 0.2rem 0.4rem;
  border-radius: var(--ds-radius-sm);
  font-weight: 400;
}

.tag-small {
  font-size: 0.65rem;
  padding: 0.15rem 0.3rem;
}

.section-header {
  border-bottom: 1px solid var(--ds-border-base);
  padding-bottom: var(--ds-spacing-sm);
}

.variant-header {
  /* Plus de border-bottom pour unifier les blocs */
  margin-bottom: var(--ds-spacing-sm);
}

/* Préparation pour le système réduisible */
.component-variant-block {
  transition: all var(--ds-transition-normal);
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
  gap: var(--ds-spacing-xl);
}

.component-main-section {
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-soft);
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-lg);
}

.component-variants-section {
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-base);
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-lg);
}

/* Responsive */
@media (max-width: 768px) {
  .theme-demo {
    padding: var(--ds-spacing-md);
  }

  .theme-demo-section {
    padding: var(--ds-spacing-md);
  }

}
</style>
