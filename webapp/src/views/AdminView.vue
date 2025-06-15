<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'
import GameButton from '@/design-system/components/GameButton.vue' // 👈 Import du composant

const router = useRouter()
const store = useUserStore()

if (!store.isAdmin) {
  router.push('/')
}

const selectedSection = ref<string | null>(null)
const loading = ref<string | null>(null) // 👈 Ajout pour le loading (optionnel)

// 👈 Fonction mise à jour pour gérer le loading (optionnel)
async function handleClick(section: string) {
  loading.value = section

  // Simulation d'un petit délai (optionnel, pour voir l'effet loading)
  await new Promise(resolve => setTimeout(resolve, 300))

  selectedSection.value = section
  loading.value = null
}
</script>

<template>
  <div class="flex-1 flex flex-col bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 rounded-lg p-8">
    <!-- Titre avec style amélioré -->
    <h1 class="text-4xl font-bold text-white mb-8 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
      🎮 Administration
    </h1>

    <!-- Remplacez vos boutons par GameButton -->
    <div class="flex flex-wrap gap-4 mb-8">
      <GameButton
        v-for="section in ['Héros', 'Pouvoir', 'Objet']"
        :key="section"
        :text="section"
        :loading="loading === section"
        @click="handleClick(section)"
      />
    </div>

    <!-- Section sélectionnée -->
    <div v-if="selectedSection" class="w-full">
      <div class="bg-black/20 backdrop-blur-sm border border-white/10 rounded-lg p-6">
        <h2 class="text-2xl font-semibold mb-4 text-white">
          🛠️ Gestion de {{ selectedSection }}
        </h2>
        <p class="text-gray-300">
          Interface de gestion pour {{ selectedSection }} sera développée ici
        </p>

        <!-- Bouton pour revenir (optionnel) -->
        <div class="mt-4">
          <GameButton
            text="🔙 Retour"
            variant="secondary"
            size="sm"
            @click="selectedSection = null"
          />
        </div>
      </div>
    </div>
  </div>
</template>