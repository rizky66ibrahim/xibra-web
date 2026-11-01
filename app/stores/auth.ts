import { defineStore } from 'pinia'

export interface AuthUser {
  id: number
  name: string
  username: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const user = ref<AuthUser | null>(null)
  const checked = ref(false)

  async function fetchMe() {
    try {
      const res = await $fetch<{ data: AuthUser }>('/api/auth/me')
      user.value = res.data
    } catch {
      user.value = null
    } finally {
      checked.value = true
    }
  }

  async function login(identifier: string, password: string) {
    const res = await $fetch<{ data: { user: AuthUser } }>('/api/auth/login', {
      method: 'POST',
      body: { identifier, password }
    })
    user.value = res.data.user
    checked.value = true
  }

  async function logout() {
    await $fetch('/api/auth/logout', { method: 'POST' }).catch(() => {})
    user.value = null
    checked.value = true
  }

  return { user, checked, fetchMe, login, logout }
})
