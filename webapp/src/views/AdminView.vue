<script setup lang="ts">
import { ref, watch } from 'vue'
import { useUserStore } from '../stores/user'
import { useRouter } from 'vue-router'

const router = useRouter()
const store = useUserStore()
if (!store.isAdmin) {
  router.push('/')
}

const entities = ['heroes', 'abilities', 'upgrades', 'builds', 'build-upgrades', 'users']
const current = ref('heroes')
const list = ref<Record<string, unknown>[]>([])
const newItem = ref<Record<string, unknown>>({})

watch(current, () => fetchList())
fetchList()

async function fetchList() {
  const res = await fetch(`/api/${current.value}`, {
    headers: { Authorization: `Bearer ${store.token}` },
  })
  if (res.ok) {
    list.value = await res.json()
  } else {
    list.value = []
  }
  newItem.value = {}
}

async function createItem() {
  const res = await fetch(`/api/${current.value}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${store.token}`,
    },
    body: JSON.stringify(newItem.value),
  })
  if (res.ok) {
    await fetchList()
  } else {
    alert('Erreur lors de la création')
  }
}

async function deleteItem(id: number) {
  const res = await fetch(`/api/${current.value}/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${store.token}` },
  })
  if (res.ok) {
    await fetchList()
  }
}
</script>

<template>
  <div class="space-y-6">
    <h1 class="text-3xl font-bold">Administration</h1>
    <div class="flex items-center space-x-2">
      <label class="font-medium">Entité :</label>
      <select
        v-model="current"
        class="border border-gray-300 rounded p-2 bg-white shadow-sm"
      >
        <option v-for="e in entities" :key="e" :value="e">{{ e }}</option>
      </select>
    </div>
    <div class="grid md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-lg font-semibold mb-2">Liste</h2>
        <div class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200 text-sm">
            <thead class="bg-gray-50">
              <tr>
                <th
                  v-for="(val, key) in list[0] || {}"
                  :key="key"
                  class="px-3 py-2 text-left font-medium text-gray-500 uppercase tracking-wider border"
                >
                  {{ key }}
                </th>
                <th class="px-3 py-2 text-left font-medium text-gray-500 uppercase border">Actions</th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-for="item in list" :key="item.id">
                <td v-for="(val, key) in item" :key="key" class="px-3 py-2 whitespace-nowrap border">{{ val }}</td>
                <td class="px-3 py-2 whitespace-nowrap border">
                  <button class="text-red-600 hover:underline" @click="deleteItem(item.id)">
                    Supprimer
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h2 class="text-lg font-semibold mb-2">Ajouter</h2>
        <form @submit.prevent="createItem" class="space-y-4">
          <textarea
            v-model="newItem"
            placeholder='{ "name": "..." }'
            class="w-full border p-3 rounded"
            rows="6"
          ></textarea>
          <button
            type="submit"
            class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
