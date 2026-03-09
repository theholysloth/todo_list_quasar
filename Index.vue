<template>
  <q-page padding>
    <!--task-form @add-task="$emit('add-task', $event)" /-->
    <task-counter/>
    <task-form/> 
    <!-- on n'a plus besoin de prevenir les autres que addtask à été cliqué dessus
    quand le bouton ajouter sera cliqué, les valeurs seront directement mises dans le tableau. dont la valeur change directement .
    etant donné que la liste d'affichage va directement se servir dans la liste grace au getters , on n'a donc plus rien à envoyer -->
  </q-page>
</template>

<script>
import TaskForm from 'src/components/TaskForm.vue'
import TaskCounter from 'src/components/TaskCounter.vue';

export default {
  name: 'PageIndex',
  components: { TaskForm, TaskCounter},

  //props: ['tasks', 'search'],
}
</script>
