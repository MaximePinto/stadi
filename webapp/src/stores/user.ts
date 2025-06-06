import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  id: number
  email: string
  roles: string[]
}

export const useUserStore = defineStore('user', () => {
  const user = ref<UserInfo | null>(null)

  const isLogged = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN'))

  async function fetchMe() {
    const res = await fetch('/api/me', {
      credentials: 'include'
    })
    if (res.ok) {
      user.value = await res.json()
    } else {
      user.value = null
    }
  }

  async function login(email: string, password: string) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      return false
    }
    await fetchMe()
    return true
  }

  async function logout() {
    const res = await fetch('/api/logout', {
      method: 'POST',
      credentials: 'include'
    })
    if (res.ok) {
      user.value = null
    }
  }

  // Vérifier l'état de connexion au démarrage
  fetchMe()

  return { user, isLogged, isAdmin, login, logout, fetchMe }
})
