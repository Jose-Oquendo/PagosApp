<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-grey-9">
          {{ isEditing ? 'Editar Método de Pago' : 'Nuevo Método de Pago' }}
        </div>
        <div class="text-caption text-grey-7">
          {{ isEditing ? 'Actualice la información y configuración del canal seleccionado' : 'Complete el formulario para registrar un nuevo canal de cobro' }}
        </div>
      </div>

      <q-btn
        flat
        color="grey-7"
        icon="arrow_back"
        label="Volver al Listado"
        @click="goToHome"
      />
    </div>

    <PayForm />
  </q-page>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/payment-store'
import PayForm from '@/components/payment/PayForm.vue'

const router = useRouter()
const paymentStore = usePaymentStore()

const isEditing = computed(() => {
  return Boolean(paymentStore.formData && paymentStore.formData.id)
})

const goToHome = () => {
  paymentStore.resetFormData()
  router.push({ name: 'home' })
}
</script>
