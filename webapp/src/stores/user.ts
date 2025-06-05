import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface UserInfo {
  id: number
  email: string
  roles: string[]
}

export const useUserStore = defineStore('user', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<UserInfo | null>(null)

  const isLogged = computed(() => !!token.value)
  const isAdmin = computed(() => user.value?.roles.includes('ROLE_ADMIN'))

  async function fetchMe() {
    if (!token.value) return
    const res = await fetch('/api/me', {
      headers: { Authorization: `Bearer ${token.value}` },
    })
    if (res.ok) {
      user.value = await res.json()
    }
  }

  async function login(email: string, password: string) {
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    if (!res.ok) {
      return false
    }
    const data = await res.json()
    token.value = data.token
    localStorage.setItem('token', token.value!)
    await fetchMe()
    return true
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  if (token.value) {
    fetchMe()
  }

  return { token, user, isLogged, isAdmin, login, logout, fetchMe }
})
