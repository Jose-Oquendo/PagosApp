import { authBackendService } from './services/auth-backend.service'
import { paymentBackendService } from './services/payment-backend.service'
import { simulateDelay } from './utils/delay'

export const mockBackendApi = {
  auth: {
    async login({ identifier, password }) {
      await simulateDelay(600)
      return authBackendService.login(identifier, password)
    },

    async verifySession(token) {
      await simulateDelay(350)
      return authBackendService.verifyToken(token)
    },

    async logout(token) {
      await simulateDelay(200)
      return authBackendService.logout(token)
    },
  },

  payments: {
    async getAll(filters) {
      await simulateDelay(400)
      return paymentBackendService.getAll(filters)
    },

    async getById(id) {
      await simulateDelay(250)
      return paymentBackendService.getById(id)
    },

    async create(paymentData) {
      await simulateDelay(500)
      return paymentBackendService.create(paymentData)
    },

    async update(id, paymentData) {
      await simulateDelay(450)
      return paymentBackendService.update(id, paymentData)
    },

    async toggleStatus(id) {
      await simulateDelay(300)
      return paymentBackendService.toggleStatus(id)
    },

    async delete(id) {
      await simulateDelay(350)
      return paymentBackendService.delete(id)
    },
  },
}
