<template>
  <q-page padding>
    <div class="row items-center justify-between q-mb-md">
      <task-filter />

      <my-search/>

      <q-btn round color="primary" icon="add" @click="openAddDialog">
        <q-tooltip>ajouter</q-tooltip>
      </q-btn>
    </div>

    <task-list/>

    <q-dialog v-model="dialogAdd" persistent>
      <q-card style="min-width: 400px;">
        <q-card-section>
          <div>Ajouter une tache</div>
        </q-card-section>

        <q-card-section>
          <task-form mode="add" @add-task="handleAddTask" />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fermer" color="primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import TaskList from 'src/components/TaskList.vue'
import TaskFilter from 'src/components/TaskFilter.vue'
import MySearch from 'src/components/MySearch.vue'
import TaskForm from 'src/components/TaskForm.vue'
import { useTasksStore } from 'src/stores/tasks'
import { onMounted } from 'vue'
import { useQuasar } from 'quasar'


const tasksStore = useTasksStore()
const $q = useQuasar()
//tasksStore.loadTasks()

onMounted(async () => {
  try {
    await tasksStore.loadTasks()
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Impossible de charger les tâches'
    })
    console.error(error)
  }
})

const dialogAdd = ref(false)

async function handleAddTask(payload) { //await tasksStore.createTask(payload)

 try {
    await tasksStore.ADD_TASK({
      ...payload,
      done: false
    })

    dialogAdd.value = false
  } catch (error) {
    $q.notify({
      type: 'negative',
      message: 'Erreur lors de l’ajout de la tâche'
    })
    console.error(error)
  }
}

function openAddDialog() {
  dialogAdd.value = true
}


</script>
