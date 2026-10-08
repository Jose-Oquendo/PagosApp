<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> PagosApp </q-toolbar-title>

        <div v-if="auth.user" class="q-mr-sm text-caption text-weight-medium gt-xs">
          {{ auth.userName }} ({{ auth.userRole }})
        </div>

        <q-btn flat dense round icon="logout" title="Cerrar sesión" @click="handleLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <!-- Información de sesión activa -->
        <q-item v-if="auth.user" class="q-my-sm bg-grey-2">
          <q-item-section avatar>
            <q-avatar color="primary" text-color="white" icon="person" />
          </q-item-section>
          <q-item-section>
            <q-item-label class="text-weight-bold">{{ auth.userName }}</q-item-label>
            <q-item-label caption>{{ auth.user.email }}</q-item-label>
            <div>
              <q-badge color="primary" class="q-mt-xs" :label="auth.userRole" />
            </div>
          </q-item-section>
        </q-item>

        <q-separator />

        <q-item-label header> Menú </q-item-label>

        <EssentialLink v-for="link in linksList" :key="link.label" v-bind="link" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth-store'
import EssentialLink from '@/components/EssentialLink.vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  auth.comprobateLogin()
})

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

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogout() {
  await auth.handleLogout()
  await router.push({ name: 'login' })
}
</script>
