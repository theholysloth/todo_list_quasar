
<template>
  <q-page padding>
    <!--on enleve l'ecouteur @delete-task="$emit('delete-task', $event)" car il n'y aura plus d'emit de fait dans TaskList
    avant, quand on cliquait sur le bouton supprimé de tasklist, il envoyait un emit, qui etait relayé -->
    <task-list
      @edit-task="$emit('edit-task', $event)"
    />
  </q-page>
</template>


<script>
import TaskList from 'src/components/TaskList.vue'

export default {
  name: 'PageList',
  components: { TaskList },
}
</script>