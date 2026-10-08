import { defineRouter } from '#q-app'
import {
  createMemoryHistory,
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import routes from './routes'
import { useAuthStore } from '../stores/auth-store'

export default defineRouter(() => {
  const createHistory = import.meta.env.QUASAR_SERVER
    ? createMemoryHistory
    : import.meta.env.QUASAR_VUE_ROUTER_MODE === 'history'
      ? createWebHistory
      : createWebHashHistory

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory(import.meta.env.QUASAR_VUE_ROUTER_BASE),
  })

  // Guard
  Router.beforeEach((to, from, next) => {
    const authStore = useAuthStore()
    const requiresAuth = to.matched.some((record) => record.meta.requiresAuth)
    if (requiresAuth && !authStore.isLoggedIn) {
      next({ name: 'login' })
    } else if (to.name === 'login' && authStore.isLoggedIn) {
      next({ name: 'home' })
    } else {
      next()
    }
  })

  return Router
})
