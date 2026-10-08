<template>
  <q-page class="column justify-evenly">
    <section class="row items-center w-full q-pa-md q-gutter-md">
      <GenericFilter :fields="filterConfig" @search="onApplyFilters" @clear="onResetFilters" />
    </section>
    <div class="column items-center">
      <img alt="Quasar logo" src="~@/assets/quasar-logo-vertical.svg" style="width: 200px; height: 200px" />

      <q-btn class="q-mt-md" color="primary" to="/second" label="Go to Second Page" no-caps />
    </div>
  </q-page>
</template>
<script setup>
import GenericFilter from '@/components/form/GenericFilter.vue'
import { ref } from 'vue'

const filterConfig = ref([
  {
    name: 'search',
    label: 'Buscar por nombre o correo',
    type: 'text',
    colClass: 'col-12 col-md-5'
  },
  {
    name: 'role',
    label: 'Filtrar por Rol',
    type: 'select',
    options: [
      { label: 'Administrador', value: 'admin' },
      { label: 'Desarrollador', value: 'dev' },
      { label: 'Cliente', value: 'client' }
    ],
    colClass: 'col-12 col-md-3'
  },
  {
    name: 'status',
    label: 'Estado',
    type: 'select',
    required: true,
    options: [
      { label: 'Activo', value: 1 },
      { label: 'Inactivo', value: 0 }
    ],
    colClass: 'col-12 col-md-3'
  }
])

const onApplyFilters = (filters) => {
  console.log('Filtros listos para enviar a la API:', filters)
}

const onResetFilters = () => {
  console.log('Filtros restablecidos. Recargando listado completo...')
}
</script>
