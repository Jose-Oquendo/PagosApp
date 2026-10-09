<template>
  <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
    <q-list>
      <q-item v-if="auth.user" class="q-my-sm bg-grey-2">
        <q-item-section avatar>
          <q-avatar color="indigo-7" text-color="white" icon="person" />
        </q-item-section>
        <q-item-section>
          <q-item-label class="text-weight-bold">{{ auth.userName }}</q-item-label>
          <q-item-label caption>{{ auth.user.email }}</q-item-label>
          <div>
            <q-badge color="indigo-7" class="q-mt-xs" :label="auth.userRole" />
          </div>
        </q-item-section>
      </q-item>

      <q-separator />

      <q-item-label header> Menú Principal </q-item-label>

      <EssentialLink v-for="link in linksList" :key="link.label" v-bind="link" />
    </q-list>
  </q-drawer>
</template>

<script setup>
import { useAuthStore } from '@/stores/auth-store'
import EssentialLink from './EssentialLink.vue'

const leftDrawerOpen = defineModel({ type: Boolean, required: true })
const auth = useAuthStore()

const linksList = [
  {
    label: 'Métodos de Pago',
    caption: 'Listado y administración',
    icon: 'payments',
    link: '/main',
  },
  {
    label: 'Nuevo Método',
    caption: 'Registrar nuevo canal',
    icon: 'add_card',
    link: '/payments',
  },
]
</script>
