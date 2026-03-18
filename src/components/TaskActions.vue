<template>
  <div class="q-gutter-xs">
    <q-btn
      flat
      round
      dense
      color="negative"
      icon="delete"
      @click="deleteTask(task.id)"
    />

    <q-btn
      flat
      round
      dense
      color="primary"
      icon="edit"
      @click="openEditDialog(task)"
    />
  </div>
</template>

<script setup>
import { inject, defineProps } from 'vue'

defineProps({
  task: {
    type: Object,
    required: true
  }
})

// on sécurise pour éviter les erreurs si jamais le parent disparaît
const deleteTask = inject('deleteTask', () => {})
const openEditDialog = inject('openEditDialog', () => {})
</script>
