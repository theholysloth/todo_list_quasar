<template>
    <div class="card " style="width: 13.75em; background-color: bisque;">
        <div class="card-body">
            <h5 class="card-header">Total des Taches</h5>
            <!--p class="card-text">{{tasks.length}}</p-->
            <p class="card-text">Compteur: {{totalTasks}}</p>
            <p class="card-text">Compteur: {{$store.state.tasks}}</p>

        </div>
         
    </div>
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

