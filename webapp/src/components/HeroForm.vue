<script setup lang="ts">
import { ref } from 'vue'
import type { CreateHeroRequest } from '@/types/api'
import type { HeroRole } from '@/types/utils'

const emit = defineEmits<{
  (e: 'submit', hero: CreateHeroRequest): void
  (e: 'cancel'): void
}>()

const roles: HeroRole[] = ['Tank', 'Damage', 'Support']

const hero = ref<CreateHeroRequest>({
  name: '',
  role: 'Tank',
  description: '',
  imageUrl: ''
})

const errors = ref<Partial<Record<keyof CreateHeroRequest, string>>>({})

function validate(): boolean {
  errors.value = {}
  let isValid = true

  if (!hero.value.name.trim()) {
    errors.value.name = 'Le nom est requis'
    isValid = false
  }

  if (!hero.value.role) {
    errors.value.role = 'Le rôle est requis'
    isValid = false
  }

  if (!hero.value.description.trim()) {
    errors.value.description = 'La description est requise'
    isValid = false
  }

  return isValid
}

function handleSubmit() {
  if (validate()) {
    emit('submit', hero.value)
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="space-y-6">
    <div>
      <label for="name" class="block text-sm font-medium text-gray-700">Nom</label>
      <input
        id="name"
        v-model="hero.name"
        type="text"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': errors.name }"
      />
      <p v-if="errors.name" class="mt-1 text-sm text-red-600">{{ errors.name }}</p>
    </div>

    <div>
      <label for="role" class="block text-sm font-medium text-gray-700">Rôle</label>
      <select
        id="role"
        v-model="hero.role"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': errors.role }"
      >
        <option v-for="role in roles" :key="role" :value="role">
          {{ role }}
        </option>
      </select>
      <p v-if="errors.role" class="mt-1 text-sm text-red-600">{{ errors.role }}</p>
    </div>

    <div>
      <label for="description" class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        id="description"
        v-model="hero.description"
        rows="4"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        :class="{ 'border-red-500': errors.description }"
      ></textarea>
      <p v-if="errors.description" class="mt-1 text-sm text-red-600">{{ errors.description }}</p>
    </div>

    <div>
      <label for="imageUrl" class="block text-sm font-medium text-gray-700">URL de l'image</label>
      <input
        id="imageUrl"
        v-model="hero.imageUrl"
        type="url"
        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
      />
    </div>

    <div class="flex justify-end space-x-4">
      <button
        type="button"
        class="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        @click="emit('cancel')"
      >
        Annuler
      </button>
      <button
        type="submit"
        class="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Créer
      </button>
    </div>
  </form>
</template>
