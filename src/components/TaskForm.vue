<template>

    <q-card class="my-card bg-secondary text-white">
    <q-card-section>
        <div class="text-h6">Formulaire d'Ajout de Taches</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
        <div class="contaienr text-center " id="task-form">
            <div class="flex justify-center">
                <div class="col-md-auto">
                    <q-input rounded standout="text-white" v-model="localNom" type="text" label="Chargé de Tache"/>
                </div>
            </div>
            <br>
            <div class="flex justify-center">
                <div class="col-md-auto">
                    <q-input rounded standout="text-white" v-model="localTask" type="text" label="Description Tache"/>
                </div>                
            </div>
            <br>
            <div class="flex justify-center">
                <div class="col-md-auto">
                    <q-input v-model="localDate" type="date" label="date dû"/>
                </div>
            </div>
        </div>
        <br>
        <div class="flex justify-center">
            <q-btn align="around" class="btn-fixed-width" color="primary" icon="note_add" @click="submit">
                {{ props.mode === 'add' ? 'Ajouter' : 'Modifier' }}
            </q-btn>
      </div>
    </q-card-section>    
    </q-card>

    <!--dans tout le template, on ne doi jamais utiliser .value sur un ref (car ils sont automatiquement deballé dans les template)et sur les props y'en a pas-->
</template>

<script setup>

import { useQuasar } from 'quasar'
import {ref} from 'vue'


const props = defineProps({ //du coup on peut maintenant acceder à chaque elt du props à l'aide de props.champ
    mode: {type: String , default:'add'}, 
    nom:String, 
    task: String, 
    date: String, 
    id: Number
})

//defintion de data
const localNom = ref(props.nom || '')
const localTask = ref(props.task || '')
const localDate = ref(props.date || '')

///////////////////////////////
const $q = useQuasar() //pour pouvoir utiliser notify 
///////////////////////////////

//emits 
const emit = defineEmits(['add-task', 'update-task','toggle-done','delete-task', 'edit-task']) //pareil que les props on peut l'appeler grace au nom 

//methods 
function submit(){
    if (!localNom.value || !localDate.value || !localTask.value){
        $q.notify({
            type:'negative', 
            message:'Veuillez remplir tous les champs !', 
            position: 'center'
        })
        return; 
    }

    const payload = {
        nom:localNom.value,
        task: localTask.value, 
        date:localDate.value
    }; 

    if(props.mode === 'add'){

        $q.notify({//.$q.notify est une API offerte par quasar pour pouvoir implement de "l'html ou template" dans une methode
          type:'positive', //les autres types : warning, negative, info 
          message:'Tache Ajoutée!',
          position:'top',//top-left, top-right,...
          timeout: 1500
        })

        emit('add-task',payload);//envoyer add-task aux parents qui vont appeller TaskForm; ILS POURRONT FAIRE @add-task=
        localDate.value= '';
        localNom.value = ''; 
        localTask.value= ''
    }else{
        emit('update-task',{...payload,id:props.id}) //au payload, on ajoute le champ id
        
        $q.notify({
          type:'positive',
          message:'Tache Modifiée!',
          position:'top'
        })
    }
}

</script>


<style>
.my-card {
    margin-top: 1rem !important;
    width: 75%;
    margin-left: 17%;
    margin-right: 17%;
    background-color: #ebebd3;
}
.text-h6{
  color: black;
  display:flex;
  justify-content: center;
}


</style>