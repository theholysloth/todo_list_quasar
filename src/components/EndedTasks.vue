<template>
    <div class="card" style="width: 13.75em; background-color:greenyellow;margin-left: 50%;">
    <div class="card-body">
        <h5 class="card-header">Tâches finies :</h5>
        <p class="card-text">{{ doneCount }}</p>
    </div>
    </div>
</template>


<script>
    export default {
        name: "endedTasks",
        props:{
            tasks : Array
        },
        computed: {
            doneCount() {
                return this.tasks.filter(t => t.done).length;
            }
        }
    }
</script>



