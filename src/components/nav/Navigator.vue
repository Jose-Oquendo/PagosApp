<template lang="">
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <!-- Información de sesión activa -->
      <q-item v-if="auth.user" class="q-my-sm bg-grey-2">
        <q-item-section avatar>
          <q-avatar color="apppagos" text-color="white" icon="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ auth.userName }}</q-item-label>
          <q-item-label caption>{{ auth.user.email }}</q-item-label>
          <div>
            <q-badge color="apppagos" class="q-mt-xs" :label="auth.userRole" />
          </div>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item-label header> Menú </q-item-label>

      <EssentialLink v-for="link in linksList" :key="link.label" v-bind="link" />
    </q-list>
  </q-drawer>
</template>
<script setup>
import { useAuthStore } from '../../stores/auth-store'
import EssentialLink from './EssentialLink.vue'

const leftDrawerOpen = defineModel({ type: Boolean, required: true })
const auth = useAuthStore()

const linksList = [
  {
    label: 'Inicio',
    caption: 'Página principal',
    icon: 'home',
    link: '/main',
  },
  {
    label: 'Segunda',
    caption: 'Segunda página',
    icon: 'article',
    link: '/main/second',
  },
]
</script>
<style lang="">
</style>
