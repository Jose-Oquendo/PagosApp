import { mockBackendApi } from '@/backend'

export class AuthRepository {

  async login({ identifier, password }) {
    const response = await mockBackendApi.auth.login({ identifier, password })

    if (!response.success) {
      const error = new Error(response.message || 'Error al iniciar sesión')
      error.status = response.status
      error.details = response.errors
      throw error
    }

    return response.data
  }

  async verifySession(token) {
    const response = await mockBackendApi.auth.verifySession(token)

    if (!response.success) {
      const error = new Error(response.message || 'Sesión inválida o expirada')
      error.status = response.status
      throw error
    }

    return response.data
  }


  async logout(token) {
    try {
      await mockBackendApi.auth.logout(token)
    } catch (err) {
      console.warn('Advertencia al notificar logout al backend:', err)
    }
  }
}

export const authRepository = new AuthRepository()
