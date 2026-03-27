<template>

    <q-card class="my-card bg-secondary text-white">
    <q-card-section>
        <div class="text-h6">Formulaire d'Ajout de Taches</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
        <q-form @submit.prevent="onSubmit"> <!--prevent permet d'empecher le comportement par defaut des submit. car en html, submit recharge la page ou va vers la page indiquée dans action=""
        ce qui interrompt le javascript et donc onSubmit ne s'execute meme pas sans prevent -->
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
                            @blur="nomBlur"
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
                            @blur="taskBlur"
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
                            @blur="dateBlur"
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
<!--    : on bind une props 
        @ on ecoute un event -->


<script setup>
//les elts definies dans cript setup sont directement accessible dans le template

import { useQuasar } from 'quasar'
import { useForm, useField } from "vee-validate"
import * as yup from 'yup' 


const props = defineProps({ //du coup on peut maintenant acceder à chaque elt du props à l'aide de props.champ
    mode: {type: String , default:'add'}, 
    initialNom:String, 
    initialTask: String, 
    initialDate: String, 
    id: Number
})//le pere pourra appeller : <taskform :initial=variable_nom mode= unmode...> 

//defintion de data
/*const localNom = ref(props.nom || '')
const localTask = ref(props.task || '')
const localDate = ref(props.date || '')*/



///////////////////////////////
const $q = useQuasar() //useQuasar permet d'acceder à l'api quasar offrant pleins de fonctionnalités notify, dialog, dark

//useQuasar est un example de composable(comme useForm et useField). un composable donne acces à une logique/code reutilisable 
///////////////////////////////

//emits 
const emit = defineEmits(['add-task', 'update-task']) //pareil que les props on peut l'appeler grace au nom 
//permettent d'envoyer des infos au parent. emit('add-task',payload) . le pere recevra le "event" add-atsk:payload grace à @add-task="fonction" la fonction pourra use le payload

const schema = yup.object({//un schema est une description des regles (d'un formulaire)

//cela permet de separer la politique devalidation du submit(qui est la politique de soumission)

    nom : yup.string().trim().required("le nom est obligatoire ").min(2),//trim supprimes les espaces au debut et à la fin
    task: yup.string().required("la tache est obligatoire"),
    date: yup.string().required()
})

const {/*errors*/ resetForm, handleSubmit } = useForm({//useForm est le coeur du vee-validate. il cree un contexte de formulaire(espace qui stock les valeurs du formulaire, les erreurs, l'etat)
//il applique le schema yup , gere reset , la soumission et les valeurs initiales.

  validationSchema: schema, //gestion de la validation grace à validationSchema et handleSubmit s'occupe de la soumission

  initialValues : {
    nom: props.initialNom || '',
    task: props.initialTask || '',//soit '' soit des valeurs offertes par le pere via les props 
    date : props.initialDate || ''
  }
})

const {
    value : nom, 
    errorMessage : nomError, 
    handleBlur: nomBlur //la fonction à appeller quand le champ perd le focus
} = useField('nom') //les useFields sont des capteurs individuelles pour chaque champ du formulaire , il va de paire avec useForm
//il cree un champ de formulaire nommé grace à value.

//il n'est pas trop conseiller de faire : const {value} = defineField('nom') car si on le fait, on aura plusieurs variable value , donc conflit 

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


const onSubmit = handleSubmit((values)=> {//dans handleSubmit on a les valeur entré dans le formulaire grace à values
    const payload = {
        nom:values.nom,
        task: values.task, 
        date:values.date,
        done: props.mode === 'edit' ? props.initialDone : false
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