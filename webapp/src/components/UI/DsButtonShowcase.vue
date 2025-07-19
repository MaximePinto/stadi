<script setup lang="ts">
import { computed } from 'vue'
import DsButton from './DsButton.vue'
import DsThemeSelector from './DsThemeSelector.vue'
import { useDesignSystem } from '@/composables/useDesignSystem'
import { useButtonColors } from '@/composables/useButtonColors'

const { themePreset, effectiveMode } = useDesignSystem()
const { buttonColors } = useButtonColors()

const buttonVariants = ['primary', 'secondary', 'success', 'warning', 'error'] as const
const buttonSizes = ['tiny', 'small', 'medium', 'large'] as const

const showcaseConfig = computed(() => ({
  preset: themePreset.value,
  mode: effectiveMode.value,
  colors: buttonColors.value
}))
</script>

<template>
  <div class="p-lg space-y-xl">
    <!-- Header avec sélecteur de thème -->
    <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md">
      <div>
        <h1 class="text-2xl font-bold text-text-primary mb-sm">
          🎨 Showcase des Boutons Modernes
        </h1>
        <p class="text-text-secondary">
          Boutons adaptatifs qui changent selon le preset : <strong>{{ showcaseConfig.preset }}</strong>
        </p>
      </div>
      
      <div class="flex items-center gap-md">
        <DsThemeSelector 
          :compact="true" 
          :gaming="true"
          class="bg-bg-soft rounded-lg p-sm"
        />
      </div>
    </div>

    <!-- Démonstration par variantes -->
    <div class="grid gap-lg">
      <div 
        v-for="variant in buttonVariants"
        :key="variant"
        class="card p-lg"
      >
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-md mb-lg">
          <div>
            <h3 class="text-lg font-semibold text-text-primary capitalize mb-xs">
              {{ variant }}
            </h3>
            <div class="text-sm text-text-secondary space-y-xs">
              <div>Base: <code class="bg-bg-mute px-xs rounded text-xs">{{ showcaseConfig.colors[variant].base }}</code></div>
              <div>Hover: <code class="bg-bg-mute px-xs rounded text-xs">{{ showcaseConfig.colors[variant].hover }}</code></div>
            </div>
          </div>
          
          <!-- Gradient preview -->
          <div 
            class="w-20 h-8 rounded-md"
            :style="{ background: showcaseConfig.colors[variant].gradient }"
          />
        </div>

        <!-- Boutons par taille -->
        <div class="grid grid-cols-2 lg:grid-cols-4 gap-md">
          <div 
            v-for="size in buttonSizes"
            :key="size"
            class="flex flex-col items-center gap-sm"
          >
            <span class="text-sm text-text-secondary capitalize">{{ size }}</span>
            <DsButton
              :variant="variant"
              :size="size"
              :text="`${variant} ${size}`"
              :gaming="true"
              @click="() => console.log(`Clicked ${variant} ${size}`)"
            />
          </div>
        </div>

        <!-- États du bouton -->
        <div class="mt-lg pt-lg border-t border-border-base">
          <h4 class="text-sm font-medium text-text-primary mb-md">États</h4>
          <div class="flex flex-wrap gap-md">
            <DsButton
              :variant="variant"
              text="Normal"
              size="medium"
              :gaming="true"
            />
            <DsButton
              :variant="variant"
              text="Ghost"
              size="medium"
              :ghost="true"
              :gaming="true"
            />
            <DsButton
              :variant="variant"
              text="Loading"
              size="medium"
              :loading="true"
              :gaming="true"
            />
            <DsButton
              :variant="variant"
              text="Disabled"
              size="medium"
              :disabled="true"
              :gaming="true"
            />
          </div>
        </div>
      </div>
    </div>

    <!-- Infos techniques -->
    <div class="card p-lg bg-bg-mute">
      <h3 class="text-lg font-semibold text-text-primary mb-md">
        ⚙️ Configuration Technique
      </h3>
      
      <div class="grid md:grid-cols-2 gap-lg">
        <div>
          <h4 class="font-medium text-text-primary mb-sm">Preset Actuel</h4>
          <div class="text-sm text-text-secondary space-y-xs">
            <div><strong>Nom:</strong> {{ showcaseConfig.preset }}</div>
            <div><strong>Mode:</strong> {{ showcaseConfig.mode }}</div>
          </div>
        </div>
        
        <div>
          <h4 class="font-medium text-text-primary mb-sm">Fonctionnalités</h4>
          <ul class="text-sm text-text-secondary space-y-xs">
            <li>✅ Couleurs adaptatives par preset</li>
            <li>✅ Gradients générés automatiquement</li>
            <li>✅ Effets gaming responsive</li>
            <li>✅ Support dark/light mode</li>
            <li>✅ États interactifs (hover/press)</li>
          </ul>
        </div>
      </div>
    </div>

    <!-- Instructions d'usage -->
    <div class="card p-lg bg-info/10 border-info">
      <h3 class="text-lg font-semibold text-text-primary mb-md">
        📋 Comment utiliser
      </h3>
      
      <div class="text-sm text-text-secondary space-y-md">
        <div>
          <strong>1. Changez de preset</strong> avec le sélecteur en haut à droite pour voir les boutons s'adapter automatiquement.
        </div>
        
        <div>
          <strong>2. Basculez entre mode clair/sombre</strong> pour voir les variations de couleurs.
        </div>
        
        <div>
          <strong>3. Les boutons gardent leur rôle sémantique</strong> (success = vert, error = rouge, etc.) mais s'adaptent à la palette du preset.
        </div>
        
        <div>
          <strong>4. Code d'exemple :</strong>
          <pre class="bg-bg-base p-sm rounded mt-sm text-xs"><code>&lt;DsButton
  variant="primary"
  text="Mon bouton"
  size="medium"
  :gaming="true"
/&gt;</code></pre>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
code {
  font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
}

pre {
  overflow-x: auto;
}

.card {
  transition: all var(--ds-transition-normal);
}

.card:hover {
  transform: translateY(-2px);
}
</style>