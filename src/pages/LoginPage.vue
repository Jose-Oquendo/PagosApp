<template>
  <div class="fullscreen flex flex-center q-pa-md">
    <q-card style="width: 100%; max-width: 360px">
      <q-card-section>
        <div class="text-h6 text-center">Iniciar Sesión</div>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit" class="q-gutter-md">
          <q-input v-model="auth.email" label="Usuario o Correo" outlined />
          <q-input v-model="auth.password" type="password" label="Contraseña" outlined />
          <div>
            <q-btn label="Ingresar" type="submit" color="primary" class="full-width" />
          </div>
        </q-form>
      </q-card-section>
    </q-card>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';

const auth = useAuthStore();
const router = useRouter();

async function onSubmit() {
  try {
    await auth.handleLogin();
    if (auth.isLoggedIn) {
      await router.push({ name: 'home' });
    }
  } catch (error) {
    console.error('Error during login:', error);
  }
}
</script>
