<template>
    <div class="card " style="width: 13.75em; background-color: bisque;">
        <div class="card-body">
            <h5 class="card-header">Total des Taches</h5>
            <p class="card-text">{{tasks.length}}</p>
        </div>
         
    </div>
</template>

<script>
    export default {
        name : "TaskCounter",
        props: {
            tasks: Array,
        }
    };
</script>

