<template>
  <tr :class="{done: props.task.done}">
    <th scope="row">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="switchCheckDefault"
        :checked="props.task.done"
        @change="toggleDone"
      >
    </th>

    <td><label class="form-check-label">{{ props.task.nom }}</label></td>
    <td><label class="form-check-label">{{ props.task.task }}</label></td>
    <td><label class="date">{{ props.task.date }}</label></td>

    <td>
      <task-actions :task="props.task" />
    </td>
  </tr>
</template>

<script setup>
import TaskActions from './TaskActions.vue'

const props = defineProps({
  task: Object,
  id: Number
})

const emit = defineEmits(['toggle-done'])

function toggleDone() {
  emit('toggle-done', props.id)
}
</script>

<style>
.done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>
