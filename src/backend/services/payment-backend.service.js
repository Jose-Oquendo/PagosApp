import { MOCK_PAYMENTS } from '../data/payment.mock'
import { createApiResponse } from '../utils/response'

export class PaymentBackendService {
  #payments = []

  constructor() {
    this.#payments = MOCK_PAYMENTS.map((payment) => ({ ...payment }))
  }

  getAll(filters = {}) {
    let result = [...this.#payments]

    if (filters.search) {
      const searchNormalized = filters.search.toLowerCase().trim()
      result = result.filter((item) =>
        (item.name || '').toLowerCase().includes(searchNormalized),
      )
    }

    if (filters.type) {
      result = result.filter((item) => item.type === filters.type)
    }

    if (filters.state) {
      result = result.filter((item) => item.state === filters.state)
    } else if (filters.isActive !== undefined && filters.isActive !== null && filters.isActive !== '') {
      const targetActive = filters.isActive === true || filters.isActive === 'true'
      result = result.filter((item) => item.isActive === targetActive)
    }

    return createApiResponse.success(
      result,
      'Listado de métodos de pago obtenido con éxito',
      200,
    )
  }

  getById(id) {
    const paymentId = Number(id)
    const payment = this.#payments.find((item) => item.id === paymentId)

    if (!payment) {
      return createApiResponse.error('Método de pago no encontrado', 404)
    }

    return createApiResponse.success(
      { ...payment },
      'Método de pago obtenido con éxito',
      200,
    )
  }

  create(paymentData) {
    const name = (paymentData.name || '').trim()
    const type = (paymentData.type || '').trim()

    if (!name || !type) {
      return createApiResponse.error(
        'El Nombre y el Tipo son obligatorios',
        422,
      )
    }

    const nextId =
      this.#payments.length > 0 ? Math.max(...this.#payments.map((p) => p.id)) + 1 : 1

    const currentDate = new Date()
    const formattedDate = `${currentDate.getFullYear()}/${String(currentDate.getMonth() + 1).padStart(2, '0')}/${String(currentDate.getDate()).padStart(2, '0')}`
    const creationDate = (paymentData.creationDate || formattedDate).trim()

    let state = 'Activo'
    let isActive = true
    if (paymentData.state) {
      state = paymentData.state === 'Activo' ? 'Activo' : 'Inactivo'
      isActive = state === 'Activo'
    } else if (paymentData.isActive !== undefined) {
      isActive = Boolean(paymentData.isActive)
      state = isActive ? 'Activo' : 'Inactivo'
    }

    const newPayment = {
      id: nextId,
      name,
      type,
      state,
      isActive,
      creationDate,
    }

    this.#payments.unshift(newPayment)

    return createApiResponse.success(
      { ...newPayment },
      'Método de pago registrado con éxito',
      201,
    )
  }

  update(id, paymentData) {
    const paymentId = Number(id)
    const index = this.#payments.findIndex((item) => item.id === paymentId)

    if (index === -1) {
      return createApiResponse.error('Método de pago no encontrado para actualizar', 404)
    }

    const currentItem = this.#payments[index]
    const name = paymentData.name ? paymentData.name.trim() : currentItem.name
    const type = paymentData.type ? paymentData.type.trim() : currentItem.type

    if (!name || !type) {
      return createApiResponse.error(
        'El Nombre y el Tipo son obligatorios',
        422,
      )
    }

    let state = currentItem.state
    let isActive = currentItem.isActive
    if (paymentData.state) {
      state = paymentData.state === 'Activo' ? 'Activo' : 'Inactivo'
      isActive = state === 'Activo'
    } else if (paymentData.isActive !== undefined) {
      isActive = Boolean(paymentData.isActive)
      state = isActive ? 'Activo' : 'Inactivo'
    }

    const updatedPayment = {
      id: paymentId,
      name,
      type,
      state,
      isActive,
      creationDate: currentItem.creationDate,
    }

    this.#payments[index] = updatedPayment

    return createApiResponse.success(
      { ...updatedPayment },
      'Método de pago actualizado con éxito',
      200,
    )
  }

  toggleStatus(id) {
    const paymentId = Number(id)
    const index = this.#payments.findIndex((item) => item.id === paymentId)

    if (index === -1) {
      return createApiResponse.error('Método de pago no encontrado', 404)
    }

    const currentItem = this.#payments[index]
    const newIsActive = !currentItem.isActive
    const newState = newIsActive ? 'Activo' : 'Inactivo'

    const updatedPayment = {
      ...currentItem,
      state: newState,
      isActive: newIsActive,
    }

    this.#payments[index] = updatedPayment

    return createApiResponse.success(
      { ...updatedPayment },
      'Estado del método de pago actualizado con éxito',
      200,
    )
  }

  delete(id) {
    const paymentId = Number(id)
    const index = this.#payments.findIndex((item) => item.id === paymentId)

    if (index === -1) {
      return createApiResponse.error('Método de pago no encontrado', 404)
    }

    const [deletedPayment] = this.#payments.splice(index, 1)

    return createApiResponse.success(
      deletedPayment,
      'Método de pago eliminado con éxito',
      200,
    )
  }
}

export const paymentBackendService = new PaymentBackendService()
