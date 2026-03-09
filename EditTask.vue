<template>
  <q-page padding>
    <task-form
      :mode="mode"
      :index="index"
      v-bind="taskData"
      @update-task="$emit('update-task', $event)"
    />
  </q-page>
</template>

<script>
import TaskForm from 'src/components/TaskForm.vue'

export default {
  name: 'PageEditTask',
  components: { TaskForm },

  props: {
    mode: String,
    index: Number,
    taskData: Object
  }
}
</script>
