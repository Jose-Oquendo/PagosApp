<template>
  <q-page class="q-pa-md">
    <div class="row items-center justify-between q-mb-md">
      <div>
        <div class="text-h5 text-weight-bold text-grey-9">Métodos de Pago</div>
        <div class="text-caption text-grey-7">
          Gestione los canales de recaudo registrados en el sistema
        </div>
      </div>

      <q-btn color="indigo-6" icon="add" label="Nuevo Método" unelevated @click="goToCreatePayment" />
    </div>

    <GenericFilter :fields="filterConfig" @search="onApplyFilters" @clear="onResetFilters" />

    <GenericTable :rows="paymentStore.filteredPaymentList" :columns="columns" :loading="paymentStore.isLoading"
      row-key="id" @row-press="onMethodSelect">
      <template #body-cells="{ row }">
        <q-td key="name">
          <div class="text-weight-bold text-grey-9">{{ row.name }}</div>
        </q-td>

        <q-td key="type">
          <div class="row items-center q-gutter-x-xs">
            <q-icon :name="getTypeIcon(row.type)" color="indigo-6" size="1.2rem" />
            <span>{{ row.type }}</span>
          </div>
        </q-td>

        <q-td key="state">
          <q-badge :color="row.state === 'Activo' ? 'positive' : 'grey-7'">
            {{ row.state }}
          </q-badge>
        </q-td>

        <q-td key="creationDate">
          {{ row.creationDate }}
        </q-td>

        <q-td key="acciones" class="text-center">
          <div class="row items-center justify-center q-gutter-x-xs" @click.stop>
            <q-toggle :model-value="row.state === 'Activo'" color="indigo-6" dense
              @update:model-value="() => onStatusChange(row)" />
            <q-btn flat round dense icon="visibility" color="grey-7" @click.stop="onMethodSelect(row, 'view')">
              <q-tooltip>Ver Detalles</q-tooltip>
            </q-btn>
            <q-btn flat round dense icon="delete" color="grey-7" @click.stop="onMethodSelect(row, 'delete')">
              <q-tooltip>Eliminar</q-tooltip>
            </q-btn>
          </div>
        </q-td>
      </template>
    </GenericTable>

    <PayDetails v-model="isModalOpen" />
  </q-page>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { usePaymentStore } from '@/stores/payment-store'
import GenericFilter from '@/components/common/form/GenericFilter.vue'
import GenericTable from '@/components/common/table/GenericTable.vue'
import PayDetails from '@/components/payment/PayDetails.vue'

const paymentStore = usePaymentStore()
const router = useRouter()
const $q = useQuasar()

const isModalOpen = ref(false)

const filterConfig = [
  {
    name: 'search',
    label: 'Buscar por Nombre',
    type: 'text',
    required: false,
    colClass: 'col-12 col-md-5',
  },
  {
    name: 'type',
    label: 'Tipo',
    type: 'select',
    required: false,
    options: [
      { label: 'Todos los tipos', value: '' },
      { label: 'Tarjeta', value: 'Tarjeta' },
      { label: 'Transferencia Bancaria', value: 'Transferencia Bancaria' },
      { label: 'Efectivo', value: 'Efectivo' },
      { label: 'PayPal', value: 'PayPal' },
    ],
    colClass: 'col-12 col-md-4',
  },
  {
    name: 'state',
    label: 'Estado',
    type: 'select',
    required: false,
    options: [
      { label: 'Todos los estados', value: '' },
      { label: 'Activo', value: 'Activo' },
      { label: 'Inactivo', value: 'Inactivo' },
    ],
    colClass: 'col-12 col-md-3',

  },
]

const columns = [
  { name: 'name', label: 'Nombre', field: 'name', align: 'left', sortable: true },
  { name: 'type', label: 'Tipo', field: 'type', align: 'left', sortable: true },
  { name: 'state', label: 'Estado', field: 'state', align: 'center', sortable: true },
  { name: 'creationDate', label: 'Fecha de Creación', field: 'creationDate', align: 'left', sortable: true },
  { name: 'acciones', label: 'Acciones', field: 'id', align: 'center', sortable: false },
]

onMounted(async () => {
  try {
    await paymentStore.fetchPaymentList()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'No fue posible cargar el listado de métodos',
      position: 'top-right',
    })
  }
})

const getTypeIcon = (typeValue) => {
  const match = paymentStore.paymentTypes.find((t) => t.value === typeValue)
  return match ? match.icon : 'payment'
}

const onApplyFilters = (filters) => {
  paymentStore.setFilterData(filters)
}

const onResetFilters = async () => {
  await paymentStore.resetFilterData()
}

const onMethodSelect = (item, action) => {
  if (action === 'delete') {
    $q.dialog({
      title: 'Confirmación',
      message: '¿Estás seguro de que deseas eliminar este elemento?',
      cancel: {
        label: 'Cancelar',
        color: 'grey-7',
        flat: true
      },
      ok: {
        label: 'Sí, eliminar',
        color: 'negative'
      },
      persistent: true
    }).onOk(() => {
      paymentStore.setSelectedPayment(item)
      paymentStore.deletePayment(item.id)
    })
    return
  } else {
    paymentStore.setSelectedPayment(item)
    isModalOpen.value = true
  }
}

const onStatusChange = async (row) => {
  try {
    await paymentStore.togglePaymentStatus(row.id)
    $q.notify({
      type: 'info',
      message: `Estado de "${row.name}" actualizado`,
      position: 'top-right',
      timeout: 2000,
    })
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: error.message || 'Error al actualizar estado',
      position: 'top-right',
    })
  }
}

const goToCreatePayment = () => {
  paymentStore.initNewMethod()
  router.push({ name: 'payments' })
}
</script>
