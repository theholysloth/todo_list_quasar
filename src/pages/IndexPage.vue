<template>
  <q-page class="flex flex-center">
    <task-form mode="add" @add-task="handleAddTask"/>
  </q-page>
</template>

<script setup>
import TaskForm from 'src/components/TaskForm.vue';
//
import { useTasksStore } from 'src/stores/tasks'
const tasksStore = useTasksStore()

function handleAddTask(payload) {
  tasksStore.ADD_TASK({
    ...payload,
    id: Date.now(),
    done: false
  })
}
</script>
