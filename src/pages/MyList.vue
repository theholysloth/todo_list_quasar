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

const tasksStore = useTasksStore()
tasksStore.loadTasks()


const dialogAdd = ref(false)

function handleAddTask(payload) {
  tasksStore.ADD_TASK({
    ...payload,
    id: Date.now(),
    done: false
  })
  dialogAdd.value = false
}
function openAddDialog() {
  dialogAdd.value = true
}


</script>
