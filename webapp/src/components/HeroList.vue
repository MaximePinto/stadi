<script setup lang="ts">
import { ref, onMounted } from 'vue'
import type { Hero, HeroResponse } from '@/types/entities'
import type { HeroFilters, PaginatedResponse } from '@/types/api'
import type { LoadingStatus, HeroRole } from '@/types/utils'
import { heroService } from '@/services/heroService'

// État local
const heroes = ref<Hero[]>([])
const loading = ref<LoadingStatus>('idle')
const error = ref<string | null>(null)
const filters = ref<HeroFilters>({
  page: 1,
  limit: 10,
  role: undefined,
  search: ''
})

// Rôles disponibles pour le filtre
const roles: HeroRole[] = ['Tank', 'Damage', 'Support']

// Chargement des héros
async function fetchHeroes() {
  loading.value = 'loading'
  try {
    const data = await heroService.list(filters.value)
    heroes.value = data.data
    loading.value = 'success'
  } catch (e) {
    error.value = e instanceof Error ? e.message : 'Une erreur est survenue'
    loading.value = 'error'
  }
}

// Gestion des filtres
function updateFilters(newFilters: Partial<HeroFilters>) {
  filters.value = { ...filters.value, ...newFilters }
  fetchHeroes()
}

// Chargement initial
onMounted(fetchHeroes)
</script>

<template>
  <div class="space-y-6">
    <!-- Filtres -->
    <div class="flex flex-wrap gap-4 items-center">
      <div class="flex-1">
        <input
          v-model="filters.search"
          type="text"
          placeholder="Rechercher un héros..."
          class="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
          @input="updateFilters({ search: filters.search })"
        />
      </div>
      <select
        v-model="filters.role"
        class="px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
        @change="updateFilters({ role: filters.role })"
      >
        <option value="">Tous les rôles</option>
        <option v-for="role in roles" :key="role" :value="role">
          {{ role }}
        </option>
      </select>
    </div>

    <!-- État de chargement -->
    <div v-if="loading === 'loading'" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
    </div>

    <!-- Message d'erreur -->
    <div v-else-if="loading === 'error'" class="text-center py-8 text-red-500">
      {{ error }}
    </div>

    <!-- Liste des héros -->
    <div v-else class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div
        v-for="hero in heroes"
        :key="hero.id"
        class="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
      >
        <div class="relative h-48">
          <img
            :src="hero.imageUrl || '/default-hero.jpg'"
            :alt="hero.name"
            class="w-full h-full object-cover"
          />
          <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <h3 class="text-xl font-bold text-white">{{ hero.name }}</h3>
            <span class="text-sm text-white/80">{{ hero.role }}</span>
          </div>
        </div>
        <div class="p-4">
          <p class="text-gray-600 line-clamp-2">{{ hero.description }}</p>
          <div class="mt-4">
            <h4 class="font-semibold text-gray-800 mb-2">Capacités</h4>
            <div class="space-y-2">
              <div
                v-for="ability in hero.abilities"
                :key="ability.id"
                class="flex items-center gap-2 text-sm"
              >
                <img
                  v-if="ability.iconUrl"
                  :src="ability.iconUrl"
                  :alt="ability.name"
                  class="w-6 h-6 rounded"
                />
                <span class="text-gray-700">{{ ability.name }}</span>
                <span v-if="ability.cooldown" class="text-gray-500">
                  ({{ ability.cooldown }}s)
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
