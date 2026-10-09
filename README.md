# Prueba Técnica - Pagos App

Aplicativo web desarrollado como prueba técnica para la vacante de **Desarrollador Frontend Vue.js**.

---

## Tecnologías y Herramientas

El proyecto está construido con un stack moderno enfocado en la escalabilidad, la mantenibilidad y el rendimiento:

- **Vue.js 3** (Composition API con `setup`)
- **Quasar Framework 2**
- **Pinia** (Gestión de estado global)
- **Vue Router** (Enrutamiento y protección de rutas)
- **Sass / SCSS** (Estilos modulares)

---

## Arquitectura del Backend Mock

Para simular un entorno real sin dependencias externas, se ha implementado una **API Mock local** que incluye control de latencia mediante un parámetro de retraso (`delay`).

```text
src/
 └── backend/
      ├── index.js
      ├── services/
      │    ├── auth-backend.service.js
      │    └── payment-backend.service.js
      ├── utils/
      │    ├── response.js
      │    └── delay.js
      └── data/
           ├── users.mock.js
           └── payment.mock.js
```

---

## 1. Instrucciones para la Instalación y Ejecución Local

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### Prerrequisitos

Asegúrate de contar con los siguientes elementos instalados en tu sistema:

- **Node.js** (versión 16 o superior recomendada)
- Un gestor de paquetes de tu preferencia (**npm**, **yarn**, **pnpm** o **bun**).

### Pasos de Instalación

Clona el repositorio e instala las dependencias ejecutando:

```bash
# Con npm
npm install

# O usando yarn / pnpm / bun:
yarn install
# pnpm install
# bun install
```

### Iniciar la aplicación en modo desarrollo

Puedes iniciar el servidor utilizando el CLI de Quasar o los scripts configurados en el proyecto:

```bash
# Usando Quasar CLI de manera global
quasar dev

# O usando npx
npx quasar dev

# O utilizando el script de npm
npm run dev
```

### Visualización de la Aplicación

El servidor se compilará y la aplicación estará disponible en la dirección local proporcionada por la consola (por defecto **`http://localhost:9000`**).

---

## 2. Supuestos Adoptados Respecto al Modelo de Negocio

### Simulación de Backend y Red

- Se ha creado una API mock para simular el backend, lo que permite implementar la lógica de negocio y el flujo de la aplicación sin necesidad de un servidor externo.
- Gracias a la función `delay(ms)`, es posible simular la latencia de la red. Se ha configurado un delay específico para cada función, el cual puede ser modificado directamente en el archivo `src/backend/index.js`.

### Principio de Responsabilidad Única (SRP)

- La API mock es consumida por `AuthService` y `PaymentService`, los cuales se encuentran completamente separados de los manejadores de estado de Pinia, respetando de esta forma una arquitectura limpia y modular.

### Servicios Proveídos por la API Mock

La conexión a la API simulada se realiza dentro de los servicios, permitiendo una posterior actualización de este módulo en caso de integrar un backend real sin afectar la lógica de los componentes o gestores de estado.

- Autenticación (`Login`, creación y verificación de token de sesión, obtención de datos de usuario).
- Gestión de Pagos (Obtención del listado, creación, actualización y eliminación de elementos de pago).

### Modularidad y Escalabilidad

- Se ha implementado una separación modular de los elementos de la vista y componentes, facilitando su reutilización en diferentes contextos, el mantenimiento y la escalabilidad del código.
