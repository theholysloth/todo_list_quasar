<template>
    <div class="q-gutter-xs">
        <q-btn flat round dense color='negative' icon='delete' @click="deleteTask(index)" />

        <q-btn flat round dense color='primary' icon='edit' @click="openEditDialog(task,index)" />

    </div>
</template>

<script>
export default {
    name: 'TaskActions',

    props: {
        task: {
            type: Object,
            required: true
        },
        index:{
            type:Number,
            required: true
        }
    }, 
    inject: ['openEditDialog', 'deleteTask'] //ces deux là sont des fonctions offertes par un parent (ici TaskList)
}

</script>

