<script setup lang="ts">
import HeroList from '@/components/HeroList.vue'
import HeroForm from '@/components/HeroForm.vue'
import { ref } from 'vue'
import type { CreateHeroRequest } from '@/types/api'
import { heroService } from '@/services/heroService'

const showForm = ref(false)

async function handleCreateHero(hero: CreateHeroRequest) {
  try {
    await heroService.create(hero)
    showForm.value = false
    // Recharger la liste des héros
    window.location.reload()
  } catch (error) {
    console.error('Erreur:', error)
    alert('Erreur lors de la création du héros')
  }
}
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="flex justify-between items-center mb-8">
      <h1 class="text-3xl font-bold text-gray-900">Héros</h1>
      <button
        v-if="!showForm"
        @click="showForm = true"
        class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        Ajouter un héros
      </button>
    </div>

    <div v-if="showForm" class="mb-8">
      <div class="bg-white rounded-lg shadow-lg p-6">
        <h2 class="text-xl font-semibold mb-4">Nouveau héros</h2>
        <HeroForm @submit="handleCreateHero" @cancel="showForm = false" />
      </div>
    </div>

    <HeroList />
  </div>
</template>
