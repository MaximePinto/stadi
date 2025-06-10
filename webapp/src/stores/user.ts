import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/entities'
import { api } from '@/services/api'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)

  const isLogged = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN'))

  async function fetchMe() {
    try {
      user.value = await api.get<User>('/api/me')
      console.log(user.value)
    } catch {
      user.value = null
    }
  }

  async function login(email: string, password: string) {
    try {
      await api.post('/api/login_check', { email, password })
      await fetchMe()
      return true
    } catch {
      return false
    }
  }

  async function logout() {
    try {
      await api.post('/api/logout')
      user.value = null
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    }
  }

  // Vérifier l'état de connexion au démarrage
  fetchMe()

  return { user, isLogged, isAdmin, login, logout, fetchMe }
})
