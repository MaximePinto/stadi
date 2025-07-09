<template>
  <n-config-provider :theme="naiveTheme" :theme-overrides="naiveThemeOverrides">
    <div class="min-h-screen">
      <!-- Header simple -->
      <div class="p-6 border-b" style="border-color: var(--ds-border-base)">
        <div class="max-w-7xl mx-auto">
          <h1 class="text-4xl font-bold mb-4" style="color: var(--ds-text-primary)">
            🎨 Demo Naive UI
          </h1>
          <p class="text-lg" style="color: var(--ds-text-secondary)">
            Utilisation des composants Naive UI avec overrides de thème du design system
          </p>
        </div>
      </div>

      <!-- Contrôles de thème -->
      <div class="p-4 border-b" style="background: var(--ds-bg-mute); border-color: var(--ds-border-base)">
        <div class="max-w-7xl mx-auto">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium mb-2" style="color: var(--ds-text-secondary)">Thème :</p>
              <div class="flex gap-2">
                <n-button
                  v-for="preset in availablePresets"
                  :key="preset"
                  :type="themePreset === preset ? 'primary' : 'default'"
                  @click="setThemePreset(preset)"
                  size="small"
                >
                  {{ themePresets[preset].name }}
                </n-button>
              </div>
            </div>

            <div>
              <p class="text-sm font-medium mb-2" style="color: var(--ds-text-secondary)">Mode :</p>
              <n-button @click="toggleTheme" size="small">
                {{ effectiveMode === 'dark' ? '🌙 Sombre' : '☀️ Clair' }}
              </n-button>
            </div>
          </div>
        </div>
      </div>

      <!-- Contenu principal -->
      <div class="p-6" style="background: var(--ds-bg-base)">
        <div class="max-w-7xl mx-auto">
          <!-- Section Couleurs -->
          <n-card title="🎨 Palette de Couleurs" class="mb-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-6">
              <!-- Couleurs principales -->
              <div>
                <h3 class="font-semibold mb-3" style="color: var(--ds-text-primary)">Principales</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-primary)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Primary</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Couleur principale</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-primary-hover)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Primary Hover</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Au survol</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-primary-pressed)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Primary Pressed</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Au clic</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Couleurs secondaires -->
              <div>
                <h3 class="font-semibold mb-3" style="color: var(--ds-text-primary)">Secondaires</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-secondary)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Secondary</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Couleur secondaire</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-secondary-hover)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Secondary Hover</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Au survol</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Couleurs sémantiques -->
              <div>
                <h3 class="font-semibold mb-3" style="color: var(--ds-text-primary)">Sémantiques</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-success)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Success</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Succès</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-warning)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Warning</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Avertissement</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-color-error)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Error</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Erreur</p>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Arrière-plans -->
              <div>
                <h3 class="font-semibold mb-3" style="color: var(--ds-text-primary)">Arrière-plans</h3>
                <div class="space-y-3">
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-bg-base); border: 1px solid var(--ds-border-base)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Base</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Arrière-plan principal</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-bg-soft); border: 1px solid var(--ds-border-base)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Soft</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Arrière-plan doux</p>
                    </div>
                  </div>
                  <div class="flex items-center gap-3">
                    <div class="w-12 h-12 rounded-lg" style="background: var(--ds-bg-mute); border: 1px solid var(--ds-border-base)"></div>
                    <div>
                      <p class="font-medium" style="color: var(--ds-text-primary)">Mute</p>
                      <p class="text-sm" style="color: var(--ds-text-secondary)">Arrière-plan muet</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </n-card>

          <!-- Section Composants -->
          <n-card title="🧩 Composants" class="mb-6">
            <!-- Boutons -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4" style="color: var(--ds-text-primary)">Boutons</h3>
              <n-space>
                <n-button type="primary" size="medium" @click="showAlert('primary')">
                  Bouton Primary
                </n-button>
                <n-button type="default" size="medium" @click="showAlert('default')">
                  Bouton Default
                </n-button>
                <n-button type="success" size="medium" @click="showAlert('success')">
                  Bouton Success
                </n-button>
                <n-button type="warning" size="medium" @click="showAlert('warning')">
                  Bouton Warning
                </n-button>
                <n-button type="error" size="medium" @click="showAlert('error')">
                  Bouton Error
                </n-button>
              </n-space>
            </div>

            <!-- Alertes -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4" style="color: var(--ds-text-primary)">Alertes</h3>
              <div class="space-y-3">
                <n-alert type="success" title="Succès !">
                  L'opération s'est bien déroulée.
                </n-alert>
                <n-alert type="warning" title="Attention !">
                  Veuillez vérifier vos informations.
                </n-alert>
                <n-alert type="error" title="Erreur !">
                  Une erreur s'est produite.
                </n-alert>
                <n-alert type="info" title="Information">
                  Voici une information importante.
                </n-alert>
              </div>
            </div>

            <!-- Messages simples -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4" style="color: var(--ds-text-primary)">Messages</h3>
              <n-space>
                <n-button @click="showAlert('success')">
                  Message Succès
                </n-button>
                <n-button @click="showAlert('warning')">
                  Message Warning
                </n-button>
                <n-button @click="showAlert('error')">
                  Message Error
                </n-button>
                <n-button @click="showAlert('info')">
                  Message Info
                </n-button>
              </n-space>
            </div>

            <!-- Progress -->
            <div class="mb-8">
              <h3 class="text-lg font-semibold mb-4" style="color: var(--ds-text-primary)">Progress</h3>
              <div class="space-y-4">
                <n-progress type="line" :percentage="progressValue" />
                <n-progress type="circle" :percentage="progressValue" />
                <n-space>
                  <n-button size="small" @click="progressValue = Math.max(0, progressValue - 10)">
                    -10%
                  </n-button>
                  <n-button size="small" @click="progressValue = Math.min(100, progressValue + 10)">
                    +10%
                  </n-button>
                </n-space>
              </div>
            </div>
          </n-card>
        </div>
      </div>
    </div>
  </n-config-provider>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import {
  NConfigProvider,
  NButton,
  NCard,
  NSpace,
  NAlert,
  NProgress
} from 'naive-ui'
import { useDesignSystem } from '@/composables/useDesignSystem'
import { themePresets } from '@/design-system/tokens'

const {
  themePreset,
  effectiveMode,
  availablePresets,
  naiveTheme,
  naiveThemeOverrides,
  setThemePreset,
  toggleTheme
} = useDesignSystem()

// Progress
const progressValue = ref(50)

// Fonction simple pour afficher des alertes
const showAlert = (type: string) => {
  const messages = {
    success: 'Opération réussie !',
    warning: 'Attention, vérifiez vos données !',
    error: 'Une erreur s\'est produite !',
    info: 'Information importante !',
    primary: 'Bouton Primary cliqué !',
    default: 'Bouton Default cliqué !'
  }

  alert(`${type.toUpperCase()}: ${messages[type as keyof typeof messages]}`)
}
</script>
