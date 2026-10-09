<template>
  <q-dialog v-model="isOpen">
    <q-card style="min-width: 360px; max-width: 480px; width: 100%;">
      <q-card-section class="row items-center q-pb-none">
        <div class="text-h6 text-weight-bold text-indigo-9">Detalle del Método de Pago</div>
        <q-space />
        <q-btn icon="close" flat round dense v-close-popup />
      </q-card-section>

      <q-card-section class="q-pt-md" v-if="activePayment">
        <q-list separator dense>
          <q-item>
            <q-item-section avatar>
              <q-icon name="bookmark" color="indigo-6" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Nombre</q-item-label>
              <q-item-label class="text-weight-bold">{{ activePayment.name }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="category" color="indigo-6" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Tipo</q-item-label>
              <q-item-label class="text-weight-medium">{{ activePayment.type }}</q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon
                :name="activePayment.state === 'Activo' ? 'check_circle' : 'cancel'"
                :color="activePayment.state === 'Activo' ? 'positive' : 'negative'"
              />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Estado</q-item-label>
              <q-item-label>
                <q-badge :color="activePayment.state === 'Activo' ? 'positive' : 'negative'">
                  {{ activePayment.state }}
                </q-badge>
              </q-item-label>
            </q-item-section>
          </q-item>

          <q-item>
            <q-item-section avatar>
              <q-icon name="event" color="indigo-6" />
            </q-item-section>
            <q-item-section>
              <q-item-label caption>Fecha de Creación</q-item-label>
              <q-item-label>{{ activePayment.creationDate }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>

      <q-card-actions align="right" class="q-pa-md">
        <q-btn flat label="Cerrar" color="grey-7" v-close-popup />
        <q-btn color="indigo-6" label="Editar método" icon="edit" @click="handleEdit" v-close-popup />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { usePaymentStore } from '@/stores/payment-store'

const isOpen = defineModel({ type: Boolean, default: false })
const paymentStore = usePaymentStore()
const router = useRouter()

const activePayment = computed(() => {
  return paymentStore.selectedPayment || paymentStore.formData
})

const handleEdit = () => {
  if (activePayment.value) {
    paymentStore.editMethod(activePayment.value)
    router.push({ name: 'payments' })
  }
}
</script>
