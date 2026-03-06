
<template>
  <div class="q-pa-md">
    <q-table
      title="Mes Tâches"
      :data="filteredTasks"
      :columns="columns"
      row-key="name"
      flat
      bordered
    >
      <template v-slot:body-cell-done="props">
        <q-td :props="props">
          <q-checkbox 
            :value="props.row.done" 
            @input="$emit('toggle-done', tasks.indexOf(props.row))" 
          />
        </q-td>
      </template>

      <template v-slot:body-cell-nom="props">
        <q-td :props="props" :class="{ 'task-done': props.row.done }">
          {{ props.row.nom }}
        </q-td>
      </template>

      <template v-slot:body-cell-task="props">
        <q-td :props="props" :class="{ 'task-done': props.row.done }">
          {{ props.row.task }}
        </q-td>
      </template>

      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-xs">
          <q-btn 
            flat round dense color="negative" icon="delete" 
            @click="$emit('delete-task', tasks.indexOf(props.row))" 
          />
          <q-btn 
            flat round dense color="primary" icon="edit" 
            @click="$emit('edit-task', tasks.indexOf(props.row))" 
          />
        </q-td>
      </template>
    </q-table>
  </div>
</template>

<script>
export default {
  name: "TaskList",
  props: {
    tasks: Array,
    search: String
  },
  data() {
    return {
      columns: [
        { name: 'done', label: 'Terminée', field: 'done', align: 'left' },
        { name: 'nom', label: 'Nom', field: 'nom', align: 'left', sortable: true },
        { name: 'task', label: 'Tâche', field: 'task', align: 'left' },
        { name: 'date', label: 'Date limite', field: 'date', align: 'left' },
        { name: 'actions', label: 'Actions', field: 'actions', align: 'center' }
      ]
    }
  },
  computed: {
    filteredTasks() {
      if (!this.search) return this.tasks;
      const s = this.search.toLowerCase();
      return this.tasks.filter(t => 
        t.nom.toLowerCase().includes(s) || t.task.toLowerCase().includes(s)
      );
    }
  }
}
</script>

<style scoped>
.task-done {
  text-decoration: line-through;
  opacity: 0.6;
}
</style>