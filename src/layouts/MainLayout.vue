<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="menu" aria-label="Menu" @click="toggleLeftDrawer" />

        <q-toolbar-title> Quasar App </q-toolbar-title>

        <div>
          <q-btn label ='logout' color="negative" @click="handleLogOut"/>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item clickable to="/list">
            <q-item-section>Tâches</q-item-section>
        </q-item>

        <q-item clickable to="/">
          <q-item-section>Ajouter une tâche</q-item-section>
        </q-item>

        <q-item clickable to="/config">
            <q-item-section>Configuration</q-item-section>
        </q-item>
      </q-list>
      

    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth';

const leftDrawerOpen = ref(false)

const router = useRouter()
const authStore = useAuthStore()

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value
}

async function handleLogOut(){
  await authStore.logout()
  router.push('/login')
}
</script>
