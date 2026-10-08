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

    <Navigator v-model="leftDrawerOpen" />

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/auth-store'
import Navigator from '@/components/nav/Navigator.vue'
import { useRouter } from 'vue-router'

const auth = useAuthStore()
const router = useRouter()

onMounted(() => {
  auth.comprobateLogin()
})

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogout() {
  await auth.handleLogout()
  await router.push({ name: 'login' })
}
</script>
