<template>
  <q-card flat bordered class="q-pa-md q-mb-md">
    <q-form @submit.prevent="handleSearch" @reset.prevent="handleClear">
      <!-- Layout Horizontal -->
      <div class="row q-col-gutter-sm items-center">
        <div v-for="field in fields" :key="field.name" :class="field.colClass || 'col-12 col-md-3'">
          <!-- Renderizado del input (Texto o Select) -->
          <q-input v-if="['text', 'number', 'search'].includes(field.type)" v-model="formValues[field.name]"
            :type="field.type" :label="field.label" outlined dense clearable :error="errors[field.name]"
            @update:model-value="errors[field.name] = false" />
          <q-select v-else-if="field.type === 'select'" v-model="formValues[field.name]" :options="field.options"
            :label="field.label" :emit-value="field.emitValue ?? true" :map-options="field.mapOptions ?? true" outlined
            dense clearable :error="errors[field.name]" @update:model-value="errors[field.name] = false" />
        </div>

        <!-- Botones de Acción en línea -->
        <div class="col-12 col-md-auto q-ml-auto q-gutter-x-sm">
          <q-btn label="Limpiar" color="grey-7" flat icon="refresh" type="reset" />
          <q-btn label="Buscar" color="primary" icon="search" type="submit" />
        </div>
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { useDynamicForm } from '../../composables/useDynamicForm'

const props = defineProps({
  fields: { type: Array, required: true }
})

const emit = defineEmits(['search', 'clear'])

// Usamos el composable para la lógica
const { formValues, errors, validate, resetForm } = useDynamicForm(props.fields)

const handleSearch = () => {
  if (!validate()) return

  // Excluir campos vacíos para los filtros
  const activeFilters = {}
  for (const key in formValues) {
    const val = formValues[key]
    if (val !== '' && val !== null && val !== undefined && !(Array.isArray(val) && val.length === 0)) {
      activeFilters[key] = val
    }
  }
  emit('search', activeFilters)
}

const handleClear = () => {
  resetForm()
  emit('clear')
}
</script>
