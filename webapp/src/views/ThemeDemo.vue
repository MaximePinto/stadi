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

    <!-- Sélecteur de thème principal -->
    <div class="theme-demo-section">
      <h2 class="text-xl font-semibold text-text-primary mb-4">
        Sélecteur de Thème Principal
      </h2>
      <div class="flex flex-wrap gap-4 items-center">
        <DsThemeSelector
          @mode-change="handleModeChange"
          @preset-change="handlePresetChange"
          @theme-change="handleThemeChange"
        />

        <div class="text-sm text-text-secondary">
          Mode actuel: <span class="font-medium">{{ currentMode }}</span>
        </div>
      </div>
    </div>

    <!-- Variantes du sélecteur -->
    <div class="theme-demo-section">
      <h2 class="text-xl font-semibold text-text-primary mb-4">
        Variantes du Sélecteur
      </h2>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <!-- Sélecteur compact -->
        <div class="theme-variant-card">
          <h3 class="text-lg font-medium text-text-primary mb-2">Compact</h3>
          <DsThemeSelector
            :compact="true"
            :size="'small'"
            :show-advanced="false"
          />
        </div>

        <!-- Sélecteur large -->
        <div class="theme-variant-card">
          <h3 class="text-lg font-medium text-text-primary mb-2">Large</h3>
          <DsThemeSelector
            :size="'large'"
            :show-advanced="true"
          />
        </div>

        <!-- Sélecteur sans gaming -->
        <div class="theme-variant-card">
          <h3 class="text-lg font-medium text-text-primary mb-2">Sans Gaming</h3>
          <DsThemeSelector
            :gaming="false"
            :show-preset-selector="false"
          />
        </div>

        <!-- Sélecteur mode uniquement -->
        <div class="theme-variant-card">
          <h3 class="text-lg font-medium text-text-primary mb-2">Mode uniquement</h3>
          <DsThemeSelector
            :show-preset-selector="false"
            :show-advanced="false"
          />
        </div>

        <!-- Sélecteur preset uniquement -->
        <div class="theme-variant-card">
          <h3 class="text-lg font-medium text-text-primary mb-2">Preset uniquement</h3>
          <DsThemeSelector
            :show-mode-toggle="false"
            :show-advanced="false"
          />
        </div>

        <!-- Sélecteur complet -->
        <div class="theme-variant-card">
          <h3 class="text-lg font-medium text-text-primary mb-2">Complet</h3>
          <DsThemeSelector
            :show-advanced="true"
            :gaming="true"
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

    <!-- Logs des événements -->
    <div class="theme-demo-section">
      <h2 class="text-xl font-semibold text-text-primary mb-4">
        Logs des Événements
      </h2>

      <div class="theme-logs">
        <div class="flex justify-between items-center mb-4">
          <span class="text-text-secondary">Événements récents:</span>
          <n-button size="small" @click="clearLogs">Effacer</n-button>
        </div>

        <div class="logs-container">
          <div
            v-for="(log, index) in logs"
            :key="index"
            class="log-item"
          >
            <span class="log-time">{{ log.time }}</span>
            <span class="log-type">{{ log.type }}</span>
            <span class="log-message">{{ log.message }}</span>
          </div>

          <div v-if="logs.length === 0" class="text-text-secondary text-center py-8">
            Aucun événement pour le moment
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { NButton } from 'naive-ui'
import { DsButton, DsThemeSelector, DsButtonShowcase } from '@/components/UI'
import { useDesignSystem } from '@/composables/useDesignSystem'

// Utilisation du système de design
const { effectiveMode } = useDesignSystem()

// État local
const logs = ref<Array<{time: string, type: string, message: string}>>([])
const currentMode = computed(() => effectiveMode.value)

// Gestionnaires d'événements
const handleModeChange = (mode: string) => {
  addLog('MODE', `Mode changé vers: ${mode}`)
}

const handlePresetChange = (preset: string) => {
  addLog('PRESET', `Preset changé vers: ${preset}`)
}

// Type pour l'événement theme-change
type ThemeChangeEvent =
  | { mode: 'light' | 'dark' | 'auto'; type: 'mode' }
  | { preset: string; type: 'preset' }
  | { type: 'toggle' }

const handleThemeChange = (theme: ThemeChangeEvent) => {
  addLog('THEME', `Changement de thème: ${JSON.stringify(theme)}`)
}

const addLog = (type: string, message: string) => {
  const time = new Date().toLocaleTimeString()
  logs.value.unshift({ time, type, message })

  // Garder seulement les 10 derniers logs
  if (logs.value.length > 10) {
    logs.value = logs.value.slice(0, 10)
  }
}

const clearLogs = () => {
  logs.value = []
}
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

.theme-logs {
  background: var(--ds-bg-base);
  border-radius: var(--ds-radius-md);
  padding: var(--ds-spacing-lg);
}

.logs-container {
  max-height: 300px;
  overflow-y: auto;
  border: 1px solid var(--ds-border-base);
  border-radius: var(--ds-radius-sm);
  background: var(--ds-bg-mute);
}

.log-item {
  display: flex;
  gap: var(--ds-spacing-md);
  padding: var(--ds-spacing-sm) var(--ds-spacing-md);
  border-bottom: 1px solid var(--ds-border-base);
  font-family: monospace;
  font-size: 0.875rem;
}

.log-item:last-child {
  border-bottom: none;
}

.log-time {
  color: var(--ds-text-secondary);
  min-width: 80px;
}

.log-type {
  color: var(--ds-color-primary);
  font-weight: 600;
  min-width: 60px;
}

.log-message {
  color: var(--ds-text-primary);
  flex: 1;
}

/* Responsive */
@media (max-width: 768px) {
  .theme-demo {
    padding: var(--ds-spacing-md);
  }

  .theme-demo-section {
    padding: var(--ds-spacing-md);
  }

  .log-item {
    flex-direction: column;
    gap: var(--ds-spacing-xs);
  }

  .log-time,
  .log-type {
    min-width: auto;
  }
}
</style>
