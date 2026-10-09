import { defineStore, acceptHMRUpdate } from 'pinia'
import { authRepository } from '@/services/auth/auth.repository'
import { getStoredUser } from '@/utils/StoredUser'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: getStoredUser(),
    email: '',
    password: '',
    loading: false,
    errorMessage: '',
  }),

  getters: {
    isLoggedIn: (state) => Boolean(state.token && state.user),
    currentUser: (state) => state.user,
    userRole: (state) => state.user?.role || '',
    userName: (state) => state.user?.name || '',
    hasPermission: (state) => (permission) => {
      return Boolean(state.user?.permissions?.includes(permission))
    },
  },

  actions: {
    async handleLogin() {
      this.loading = true
      this.errorMessage = ''

      try {
        const result = await authRepository.login({
          identifier: this.email,
          password: this.password,
        })

        this.token = result.token
        this.user = result.user

        localStorage.setItem('token', this.token)
        localStorage.setItem('user', JSON.stringify(this.user))

        this.password = ''
        return result
      } catch (error) {
        this.errorMessage = error.message || 'Error al iniciar sesión'
        throw error
      } finally {
        this.loading = false
      }
    },
    async comprobateLogin() {
      if (!this.token) {
        this.handleLogout()
        return false
      }

      this.loading = true
      try {
        const { user } = await authRepository.verifySession(this.token)
        this.user = user
        localStorage.setItem('user', JSON.stringify(user))
        return true
      } catch (error) {
        console.warn('Sesión no válida o expirada:', error.message)
        await this.handleLogout()
        return false
      } finally {
        this.loading = false
      }
    },

    async handleLogout() {
      this.loading = true
      try {
        if (this.token) {
          await authRepository.logout(this.token)
        }
      } finally {
        this.token = ''
        this.user = null
        this.errorMessage = ''
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.loading = false
      }
    },

    clearError() {
      this.errorMessage = ''
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
