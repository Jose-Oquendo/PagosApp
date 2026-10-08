import { defineStore, acceptHMRUpdate } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    user: {
      id: '',
      role: '',
    },
    email: '',
    password: '',
    loading: false,
  }),

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  actions: {
    async handleLogin() {
      this.loading = true
      try {
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.token = 'mock-token'
        localStorage.setItem('token', this.token)
      } finally {
        this.loading = false
      }
    },
    async comprobateLogin() {
      this.loading = true
      if (this.token) {
        //buscar usuario
        await new Promise((resolve) => setTimeout(resolve, 1000))
        this.user.id = 'mock-user-id'
        this.user.role = 'admin'
      }
    },
    async handleLogout() {
      this.token = ''
      localStorage.removeItem('token')
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useAuthStore, import.meta.hot))
}
