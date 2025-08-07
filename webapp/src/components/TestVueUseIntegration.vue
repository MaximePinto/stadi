<script setup lang="ts">
import { useDesignSystem } from '@/composables/useDesignSystem'
import DsThemeSelector from '@/design-system/components/ThemeSelector/DsThemeSelector.vue'

// Test du composable
const designSystem = useDesignSystem()

// Log des informations pour debug
console.log('VueUse Integration Test:', {
  isDark: designSystem.isDark.value,
  preferredColorScheme: designSystem.preferredColorScheme.value,
  isReducedMotion: designSystem.isReducedMotion.value,
  deviceType: designSystem.deviceType.value,
  isMobile: designSystem.isMobile.value
})
</script>

<template>
  <div class="test-container">
    <h2>🧪 Test Intégration VueUse</h2>
    
    <div class="info-grid">
      <div class="info-card">
        <h3>Mode actuel</h3>
        <p>{{ designSystem.themeStore.mode }}</p>
      </div>
      
      <div class="info-card">
        <h3>Préférence système</h3>
        <p>{{ designSystem.preferredColorScheme.value }}</p>
      </div>
      
      <div class="info-card">
        <h3>Appareil</h3>
        <p>{{ designSystem.deviceType.value }}</p>
      </div>
      
      <div class="info-card">
        <h3>Animations réduites</h3>
        <p>{{ designSystem.isReducedMotion.value ? 'Oui' : 'Non' }}</p>
      </div>
    </div>

    <div class="theme-selector-tests">
      <h3>Sélecteur de thème avec différentes configurations</h3>
      
      <div class="selector-variant">
        <h4>Configuration automatique</h4>
        <DsThemeSelector 
          :auto-adaptive="true"
          :show-system-info="true"
        />
      </div>
      
      <div class="selector-variant">
        <h4>Configuration desktop complète</h4>
        <DsThemeSelector 
          :auto-adaptive="false"
          :show-color-picker="true"
          :show-system-info="true"
          size="large"
        />
      </div>
      
      <div class="selector-variant">
        <h4>Configuration mobile compacte</h4>
        <DsThemeSelector 
          :auto-adaptive="false"
          :compact="true"
          size="small"
          :gaming="false"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-container {
  padding: var(--space-lg);
  max-width: 1200px;
  margin: 0 auto;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: var(--space-md);
  margin: var(--space-lg) 0;
}

.info-card {
  padding: var(--space-md);
  background: var(--surface);
  border: 1px solid var(--border);
  border-radius: var(--radius-lg);
}

.info-card h3 {
  margin: 0 0 var(--space-sm) 0;
  color: var(--text);
  font-size: 0.875rem;
  font-weight: 600;
}

.info-card p {
  margin: 0;
  color: var(--text-muted);
  font-family: monospace;
}

.theme-selector-tests {
  margin-top: var(--space-xl);
}

.selector-variant {
  margin: var(--space-lg) 0;
  padding: var(--space-md);
  background: var(--bg-soft);
  border-radius: var(--radius-md);
}

.selector-variant h4 {
  margin: 0 0 var(--space-md) 0;
  color: var(--text);
}
</style>