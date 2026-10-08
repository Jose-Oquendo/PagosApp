<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <q-btn flat dense round icon="logout" @click="handleLogout" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
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
import { ref } from 'vue'
import { useAuthStore } from '../stores/auth-store';
import EssentialLink from '@/components/EssentialLink.vue'
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();

const linksList = [
  {
    label: 'Inicio',
    caption: 'Página principal',
    icon: 'home',
    link: '/',
  },
  {
    label: 'Segunda',
    caption: 'Segunda página',
    icon: 'article',
    link: '/second',
  }
]

const leftDrawerOpen = ref(false)

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogout() {
  await auth.handleLogout();
  await router.push({ name: 'login' });
}

</script>
