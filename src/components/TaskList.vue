
<template>
  <div class="q-pa-md">
    <q-table
      title="Mes Tâches"
      :data="filteredTasks"
      :columns="columns"
      row-key="nom"
      flat
      bordered
    >
      <template v-slot:body-cell-done="props">
        <q-td :props="props">
          <q-checkbox 
            :value="props.row.done" 
            @input="toggleDone(tasks.indexOf(props.row))"
          />
        </q-td>
      </template>


      <!--on abandonne aussi les props on va recuperer directement les donnees dans le store-->
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

      <!-- @click="$emit('delete-task', tasks.indexOf(props.row))" est remplacé car on accede directement aux données dans le store
      sauf qu'on ne fait pas directement de dispatch danns le template. du coup ca sera dans une fonction qu'on appellera
-->
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-gutter-xs">
          <q-btn 
            flat round dense color="negative" icon="delete" 
            @click="deleteTask(tasks.indexOf(props.row))" 
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
  /*props: {
    search: String
  },*/
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
    tasks(){
      return this.$store.getters.tasks
    },
    search(){
      return this.$store.getters.search
    },
    
    filteredTasks() {
      if (!this.search) return this.tasks;//le this.tasks vient maintenant du task obtenu dans computed 
      const s = this.search.toLowerCase();
      return this.tasks.filter(t => 
        t.nom.toLowerCase().includes(s) || t.task.toLowerCase().includes(s)
      );
    }
  },

  methods:{
    deleteTask(index){
      this.$q.dialog({ //cette api permet d'eviter d'utiliser du template q-dialog et donc de gerer du v-model
        title:'confirmation',
        message: 'Cette decision est irreversible',
        cancel: {
          label:'Annuler',
          color: 'primary'
        },
        ok : {
          label:'supprimer',
          color: 'negative'
        },
        icon: 'warning',
        persistent: true
      }).onOk(() =>{
        this.$store.dispatch('deleteTask', index)
        this.$q.notify({
          type: 'negative',
          message: 'Tâche supprimée',
          position: 'center'
        })
      })
    },
    toggleDone(index){
      this.$store.dispatch('toggleDone', index)

      const myTask = this.$store.getters.tasks[index] //on aurait pu faire this.$store.state.tasks[index]
      if (myTask.done){
        this.$q.notify({
          type:'info',
          message: 'Tache Terminée. BRAVO!!!',
          position:'center',
          timeout:28
        })
      }
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