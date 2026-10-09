import { mockBackendApi } from '@/backend'

export class PaymentRepository {
  async getPayments(filters = {}) {
    const response = await mockBackendApi.payments.getAll(filters)

    if (!response.success) {
      const error = new Error(response.message || 'Error al obtener métodos de pago')
      error.status = response.status
      throw error
    }

    return response.data
  }

  async getPaymentById(id) {
    const response = await mockBackendApi.payments.getById(id)

    if (!response.success) {
      const error = new Error(response.message || 'Error al consultar método de pago')
      error.status = response.status
      throw error
    }

    return response.data
  }

  async createPayment(paymentData) {
    const response = await mockBackendApi.payments.create(paymentData)

    if (!response.success) {
      const error = new Error(response.message || 'Error al crear método de pago')
      error.status = response.status
      error.errors = response.errors
      throw error
    }

    return response.data
  }

  async updatePayment(id, paymentData) {
    const response = await mockBackendApi.payments.update(id, paymentData)

    if (!response.success) {
      const error = new Error(response.message || 'Error al actualizar método de pago')
      error.status = response.status
      error.errors = response.errors
      throw error
    }

    return response.data
  }

  async togglePaymentStatus(id) {
    const response = await mockBackendApi.payments.toggleStatus(id)

    if (!response.success) {
      const error = new Error(response.message || 'Error al cambiar estado del método')
      error.status = response.status
      throw error
    }

    return response.data
  }

  async deletePayment(id) {
    const response = await mockBackendApi.payments.delete(id)

    if (!response.success) {
      const error = new Error(response.message || 'Error al eliminar método de pago')
      error.status = response.status
      throw error
    }

    return response.data
  }
}

export const paymentRepository = new PaymentRepository()
