<template>

    <q-card class="my-card bg-secondary text-white">
    <q-card-section>
        <div class="text-h6">Formulaire d'Ajout de Taches</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
        <q-form @submit.prevent="onSubmit">
            <div class="contaienr text-center " id="task-form">
                <div class="flex justify-center">
                    <div class="col-md-auto">
                        <q-input 
                            rounded 
                            standout="text-white" 
                            v-model="nom" 
                            label="Chargé de Tache"
                            :error="!!nomError"
                            :error-message="nomError"
                            :blur="nomBlur"
                        />
                    </div>
                </div>

                <br>

                <div class="flex justify-center">
                    <div class="col-md-auto">
                        <q-input 
                            rounded 
                            standout="text-white" 
                            v-model="task" 
                            label="Description Tache"
                            :error="!!taskError"
                            :error-message="taskError"
                            :blur="taskBlur"
                        />
                    </div>                
                </div>

                <br>
                <div class="flex justify-center">
                    <div class="col-md-auto">
                        <q-input 
                            v-model="date" 
                            type="date" 
                            label="date dû"
                            :error="!!dateError"
                            :error-message="dateError"
                            :blur="dateBlur"
                        />
                    </div>
                </div>
            </div>
            <br>
            <div class="flex justify-center">
                <q-btn 
                align="around" 
                class="btn-fixed-width" 
                color="primary" 
                icon="note_add"
                type="submit"
                >
                    {{ props.mode === 'add' ? 'Ajouter' : 'Modifier' }}
                </q-btn>
            </div>
        </q-form> 



        
            
            
        
    </q-card-section>    
    </q-card>

    <!--dans tout le template, on ne doi jamais utiliser .value sur un ref (car ils sont automatiquement deballé dans les template)et sur les props y'en a pas-->
</template>

<script setup>

import { useQuasar } from 'quasar'
import { useForm, useField } from "vee-validate"
import * as yup from 'yup' 


const props = defineProps({ //du coup on peut maintenant acceder à chaque elt du props à l'aide de props.champ
    mode: {type: String , default:'add'}, 
    initialNom:String, 
    initialTask: String, 
    initialDate: String, 
    id: Number
})

//defintion de data
/*const localNom = ref(props.nom || '')
const localTask = ref(props.task || '')
const localDate = ref(props.date || '')*/



///////////////////////////////
const $q = useQuasar() //pour pouvoir utiliser notify 
///////////////////////////////

//emits 
const emit = defineEmits(['add-task', 'update-task','toggle-done','delete-task', 'edit-task']) //pareil que les props on peut l'appeler grace au nom 


const schema = yup.object({
    nom : yup.string().trim().required("le nom est obligatoire ").min(2),
    task: yup.string().required("la tache est obligatoire"),
    date: yup.string().required()
})

const { resetForm, handleSubmit } = useForm({
  validationSchema: schema, 

  intialValues : {
    nom: props.initialNom || '',
    task: props.initialTask || '',
    date : props.initialDate || ''
  }
})

const {
    value : nom, 
    errorMessage : nomError, 
    handleBlur: nomBlur
} = useField('nom')

const {
    value : task, 
    errorMessage : taskError, 
    handleBlur: taskBlur
} = useField('task')

const {
    value : date, 
    errorMessage : dateError, 
    handleBlur: dateBlur
} = useField('date')


const onSubmit = handleSubmit((values)=> {
    const payload = {
        nom:values.nom,
        task: values.task, 
        date:values.date
    }

    if(props.mode === 'add'){
        emit('add-task',payload);//envoyer add-task aux parents qui vont appeller TaskForm; ILS POURRONT FAIRE @add-task=
        
        $q.notify({//.$q.notify est une API offerte par quasar pour pouvoir implement de "l'html ou template" dans une methode
          type:'positive', //les autres types : warning, negative, info 
          message:'Tache Ajoutée!',
          position:'top',//top-left, top-right,...
          timeout: 1500
        })

        resetForm({
            values : {
                nom : '', 
                task : '', 
                date : ''
            }
        })
        
        /*localDate.value= '';
        localNom.value = ''; 
        localTask.value= ''*/
    }else{
        emit('update-task',
            {...payload,
                id:props.id
            }) //au payload, on ajoute le champ id
        
        $q.notify({
          type:'positive',
          message:'Tache Modifiée!',
          position:'top'
        })
    }
}, () => {
    $q.notify({
        type: 'negative', 
        message : 'Veuillez corriger les champs du formulaire', 
        position : 'center'
    })
})

//methods 


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