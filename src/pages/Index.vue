<template>
  <q-page padding>
    <task-form @add-task="$emit('add-task', $event)" />
  </q-page>
</template>

<script>
import TaskForm from 'src/components/TaskForm.vue'

export default {
  name: 'PageIndex',
  components: { TaskForm},

  props: ['tasks', 'search'],
}
</script>
