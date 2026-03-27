<template>
  <q-page class="flex flex-center">
    <q-card style="width: 450px; max-width: 90vw;">
      <q-card-section>
        <div class="text-h6 text-center">Inscription</div>
      </q-card-section>

      <q-card-section class="q-gutter-md">
        <q-input
          v-model="name"
          label="Nom"
          outlined
        />

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

        <q-input
          v-model="passwordConfirmation"
          label="Confirmation du mot de passe"
          type="password"
          outlined
        />
      </q-card-section>

      <q-card-actions vertical class="q-gutter-sm q-pa-md">
        <q-btn
          label="Créer le compte"
          color="primary"
          unelevated
          @click="handleRegister"
          :loading="loading"
        />

        <q-btn
          label="Déjà inscrit ? Se connecter"
          flat
          color="secondary"
          @click="goToLogin"
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

const name = ref('')
const email = ref('')
const password = ref('')
const passwordConfirmation = ref('')
const loading = ref(false)

async function handleRegister() {
  loading.value = true

  try {
    await authStore.register({
      name: name.value,
      email: email.value,
      password: password.value,
      password_confirmation: passwordConfirmation.value
    })

    await authStore.fetchMe()

    $q.notify({
      type: 'positive',
      message: 'Inscription réussie'
    })

    router.push('/tasks')
  } catch (error) {
    console.error(error)

    const errors = error?.response?.data?.errors
    let message = error?.response?.data?.message || 'Échec de l’inscription'

    if (errors) {
      const firstKey = Object.keys(errors)[0]
      if (firstKey && errors[firstKey]?.length) {
        message = errors[firstKey][0]
      }
    }

    $q.notify({
      type: 'negative',
      message
    })
  } finally {
    loading.value = false
  }
}

function goToLogin() {
  router.push('/login')
}
</script>
