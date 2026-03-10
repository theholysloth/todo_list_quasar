<template>
    <q-card class="task-counter-card" >
        <q-card-selection>
            <div class="text-h6">Total des Taches</div>
            <div class="text-h3 q-mt-sm">{{totalTasks}}</div>
        </q-card-selection>
        
    </q-card>
    
</template>

<script>
    export default {
        name : "TaskCounter",
        /* on utilise plus les props , nos données sont maintenant globales 

        props: {//ici le composant TaskCounter attend un tableau de task en props. il est censé le recevoir chez son parent de la facon suivante
            //<task-counter :tasks="ma tache ou une fonction qui retourne une tache/>"
            tasks: Array,
        }//avecstore l'objectif est de faire qu'il ne recoivent plus les données via props mais qu'il aille les chercher 
        */

        computed: {
            totalTasks(){//on va juste recuperer la valeur donc via getters
                return this.$store.getters.totalTasks //tout est deja fait dans la definition du getter
            }
        }
    };
</script>

<style scoped>
    .task-counter-card{
        width: 220px;
        background: #fff3e0;
        border-radius: 12px;
    }
    .q-mt-sm{
        margin-left: 45%;
    }
</style>
