# Prueba Tecnica Pagos App

Aplicativo para prueba técnica - Vacante: Desarrollador Frontend VueJs.

## 1. Instrucciones para la instalación y ejecución en entorno local

El aplicativo fue construido con:

- Vue.js 3
- Quasar Framework 2
- Pinia (State Management)
- Composition API (setup)
- Scoped CSS & Global CSS
- Routing (vue-router)
- Backend Mock Data API:
  - src/backend-mock/
    - index.js
    - services/auth-backend.service.js
    - utils/response.js
    - utils/delay.js
    - data/users.mock.js

### Pasos de Instalación

```bash
npm run dev
# or: yarn/npm/bun install
```

### Iniciar la aplicacion en modo desarrollo

```bash
npx quasar dev
# o si dispone de Quasar CLI de manera global:
quasar dev
# o utilizando el script de npm:
npm run dev
```

### Visualización de la aplicación

El servidor se compilará y la aplicación estará disponible en la dirección local proporcionada por la consola (por defecto `http://localhost:9000`)

## 2. Supuestos adoptados respecto a las estructuras de datos y el tipado del modelo de negocio.

Se ha creado una API mock para simular el backend, que permite implementar la lógica de negocio y el flujo de la aplicación sin necesidad de un backend real. Gracias a la funcion "delay(ms)", se puede simular la latencia de la red. Se ha configurado un delay especifico para cada función. Este parametro puede ser modificado en el archivo src/backend/index.js

La API mock es usada por AuthService y PaymentService, separados de los stores definidos pretendiento de esta forma respetar el principio de responsabilidad única. Esta API mock proporciona los siguientes servicios:

- Login
- Creacion y verificacion de token de sesion
- Obtener datos de usuario
- Obtener listado de pagos
- Crear nuevo elemento de pago
- Actializar elemento de pago
- Eliminar elemento de pago

Se ha implementado una separacion modular de los elementos de la vista, de forma que se puedan reutilizar en diferentes contextos. Esto facilita el mantenimiento y la escalabilidad del código.
