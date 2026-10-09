<template>
  <q-card flat bordered class="q-pa-lg shadow-1">
    <q-form @submit.prevent="handleSave" class="q-gutter-y-md">
      <div class="row q-col-gutter-md">
        <div class="col-xs-12 col-sm-6">
          <q-input
            v-model="paymentStore.formData.name"
            label="Nombre *"
            placeholder="Ej: Visa Bancolombia, Recaudo Efecty"
            outlined
            dense
            color="indigo-6"
            :rules="[(val) => (val && val.trim().length > 0) || 'El nombre es obligatorio']"
          >
            <template #append>
              <q-icon name="bookmark_border" color="grey-6" />
            </template>
          </q-input>
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-select
            v-model="paymentStore.formData.type"
            :options="paymentStore.typeOptions"
            label="Tipo *"
            outlined
            dense
            emit-value
            map-options
            color="indigo-6"
            :rules="[(val) => (val && val.trim().length > 0) || 'El tipo es obligatorio']"
          >
            <template #prepend>
              <q-icon name="category" color="grey-6" />
            </template>
          </q-select>
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-select
            v-model="paymentStore.formData.state"
            :options="paymentStore.stateOptions"
            label="Estado *"
            outlined
            dense
            emit-value
            map-options
            color="indigo-6"
            :rules="[(val) => (val && val.trim().length > 0) || 'El estado es obligatorio']"
          >
            <template #prepend>
              <q-icon
                :name="paymentStore.formData.state === 'Activo' ? 'check_circle' : 'cancel'"
                :color="paymentStore.formData.state === 'Activo' ? 'positive' : 'negative'"
              />
            </template>
          </q-select>
        </div>

        <div class="col-xs-12 col-sm-6">
          <q-input
            v-model="paymentStore.formData.creationDate"
            label="Fecha de Creación *"
            outlined
            dense
            disable
            bg-color="grey-2"
            color="indigo-6"
          >
            <template #append>
              <q-icon name="event" color="grey-6" />
            </template>
          </q-input>
        </div>
      </div>

      <div class="row justify-end q-gutter-sm q-mt-lg">
        <q-btn
          label="Cancelar"
          flat
          color="grey-7"
          @click="handleCancel"
          :disable="paymentStore.isSaving"
        />
        <q-btn
          label="Guardar Método de Pago"
          color="indigo-6"
          type="submit"
          :loading="paymentStore.isSaving"
          icon="save"
        />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { usePaymentStore } from '@/stores/payment-store'

const paymentStore = usePaymentStore()
const router = useRouter()
const $q = useQuasar()

onMounted(() => {
  if (!paymentStore.formData.creationDate) {
    const today = new Date()
    const formattedDate = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, '0')}/${String(today.getDate()).padStart(2, '0')}`
    paymentStore.formData.creationDate = formattedDate
  }
})

const handleSave = async () => {
  try {
    await paymentStore.saveCurrentMethod()
    $q.notify({
      type: 'positive',
      message: 'Método de pago guardado correctamente',
      position: 'top-right',
      timeout: 3000,
    })
    router.push({ name: 'home' })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error al guardar el método de pago',
      position: 'top-right',
      timeout: 3000,
    })
  }
}

const handleCancel = () => {
  paymentStore.resetFormData()
  router.push({ name: 'home' })
}
</script>
