<template>
  <q-page padding>
    <search-bar @search="$emit('update:search', $event)" />

    <task-list
      :tasks="tasks"
      :search="search"
      @delete-task="$emit('delete-task', $event)"
      @toggle-done="$emit('toggle-done', $event)"
      @edit-task="$emit('edit-task', $event)"
    />
  </q-page>
</template>

<script>
import SearchBar from 'src/components/SearchBar.vue';
import TaskList from 'src/components/TaskList.vue'

export default {
  name: 'PageList',
  components: { TaskList, SearchBar },
  props: ['tasks', 'search']
}
</script>