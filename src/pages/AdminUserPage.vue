<template>
  <q-page padding>
    <div class="text-h5 q-mb-md">Gestion des utilisateurs</div>

    <q-table
      :rows="adminStore.users"
      :columns="columns"
      row-key="id"
      flat
      bordered
      :loading="loading"
    >
      <template v-slot:body-cell-roles="props">
        <q-td :props="props">
          <q-chip
            v-for="role in props.row.roles"
            :key="role.id"
            color="primary"
            text-color="white"
            dense
            class="q-mr-xs"
          >
            {{ role.name }}
          </q-chip>
        </q-td>
      </template>

      <template v-slot:body-cell-changeRole="props">
        <q-td :props="props">
          <div class="row items-center q-gutter-sm">
            <q-select
              dense
              outlined
              emit-value
              map-options
              :options="roleOptions"
              v-model="selectedRoles[props.row.id]"
              style="min-width: 180px"
            />
            <q-btn
              label="Mettre à jour"
              color="primary"
              dense
              @click="changeRole(props.row.id)"
            />
          </div>
        </q-td>
      </template>
    </q-table>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { useAdminStore } from 'src/stores/admin'

const $q = useQuasar()
const adminStore = useAdminStore()

const loading = ref(false)
const selectedRoles = ref({})

const columns = [
  {
    name: 'id',
    label: 'ID',
    field: 'id',
    align: 'left'
  },
  {
    name: 'name',
    label: 'Nom',
    field: 'name',
    align: 'left'
  },
  {
    name: 'email',
    label: 'Email',
    field: 'email',
    align: 'left'
  },
  {
    name: 'roles',
    label: 'Rôle actuel',
    field: 'roles',
    align: 'left'
  },
  {
    name: 'changeRole',
    label: 'Changer le rôle',
    field: 'changeRole',
    align: 'left'
  }
]

const roleOptions = computed(() =>
  adminStore.roles.map(role => ({
    label: role.name,
    value: role.name
  }))
)

onMounted(async () => {
  loading.value = true

  try {
    await Promise.all([
      adminStore.loadUsers(),
      adminStore.loadRoles()
    ])

    adminStore.users.forEach(user => {
      selectedRoles.value[user.id] = user.roles?.[0]?.name || null
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: 'Impossible de charger les utilisateurs ou les rôles'
    })
  } finally {
    loading.value = false
  }
})

async function changeRole(userId) {
  try {
    const role = selectedRoles.value[userId]

    await adminStore.updateUserRole(userId, role)

    $q.notify({
      type: 'positive',
      message: 'Rôle mis à jour avec succès'
    })
  } catch (error) {
    console.error(error)
    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Erreur lors de la mise à jour du rôle'
    })
  }
}
</script>
