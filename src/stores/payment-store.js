import { defineStore, acceptHMRUpdate } from 'pinia'
import { paymentRepository } from '@/services/payment/payment.repository'
import { createDefaultFormData } from '@/utils/DefaultFormData'

export const usePaymentStore = defineStore('payment', {
  state: () => ({
    paymentList: [],
    selectedPayment: null,
    formData: createDefaultFormData(),
    filterData: {
      search: '',
      type: '',
      state: '',
    },
    isLoading: false,
    isSaving: false,
    errorMessage: null,
    paymentTypes: [
      { label: 'Tarjeta', value: 'Tarjeta', icon: 'credit_card' },
      { label: 'Transferencia Bancaria', value: 'Transferencia Bancaria', icon: 'account_balance' },
      { label: 'Efectivo', value: 'Efectivo', icon: 'local_atm' },
      { label: 'PayPal', value: 'PayPal', icon: 'payment' },
    ],
    stateOptions: [
      { label: 'Activo', value: 'Activo' },
      { label: 'Inactivo', value: 'Inactivo' },
    ],
  }),

  getters: {
    filteredPaymentList: (state) => {
      return state.paymentList.filter((item) => {
        const searchFilter = (state.filterData.search || '').trim().toLowerCase()
        const itemName = (item.name || '').toLowerCase()
        const matchesSearch = !searchFilter || itemName.includes(searchFilter)

        const selectedType = state.filterData.type
        const matchesType = !selectedType || item.type === selectedType

        const selectedState = state.filterData.state
        const matchesState = !selectedState || item.state === selectedState

        return matchesSearch && matchesType && matchesState
      })
    },

    typeOptions: (state) => {
      return state.paymentTypes.map((item) => ({
        label: item.label,
        value: item.value,
      }))
    },
  },

  actions: {
    async fetchPaymentList() {
      this.isLoading = true
      this.errorMessage = null
      try {
        const data = await paymentRepository.getPayments()
        this.paymentList = data
      } catch (error) {
        this.errorMessage = error.message || 'Error al cargar métodos de pago'
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async saveCurrentMethod() {
      this.isSaving = true
      this.errorMessage = null
      try {
        const payload = {
          ...this.formData,
          isActive: this.formData.state === 'Activo',
        }
        let savedPayment = null

        if (payload.id) {
          savedPayment = await paymentRepository.updatePayment(payload.id, payload)
          const index = this.paymentList.findIndex((item) => item.id === payload.id)
          if (index !== -1) {
            this.paymentList[index] = savedPayment
          }
        } else {
          savedPayment = await paymentRepository.createPayment(payload)
          this.paymentList.unshift(savedPayment)
        }

        this.selectedPayment = savedPayment
        this.resetFormData()
        return savedPayment
      } catch (error) {
        this.errorMessage = error.message || 'Error al guardar método de pago'
        throw error
      } finally {
        this.isSaving = false
      }
    },

    async togglePaymentStatus(paymentId) {
      this.errorMessage = null
      try {
        const updatedPayment = await paymentRepository.togglePaymentStatus(paymentId)
        const index = this.paymentList.findIndex((item) => item.id === paymentId)
        if (index !== -1) {
          this.paymentList[index] = updatedPayment
        }
        if (this.selectedPayment && this.selectedPayment.id === paymentId) {
          this.selectedPayment = updatedPayment
        }
        return updatedPayment
      } catch (error) {
        this.errorMessage = error.message || 'Error al cambiar estado'
        throw error
      }
    },

    async deletePayment(paymentId) {
      this.errorMessage = null
      try {
        await paymentRepository.deletePayment(paymentId)
        this.paymentList = this.paymentList.filter((item) => item.id !== paymentId)
        if (this.selectedPayment && this.selectedPayment.id === paymentId) {
          this.selectedPayment = null
        }
      } catch (error) {
        this.errorMessage = error.message || 'Error al eliminar método de pago'
        throw error
      }
    },

    setSelectedPayment(payment) {
      this.selectedPayment = payment ? { ...payment } : null
    },

    initNewMethod() {
      this.formData = createDefaultFormData()
      this.selectedPayment = null
    },

    editMethod(payment) {
      if (!payment) return
      this.formData = {
        ...createDefaultFormData(),
        id: payment.id,
        name: payment.name || '',
        type: payment.type || '',
        state: payment.state || (payment.isActive ? 'Activo' : 'Inactivo'),
        isActive: payment.state ? payment.state === 'Activo' : Boolean(payment.isActive),
        creationDate: payment.creationDate || '',
      }
      this.selectedPayment = { ...payment }
    },

    resetFormData() {
      this.formData = createDefaultFormData()
    },

    setFilterData(filters) {
      this.filterData = {
        ...this.filterData,
        ...filters,
      }
    },

    async resetFilterData() {
      this.filterData = {
        search: '',
        type: '',
        state: '',
      }
      await this.fetchPaymentList()
    },
  },
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(usePaymentStore, import.meta.hot))
}
