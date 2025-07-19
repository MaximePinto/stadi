<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import { DsButton, useDesignSystem } from '@/design-system'
// Import des icônes pour les boutons
import {
  PersonOutline,
  FlashOutline,
  DiamondOutline,
  ArrowBackOutline,
  SettingsOutline,
  RefreshOutline
} from '@vicons/ionicons5'

const router = useRouter()
const store = useUserStore()

// Utilisation du système de design unifié
const { setThemePreset, themePreset, availablePresets } = useDesignSystem()

if (!store.isAdmin) {
  router.push('/')
}

const selectedSection = ref<string | null>(null)
const loading = ref<string | null>(null)

// Configuration des sections avec icônes
const sections = [
  { name: 'Héros', icon: PersonOutline, variant: 'primary' as const },
  { name: 'Pouvoir', icon: FlashOutline, variant: 'warning' as const },
  { name: 'Objet', icon: DiamondOutline, variant: 'success' as const }
]

async function handleClick(section: string) {
  loading.value = section

  // Simulation d'une action asynchrone
  await new Promise(resolve => setTimeout(resolve, 800))

  selectedSection.value = section
  loading.value = null
}

// Fonction pour changer de thème (démo)
function switchTheme() {
  const currentIndex = availablePresets.value.indexOf(themePreset.value)
  const nextIndex = (currentIndex + 1) % availablePresets.value.length
  setThemePreset(availablePresets.value[nextIndex])
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-ds-base text-ds-primary min-h-screen p-8 transition-ds">
    <!-- Header avec contrôles de thème -->
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        🎮 Administration Gaming
      </h1>

      <!-- Contrôles de thème -->
      <div class="flex items-center gap-4">
        <span class="text-ds-secondary text-sm">Thème: {{ themePreset }}</span>
        <DsButton
          text="Changer thème"
          variant="secondary"
          size="small"
          :icon="SettingsOutline"
          @click="switchTheme"
          :gaming="false"
        />
      </div>
    </div>

    <!-- Section principale avec effets gaming -->
    <div class="card bg-ds-soft border border-ds-base rounded-lg p-8 mb-8">
      <h2 class="text-2xl font-semibold mb-6 text-ds-primary">
        🛠️ Modules de gestion
      </h2>

      <!-- Boutons de sections avec le nouveau DsButton -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <DsButton
          v-for="section in sections"
          :key="section.name"
          :text="section.name"
          :variant="section.variant"
          :icon="section.icon"
          size="large"
          :loading="loading === section.name"
          :gaming="true"
          @click="handleClick(section.name)"
          class="h-16"
        />
      </div>

      <!-- Boutons d'actions supplémentaires -->
      <div class="flex flex-wrap gap-4">
        <DsButton
          text="Rafraîchir données"
          variant="secondary"
          :icon="RefreshOutline"
          size="medium"
          :ghost="true"
          @click="() => {}"
        />

        <DsButton
          text="Configuration"
          variant="primary"
          :icon="SettingsOutline"
          size="medium"
          :gaming="false"
          @click="() => {}"
        />
      </div>
    </div>

    <!-- Section sélectionnée avec effets améliorés -->
    <div v-if="selectedSection" class="card bg-ds-soft border border-ds-base rounded-lg p-6 transition-ds">
      <div class="flex items-center justify-between mb-6">
        <h2 class="text-2xl font-semibold text-ds-primary flex items-center gap-3">
          <component
            :is="sections.find(s => s.name === selectedSection)?.icon"
            class="w-8 h-8"
          />
          Gestion de {{ selectedSection }}
        </h2>

        <!-- Bouton retour stylisé -->
        <DsButton
          text="Retour"
          variant="secondary"
          size="small"
          :icon="ArrowBackOutline"
          @click="selectedSection = null"
          :gaming="true"
        />
      </div>

      <!-- Contenu de la section -->
      <div class="bg-ds-mute rounded-lg p-6 mb-6">
        <p class="text-ds-secondary mb-4">
          Interface de gestion pour <strong class="text-ds-primary">{{ selectedSection }}</strong> sera développée ici.
        </p>

        <!-- Actions spécifiques selon la section -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <DsButton
            :text="`Créer ${selectedSection}`"
            variant="success"
            size="medium"
            @click="() => {}"
          />

          <DsButton
            :text="`Modifier ${selectedSection}`"
            variant="warning"
            size="medium"
            @click="() => {}"
          />

          <DsButton
            :text="`Supprimer ${selectedSection}`"
            variant="error"
            size="medium"
            @click="() => {}"
          />
        </div>
      </div>

      <!-- Stats fictives -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-ds-base rounded-lg p-4 border border-ds-base">
          <h3 class="text-sm font-medium text-ds-secondary">Total</h3>
          <p class="text-2xl font-bold text-primary">{{ Math.floor(Math.random() * 100) }}</p>
        </div>

        <div class="bg-ds-base rounded-lg p-4 border border-ds-base">
          <h3 class="text-sm font-medium text-ds-secondary">Actifs</h3>
          <p class="text-2xl font-bold text-success">{{ Math.floor(Math.random() * 50) }}</p>
        </div>

        <div class="bg-ds-base rounded-lg p-4 border border-ds-base">
          <h3 class="text-sm font-medium text-ds-secondary">En attente</h3>
          <p class="text-2xl font-bold text-warning">{{ Math.floor(Math.random() * 20) }}</p>
        </div>
      </div>
    </div>

    <!-- Section de démo des variants -->
    <div class="card bg-ds-soft border border-ds-base rounded-lg p-6 mt-8">
      <h3 class="text-xl font-semibold mb-4 text-ds-primary">
        🎨 Démonstration des variants
      </h3>

      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <DsButton
          text="Primary"
          variant="primary"
          size="medium"
          @click="() => {}"
        />

        <DsButton
          text="Secondary"
          variant="secondary"
          size="medium"
          @click="() => {}"
        />

        <DsButton
          text="Success"
          variant="success"
          size="medium"
          @click="() => {}"
        />

        <DsButton
          text="Warning"
          variant="warning"
          size="medium"
          @click="() => {}"
        />

        <DsButton
          text="Error"
          variant="error"
          size="medium"
          @click="() => {}"
        />
      </div>

      <!-- Boutons ghost -->
      <div class="mt-4 flex flex-wrap gap-4">
        <DsButton
          text="Ghost Primary"
          variant="primary"
          :ghost="true"
          size="small"
          @click="() => {}"
        />

        <DsButton
          text="Sans gaming"
          variant="primary"
          :gaming="false"
          size="small"
          @click="() => {}"
        />

        <DsButton
          text="Disabled"
          variant="primary"
          :disabled="true"
          size="small"
          @click="() => {}"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles spécifiques à la page admin */
.admin-grid {
  display: grid;
  gap: 1.5rem;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

/* Animation d'entrée pour les sections */
.section-enter-active {
  transition: all 0.3s ease-out;
}

.section-enter-from {
  opacity: 0;
  transform: translateY(20px);
}

/* Effet hover sur les cards */
.card:hover {
  transform: translateY(-2px);
  box-shadow: var(--ds-shadow-lg);
}
</style>
