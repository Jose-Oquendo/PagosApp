import { authBackendService } from './services/auth-backend.service'
import { simulateDelay } from './utils/delay'

export const mockBackendApi = {
  auth: {
    /**
     * POST /api/v1/auth/login
     * @param {{ identifier: string, password: string }} credentials
     */
    async login({ identifier, password }) {
      await simulateDelay(600)
      return authBackendService.login(identifier, password)
    },

    /**
     * GET /api/v1/auth/me (o verificación de token)
     * @param {string} token
     */
    async verifySession(token) {
      await simulateDelay(350)
      return authBackendService.verifyToken(token)
    },

    /**
     * POST /api/v1/auth/logout
     * @param {string} token
     */
    async logout(token) {
      await simulateDelay(200)
      return authBackendService.logout(token)
    },
  },
}
