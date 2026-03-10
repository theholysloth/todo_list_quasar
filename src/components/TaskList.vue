
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
        <q-td :props="props">
          <task-actions 
          :task="props.row"
          :index="tasks.indexOf(props.row)"
          />
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="editDialog" persistent>
      <q-card style="min-width: 400 px;" >
        <q-card-section>
          <div>Modifier la tache </div>
        </q-card-section >
          

        <q-card-section class q-gutter-md>
          <q-input 
          v-model="editedTask.nom"
          label="Chargé de la tache"
          outlined/>

          <q-input 
          v-model="editedTask.task"
          label="Tache à effectuer"
          outlined/>

          <q-input 
          v-model="editedTask.date"
          label="Date de rendu"
          type=date
          outlined/>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="annuler" color="primary" @click="closeEditDialog"></q-btn>
          <q-btn flat label="Enregistrer" color="positive" @click="saveEditedTask"></q-btn>
        </q-card-actions>
        
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { date } from 'quasar';
import TaskActions from './TaskActions.vue';



export default {
  name: "TaskList",
  components : {TaskActions},
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
      ],
      editedIndex : null,
      editDialog : false,
      editedTask: {
        nom: '', 
        date: '', 
        task: '', 
        done: false
      }
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
    }, 

    openEditDialog(task,index){
      this.editedIndex = index, 
      this.editedTask = {
        nom : task.nom,
        date: task.date,
        task: task.task,
        done: task.done
      },
      this.editDialog = true
    }, 

    
    closeEditDialog(task,index){
      this.editedIndex = null, 
      this.editedTask = {
        nom : '',
        date: '',
        task: '',
        done: ''
      },
      this.editDialog = false
    }, 

    saveEditedTask(){
      if(!this.editedTask.nom || !this.editedTask.task || !this.editedTask.date){
        this.$q.notify({
          type:'negative',
          message: 'Veuillez entrer les champs requis svp !',
          position: 'center'
        })
        return
      }
      this.$store.dispatch('updateTask', {
        index: this.editedIndex,
        nom:this.editedTask.nom,
        date: this.editedTask.date,
        task: this.editedTask.task
      })
      this.editDialog = false

      this.$q.notify({
        type:'positive',
        message:'Tache modifiée avec succes !!',
        position:'center'
      })
    }
  },


  provide() { //provide permet de mettre à disposition de ses enfants certaines variables,fonctions,...
    return {
      openEditDialog: this.openEditDialog, //
      deleteTask : this.deleteTask
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