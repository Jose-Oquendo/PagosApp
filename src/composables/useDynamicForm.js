// composables/useDynamicForm.js
import { reactive, watch } from 'vue'

export function useDynamicForm(fields, initialValues = {}) {
  const formValues = reactive({})
  const errors = reactive({})

  // Inicializar o resetear el estado
  const initForm = () => {
    fields.forEach((field) => {
      const hasInitial = initialValues && initialValues[field.name] !== undefined

      if (hasInitial) {
        formValues[field.name] = initialValues[field.name]
      } else if (field.defaultValue !== undefined) {
        formValues[field.name] = field.defaultValue
      } else {
        formValues[field.name] = field.type === 'checkbox' ? false : ''
      }

      errors[field.name] = false
    })
  }

  initForm()

  // Sincronizar si cambian los valores iniciales (modo edición)
  watch(
    () => initialValues,
    () => initForm(),
    { deep: true },
  )

  // Validar campos obligatorios
  const validate = () => {
    let hasError = false
    fields.forEach((field) => {
      if (field.required) {
        const val = formValues[field.name]
        if (
          val === '' ||
          val === null ||
          val === undefined ||
          (Array.isArray(val) && val.length === 0) ||
          (field.type === 'checkbox' && val === false)
        ) {
          errors[field.name] = true
          hasError = true
        } else {
          errors[field.name] = false
        }
      }
    })
    return !hasError // Retorna true si pasó la validación
  }

  const resetForm = () => {
    initForm()
  }

  return {
    formValues,
    errors,
    validate,
    resetForm,
  }
}
