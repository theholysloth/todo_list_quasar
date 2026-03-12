<template>
  <q-page padding>
    <!--search-bar @search="$emit('update:search', $event)" /-->
    <!--
    row → met les éléments sur la même ligne
    justify-between → un à gauche, un à droite
    -->
    <div class="row items-center justify-between q-mb-md">
      <task-filter />

      <q-btn round color="primary" icon="add" @click="openAddDialog">
        <q-tooltip>ajouter</q-tooltip>
      </q-btn>
    </div>
    
    
    <task-list
      :tasks="tasks"
      :search="search"
      @edit-task="$emit('edit-task', $event)"
    />
    <q-dialog v-model="dialogAdd" persistent>
      <q-card style="min-width: 400px;" >
        <q-card-section>
          <div>Ajouter une tache </div>
        </q-card-section >
          

        <q-card-section >
          <task-form mode="add"
           @task-added="dialogAdd = false"/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fermer" color="primary" v-close-popup></q-btn>
        </q-card-actions>
        
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
//import SearchBar from 'src/components/SearchBar.vue';
import TaskList from 'src/components/TaskList.vue'
import TaskFilter from 'src/components/TaskFilter.vue';

export default {
  name: 'PageList',
  components: { TaskList, TaskFilter },
  props: ['tasks', 'search'], 
  data() {
    return {
      dialogAdd : false
    }
  }, 
  methods : {
    openAddDialog(){
      this.dialogAdd = true
    }
  }
}
</script>

<style>

</style>