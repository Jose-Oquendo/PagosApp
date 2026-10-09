<template>
  <q-card flat bordered class="q-pa-md">
    <q-form @submit.prevent="handleSubmit">
      <div class="row q-col-gutter-md">
        <div v-for="field in fields" :key="field.name" :class="field.colClass || 'col-12 col-md-6'">
          <div v-if="field.sectionTitle" class="text-subtitle1 text-weight-bold q-mt-md q-mb-sm col-12">
            {{ field.sectionTitle }}
          </div>

          <q-input
            v-if="['text', 'number', 'email', 'password', 'textarea'].includes(field.type)"
            v-model="formValues[field.name]"
            :type="field.type === 'textarea' ? 'textarea' : field.type"
            :label="field.label"
            :readonly="field.readonly"
            outlined
            dense
            :error="errors[field.name]"
            :error-message="field.errorMessage || 'Este campo es obligatorio'"
            @update:model-value="errors[field.name] = false"
          />

          <q-select
            v-else-if="field.type === 'select'"
            v-model="formValues[field.name]"
            :options="field.options"
            :label="field.label"
            :emit-value="field.emitValue ?? true"
            :map-options="field.mapOptions ?? true"
            outlined
            dense
            :error="errors[field.name]"
            :error-message="field.errorMessage || 'Este campo es obligatorio'"
            @update:model-value="errors[field.name] = false"
          />

          <q-checkbox
            v-else-if="field.type === 'checkbox'"
            v-model="formValues[field.name]"
            :label="field.label"
            class="q-mt-sm"
          />
        </div>
      </div>

      <slot />

      <div class="row q-mt-xl q-gutter-sm justify-end">
        <q-btn :label="cancelLabel" @click="handleReset" color="grey-7" flat type="reset" />
        <q-btn :label="submitLabel" color="primary" type="submit" />
      </div>
    </q-form>
  </q-card>
</template>

<script setup>
import { useDynamicForm } from '@/composables/useDynamicForm'

const props = defineProps({
  fields: { type: Array, default: () => [] },
  initialValues: { type: Object, default: () => ({}) },
  submitLabel: { type: String, default: 'Guardar' },
  cancelLabel: { type: String, default: 'Cancelar' },
})

const emit = defineEmits(['submit', 'cancel'])

const { formValues, errors, validate, resetForm } = useDynamicForm(props.fields, props.initialValues)

const handleSubmit = () => {
  if (!validate()) return
  emit('submit', { ...formValues })
}

const handleReset = () => {
  resetForm()
  emit('cancel')
}
</script>
