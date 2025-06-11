import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/entities'
import { api } from '@/services/api'
import { useRouter } from 'vue-router'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const router = useRouter()
  const isInitialized = ref(false)  // ✅ Ajout du flag d'initialisation

  const isLogged = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN'))

  async function fetchMe() {
    try {
      user.value = await api.get<User>('/api/me')
    } catch {
      user.value = null
    } finally {
      isInitialized.value = true  // ✅ Toujours marquer comme initialisé
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
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      user.value = null
      router.push('/login')
    }
  }

  // ✅ Exposer la promesse d'initialisation
  const initPromise = fetchMe()

  return { user, isLogged, isAdmin, isInitialized, login, logout, fetchMe, initPromise }
})