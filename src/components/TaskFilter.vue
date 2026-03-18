<template>
  <div class="filtered">
    <q-btn-group spread outline>
      <q-btn
        icon="list"
        :color="currentFilter === 'all' ? 'primary' : 'grey-5'"
        @click="setFilter('all')"
      >
        <q-tooltip>Toutes</q-tooltip>
      </q-btn>

      <q-btn
        icon="check_circle"
        :color="currentFilter === 'done' ? 'positive' : 'grey-5'"
        @click="setFilter('done')"
      >
        <q-tooltip>Terminées</q-tooltip>
      </q-btn>

      <q-btn
        icon="radio_button_unchecked"
        :color="currentFilter === 'todo' ? 'warning' : 'grey-5'"
        @click="setFilter('todo')"
      >
        <q-tooltip>Todo</q-tooltip>
      </q-btn>
    </q-btn-group>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from 'src/stores/tasks'

const tasksStore = useTasksStore()

const currentFilter = computed(() => tasksStore.getFilter)

function setFilter(value) {
  tasksStore.SET_FILTER(value)
}
</script>

<style>
.filtered {
  width: 20%;
  margin-left: 2%;
}
.q-btn {
  font-size: 10px;
}
</style>
