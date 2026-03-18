<template>
  <q-page padding>
    <task-form
      :mode="mode"
      v-bind="taskData"
      @update-task="emit('update-task', $event)"
    />
  </q-page>
</template>

<script setup>
import TaskForm from 'src/components/TaskForm.vue'

 defineProps({
  mode: String,
  taskData: Object
})

const emit = defineEmits(['update-task'])
</script>
