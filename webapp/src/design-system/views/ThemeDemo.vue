<template>
  <div class="theme-demo">
    <div class="theme-demo-header">
      <h1 class="text-3xl font-bold text-text-primary mb-4">
        🎨 Démonstration du Sélecteur de Thème
      </h1>
      <p class="text-text-secondary mb-8">
        Testez les différentes fonctionnalités du système de theming unifié
      </p>
    </div>

    <!-- Rendu dynamique des composants -->
    <div
      v-for="section in componentVariants"
      :key="section.title"
      class="theme-demo-section"
    >
      <div class="section-header mb-4">
        <div class="flex items-center gap-2 mb-2">
          <h2 class="text-xl font-semibold text-text-primary">
            {{ section.title }}
          </h2>
          <span class="category-badge">{{ section.category }}</span>
          <span v-if="section.experimental" class="experimental-badge">Expérimental</span>
        </div>
        <p v-if="section.description" class="text-text-secondary mb-2">
          {{ section.description }}
        </p>
        <div v-if="section.tags" class="flex flex-wrap gap-1 mb-2">
          <span v-for="tag in section.tags" :key="tag" class="tag">{{ tag }}</span>
        </div>
      </div>

      <!-- Affichage inline avec informations contextuelles -->
      <div v-if="section.layout === 'inline'" class="flex flex-wrap gap-4 items-center">
        <component
          :is="section.component"
          v-for="(variant, index) in section.variants"
          :key="`${section.title}-${index}`"
          v-bind="variant.props"
          v-on="variant.events || {}"
        />
        
        <div class="text-sm text-text-secondary">
          Mode actuel: <span class="font-medium">{{ currentMode }}</span>
        </div>
      </div>

      <!-- Grille de variantes -->
      <div v-else class="theme-variants-grid">
        <div
          v-for="(variant, index) in section.variants"
          :key="`${section.title}-${index}`"
          class="theme-variant-card"
        >
          <div class="variant-header mb-3">
            <div class="flex items-center gap-2 mb-1">
              <h3 class="text-lg font-medium text-text-primary">
                {{ variant.title }}
              </h3>
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
          <component
            :is="section.component"
            v-bind="variant.props"
            v-on="variant.events || {}"
          />
        </div>
      </div>
    </div>

    <!-- Zone de test des thèmes -->
    <div class="theme-demo-section">
      <h2 class="text-xl font-semibold text-text-primary mb-4">
        Zone de Test des Thèmes
      </h2>

      <div class="theme-test-zone">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Composants de test -->
          <div class="theme-test-card">
            <h3 class="text-lg font-medium mb-4">Composants Design System</h3>
            <div class="space-y-4">
              <DsButton text="Bouton Primaire" variant="primary" />
              <DsButton text="Bouton Secondaire" variant="secondary" />
              <DsButton text="Bouton Succès" variant="success" />
              <DsButton text="Bouton Warning" variant="warning" />
              <DsButton text="Bouton Erreur" variant="error" />
            </div>
          </div>

          <!-- Composants Naive UI -->
          <div class="theme-test-card">
            <h3 class="text-lg font-medium mb-4">Composants Naive UI</h3>
            <div class="space-y-4">
              <n-button type="primary">Bouton Primaire</n-button>
              <n-button type="default">Bouton Défaut</n-button>
              <n-button type="success">Bouton Succès</n-button>
              <n-button type="warning">Bouton Warning</n-button>
              <n-button type="error">Bouton Erreur</n-button>
            </div>
          </div>
        </div>

        <!-- Classes Tailwind -->
        <div class="theme-test-card mt-6">
          <h3 class="text-lg font-medium mb-4">Classes Tailwind</h3>
          <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div class="p-4 bg-bg-base border border-border-base rounded-radius-md">
              <p class="text-text-primary">bg-bg-base</p>
            </div>
            <div class="p-4 bg-bg-soft border border-border-base rounded-radius-md">
              <p class="text-text-primary">bg-bg-soft</p>
            </div>
            <div class="p-4 bg-bg-mute border border-border-base rounded-radius-md">
              <p class="text-text-primary">bg-bg-mute</p>
            </div>
            <div class="p-4 bg-primary text-white rounded-radius-md">
              <p>bg-primary</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Showcase des boutons modernes -->
    <div class="theme-demo-section">
      <h2 class="text-xl font-semibold text-text-primary mb-4">
        🎨 Showcase des Boutons Modernes
      </h2>
      <DsButtonShowcase />
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { DsButton, useDesignSystem } from '@/design-system'
import { DsButtonShowcase } from '@/components/UI'
import { themeDemoConfig } from './config/theme-demo-config'

// Utilisation du système de design
const { effectiveMode } = useDesignSystem()

// État local
const currentMode = computed(() => effectiveMode.value)

// Configuration des variantes de composants (externalisée)
const componentVariants = themeDemoConfig
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
  padding: var(--ds-spacing-lg);
  background: var(--ds-bg-base);
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-md);
  transition: all var(--ds-transition-normal);
}

.theme-variant-card:hover {
  border-color: var(--ds-border-hover);
  box-shadow: var(--ds-shadow-md);
}

.theme-variants-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
}

.theme-variant-card {
  flex: 0 0 auto; /* Taille naturelle du contenu */
  min-width: 300px; /* Minimum pour éviter que ce soit trop petit */
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
  border-bottom: 1px solid var(--ds-border-mute);
  padding-bottom: var(--ds-spacing-xs);
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
