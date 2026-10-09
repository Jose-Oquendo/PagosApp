<template>
  <div class="fullscreen flex flex-center q-pa-md bg-grey-2">
    <q-card style="width: 100%; max-width: 380px" class="q-pa-sm shadow-2">
      <q-card-section class="text-center">
        <q-avatar size="56px" font-size="32px" color="apppagos" text-color="white" icon="lock" />
        <div class="text-h6 q-mt-sm text-weight-bold">Iniciar Sesión</div>
        <div class="text-caption text-grey-7">Sistema de Pagos - PagosApp</div>
      </q-card-section>

      <q-card-section v-if="auth.errorMessage" class="q-pt-none">
        <q-banner dense rounded class="bg-red-1 text-negative text-caption">
          <template #avatar>
            <q-icon name="error" color="negative" />
          </template>
          {{ auth.errorMessage }}
        </q-banner>
      </q-card-section>

      <q-card-section class="q-pt-none">
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="auth.email" label="Usuario o Correo" outlined dense
            :rules="[(val) => (val && val.trim().length > 0) || 'El usuario o correo es obligatorio']" lazy-rules>
            <template #prepend>
              <q-icon name="person" />
            </template>
          </q-input>

          <q-input v-model="auth.password" :type="showPassword ? 'text' : 'password'" label="Contraseña" outlined dense
            :rules="[(val) => (val && val.length > 0) || 'La contraseña es obligatoria']" lazy-rules>
            <template #prepend>
              <q-icon name="lock" />
            </template>
            <template #append>
              <q-icon :name="showPassword ? 'visibility_off' : 'visibility'" class="cursor-pointer"
                @click="showPassword = !showPassword" />
            </template>
          </q-input>

          <div>
            <q-btn label="Ingresar" type="submit" color="apppagos" class="full-width" :loading="auth.loading"
              unelevated />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../stores/auth-store'

const auth = useAuthStore()
const router = useRouter()
const showPassword = ref(false)

async function onSubmit() {
  try {
    await auth.handleLogin()
    if (auth.isLoggedIn) {
      await router.push({ name: 'home' })
    }
  } catch (error) {
    console.error('Fallo en autenticación:', error)
  }
}
</script>
