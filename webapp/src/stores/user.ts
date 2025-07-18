import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '@/types/entities'
import { api } from '@/services/api'
import { useRouter } from 'vue-router'
import { useUiStore } from './ui'

export const useUserStore = defineStore('user', () => {
  const user = ref<User | null>(null)
  const router = useRouter()
  const uiStore = useUiStore()

  const isLogged = computed(() => !!user.value)
  const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN'))

  async function fetchMe() {
    try {
      user.value = await api.get<User>('/api/me')
    } catch {
      user.value = null
    }
  }

  async function login(email: string, password: string): Promise<boolean> {
    uiStore.showLoader('Connexion en cours...')
    let success = false;
    try {
      await api.post('/api/login_check', { email, password })
      await fetchMe()
      await router.push('/')
      success = true;
      return true
    } catch {
      return false
    } finally {
      await uiStore.hideLoader(success ? 500 : 0)
    }
  }

  async function logout() {
    uiStore.showLoader('Déconnexion...');
    if (!user.value) return

    try {
      await api.post('/api/logout')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      user.value = null
      await router.push('/login')
      await uiStore.hideLoader(500)
    }
  }

  async function logoutWithoutRedirect() {
    if (!user.value) return

    uiStore.showLoader('Déconnexion...')

    try {
      await api.post('/api/logout')
    } catch (error) {
      console.error('Erreur lors de la déconnexion:', error)
    } finally {
      user.value = null
      await uiStore.hideLoader(500)
    }
  }

  return {
    user,
    isLogged,
    isAdmin,
    login,
    logout,
    logoutWithoutRedirect,
    fetchMe
  }
})
