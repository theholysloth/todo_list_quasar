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
          @toggle-done="toggleDone"
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
const taskStore = useTasksStore()//connection au store grace au composable
//on a donc acces au store grace à taskStore....

// état dialog + tâche en cours d’édition (comme avant)
const editDialog = ref(false)
const editedTask = ref({
  id: null,
  nom: '',
  task: '',
  date: '',
  done: false
})

// données Pinia. on cree des valeurs reactives basé sur taskstore ainsi des qu'il y'aura une modif , les variables le seront aussi
//d'ou l'utilité de computed
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

// filtrage , on la met en computed car cette variable/fonction depend de tasks, search et filter qui sont reactive
const filteredTasks = computed(() => {
  const searchValue = (search.value || '').toLowerCase()
  let list = Array.isArray(tasks.value) ? tasks.value : []

  // On filtre d'abord les éléments invalides
  list = list.filter(t => t && typeof t === 'object')

  if (filter.value === 'done') {
    list = list.filter(t => t.done)
  } else if (filter.value === 'todo') {
    list = list.filter(t => !t.done)
  }

  return list.filter(t => {
    const nom = (t.nom || '').toLowerCase()
    const task = (t.task || '').toLowerCase()
    return nom.includes(searchValue) || task.includes(searchValue)
  })
})



async function deleteTask(taskId) {
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
  }).onOk(async() => {
    await taskStore.DELETE_TASK(taskId)//action pour modifier le state
    $q.notify({
      type: 'negative',
      message: 'Tâche supprimée',
      position: 'center'
    })
  })
}

async function toggleDone(taskId) {
  await taskStore.TOGGLE_DONE(taskId)

  const myTask = taskStore.getTaskById(taskId)//getter
  if (myTask && myTask.done) {
    $q.notify({
      type: 'info',
      message: 'Tâche terminée. BRAVO !!!',
      position: 'center',
      timeout: 2800
    })
  }
}

function openEditDialog(task) {//important car avant d'enregistrer dans le store , on fera des verification dans saveEditedTask
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

async function saveEditedTask() {
  const t = editedTask.value

  if (!t.nom || !t.task || !t.date) {
    $q.notify({
      type: 'negative',
      message: 'Veuillez entrer les champs requis svp !',
      position: 'center'
    })
    return
  }

  await taskStore.UPDATE_TASK(t)//action

  editDialog.value = false

  $q.notify({
    type: 'positive',
    message: 'Tâche modifiée avec succès !!',
    position: 'center'
  })
}

//on met a disposition des enfants de taskList les fonctions deleteTask et openEditDialog
provide('deleteTask', deleteTask)
provide('openEditDialog', openEditDialog)
</script>
