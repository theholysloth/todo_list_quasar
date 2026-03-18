<template>
  <task-counter :tasks="tasks" />

  <div class="q-pa-md">
    <q-option-group
      v-model="separator"
      inline
      class="q-mb-md"
      :options="separatorOptions"
    />

    <q-markup-table :separator="separator" flat bordered>
      <thead>
        <tr>
          <th>Terminée</th>
          <th>Nom</th>
          <th>Tâche</th>
          <th>Date limite</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <task-item
          v-for="t in filteredTasks"
          :key="t.id"
          :task="t"
          :id="t.id"
          @toggle-done="toggleDone(t.id)"
        />
      </tbody>
    </q-markup-table>

    <!-- Dialog d’édition (à la old-school) -->
    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400px;">
        <q-card-section>
          <div class="text-h6">Modifier la tâche</div>
        </q-card-section>

        <q-card-section class="q-gutter-md">
          <q-input v-model="editedTask.nom" label="Chargé de la tâche" outlined />
          <q-input v-model="editedTask.task" label="Tâche à effectuer" outlined />
          <q-input v-model="editedTask.date" type="date" label="Date de rendu" outlined />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Annuler" color="primary" @click="closeEditDialog" />
          <q-btn flat label="Enregistrer" color="positive" @click="saveEditedTask" />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup>
import { computed, ref, provide } from 'vue'
import { useQuasar } from 'quasar'
import { useTasksStore } from 'src/stores/tasks'

import TaskItem from './TaskItem.vue'
import TaskCounter from './TaskCounter.vue'

const $q = useQuasar()
const taskStore = useTasksStore()

// état dialog + tâche en cours d’édition (comme avant)
const editDialog = ref(false)
const editedTask = ref({
  id: null,
  nom: '',
  task: '',
  date: '',
  done: false
})

// données Pinia
const tasks = computed(() => taskStore.tasks)
const search = computed(() => taskStore.search)
const filter = computed(() => taskStore.getFilter)

// Option group Quasar
const separator = ref('horizontal')
const separatorOptions = [
  { label: 'Horizontal', value: 'horizontal' },
  { label: 'Vertical', value: 'vertical' },
  { label: 'Cell', value: 'cell' }
]

// filtrage (proche de ton ancien)
const filteredTasks = computed(() => {
  const searchValue = (search.value || '').toLowerCase()
  let list = tasks.value || []

  if (filter.value === 'done') {
    list = list.filter(t => t.done)
  } else if (filter.value === 'todo') {
    list = list.filter(t => !t.done)
  }

  return list.filter(t =>
    (t.nom || '').toLowerCase().includes(searchValue) ||
    (t.task || '').toLowerCase().includes(searchValue)
  )
})

// ====== vraies fonctions (comme dans ton ancien TaskList) ======

function deleteTask(taskId) {
  $q.dialog({
    title: 'Confirmation',
    message: 'Cette décision est irréversible',
    cancel: {
      label: 'Annuler',
      color: 'primary'
    },
    ok: {
      label: 'Supprimer',
      color: 'negative'
    },
    icon: 'warning',
    persistent: true
  }).onOk(() => {
    taskStore.DELETE_TASK(taskId)
    $q.notify({
      type: 'negative',
      message: 'Tâche supprimée',
      position: 'center'
    })
  })
}

function toggleDone(taskId) {
  taskStore.TOGGLE_DONE(taskId)

  const myTask = taskStore.getTaskById(taskId)
  if (myTask && myTask.done) {
    $q.notify({
      type: 'info',
      message: 'Tâche terminée. BRAVO !!!',
      position: 'center',
      timeout: 2800
    })
  }
}

function openEditDialog(task) {
  editedTask.value = {
    id: task.id,
    nom: task.nom,
    date: task.date,
    task: task.task,
    done: task.done
  }
  editDialog.value = true
}

function closeEditDialog() {
  editedTask.value = {
    id: null,
    nom: '',
    date: '',
    task: '',
    done: false
  }
  editDialog.value = false
}

function saveEditedTask() {
  const t = editedTask.value

  if (!t.nom || !t.task || !t.date) {
    $q.notify({
      type: 'negative',
      message: 'Veuillez entrer les champs requis svp !',
      position: 'center'
    })
    return
  }

  taskStore.UPDATE_TASK(t)

  editDialog.value = false

  $q.notify({
    type: 'positive',
    message: 'Tâche modifiée avec succès !!',
    position: 'center'
  })
}

// provide des vraies fonctions (comme avant)
provide('deleteTask', deleteTask)
provide('openEditDialog', openEditDialog)
</script>
