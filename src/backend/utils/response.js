export const createApiResponse = {
  success(data, message = 'Operación exitosa', status = 200) {
    return {
      success: true,
      status,
      data,
      message,
    }
  },

  error(message = 'Ocurrio un error inesperado', status = 400, errors = null) {
    return {
      success: false,
      status,
      message,
      errors,
    }
  },
}
