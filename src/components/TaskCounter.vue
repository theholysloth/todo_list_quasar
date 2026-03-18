<template>
    <q-card class="task-counter-card" >
        <q-card-section>
            <div class="text-h6">Total des Taches</div>
            <div class="text-h3 q-mt-sm">{{totalTasks}}</div>
        </q-card-section>
        
    </q-card>
    
</template>

<script setup>
import { computed } from 'vue'
import { useTasksStore } from 'src/stores/tasks'

const tasksStore = useTasksStore()

// Getter Pinia
const totalTasks = computed(() => tasksStore.totalTasks) //plus de this.$store 
</script>

<style scoped>
.task-counter-card {
  width: 220px;
  background: #fff3e0;
  border-radius: 12px;
}
.q-mt-sm {
  margin-left: 45%;
}
</style>