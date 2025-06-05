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
const list = ref<any[]>([])
const newItem = ref<any>({})

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
  <div>
    <h1 class="text-2xl font-bold mb-4">Administration</h1>
    <div class="mb-4">
      <label>Entité : </label>
      <select v-model="current" class="border p-1 rounded">
        <option v-for="e in entities" :key="e" :value="e">{{ e }}</option>
      </select>
    </div>
    <div class="grid gap-4 md:grid-cols-2">
      <div>
        <h2 class="font-semibold mb-2">Liste</h2>
        <table class="min-w-full text-sm text-left">
          <thead>
            <tr>
              <th v-for="(val, key) in list[0] || {}" :key="key" class="border px-2">{{ key }}</th>
              <th class="border px-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in list" :key="item.id">
              <td v-for="(val, key) in item" :key="key" class="border px-2">{{ val }}</td>
              <td class="border px-2">
                <button class="text-red-600" @click="deleteItem(item.id)">Supprimer</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div>
        <h2 class="font-semibold mb-2">Ajouter</h2>
        <form @submit.prevent="createItem" class="space-y-2">
          <textarea v-model="newItem" placeholder='{ "name": "..." }' class="w-full border p-2 rounded" rows="6"></textarea>
          <button type="submit" class="bg-blue-600 text-white px-4 py-2 rounded">Enregistrer</button>
        </form>
      </div>
    </div>
  </div>
</template>
