<template>
  <div class="q-pa-md">
    <q-toolbar class="text-dark rounded-borders">
      <q-input
        dense
        input-class="text-right"
        class="q-ml-md bg-white text-dark"
        type="text"
        v-model="localSearch"
        @update:model-value="updateSearch"
        placeholder="Rechercher une tâche..."
      >
        <template v-slot:append>
          <q-icon v-if="localSearch === ''" name="search" />
          <q-icon
            v-else
            name="clear"
            class="cursor-pointer"
            @click="clearSearch"
          />
        </template>
      </q-input>
    </q-toolbar>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useTasksStore } from 'src/stores/tasks'

const tasksStore = useTasksStore()

const localSearch = ref('')

function updateSearch() {
  console.log("SEARCHBAR UPDATE:", localSearch.value)
  tasksStore.SET_SEARCH(localSearch.value)
}

function clearSearch() {
  localSearch.value = ''
  tasksStore.SET_SEARCH('')
}
</script>

<style>
input {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #201a1a;
}
</style>
