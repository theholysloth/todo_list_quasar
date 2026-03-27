<template>
  <q-page class="flex flex-center">
    <q-card style="width: 400px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6 text-center">Connexion</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="email"
          label="Email"
          type="email"
          outlined
        />

        <q-input
          v-model="password"
          label="Mot de passe"
          type="password"
          outlined
        />
      </q-card-section>

      <q-card-actions vertical class="q-gutter-sm q-pa-md">
        <q-btn
          label="Se connecter"
          color="primary"
          unelevated
          @click="handleLogin"
          :loading="loading"
        />

        <q-btn
          label="Créer un compte"
          flat
          color="secondary"
          @click="goToRegister"
        />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { useAuthStore } from 'src/stores/auth'

const router = useRouter()
const $q = useQuasar()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true

  try {
    await authStore.login({
      email: email.value,
      password: password.value
    })

    await authStore.fetchMe()

    $q.notify({
      type: 'positive',
      message: 'Connexion réussie'
    })

    router.push('/list')
  } catch (error) {
    console.error(error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Échec de la connexion'
    })
  } finally {
    loading.value = false
  }
}

function goToRegister() {
  router.push('/register')
}
</script>