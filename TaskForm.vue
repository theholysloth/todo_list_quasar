<template>
  <q-card dark bordered class="mt-3">
    <q-card-section>
        <div class="text-h6">Formulaire d'Ajout de Taches</div>
    </q-card-section>

    <q-separator dark inset />

    <q-card-section>
        
      <div class="container text-center" id="task-form">
        <div class ="flex justify-center">
          <div class="col-md-auto"><q-input rounded standout="bg-teal text-white" v-model="localNom" type="text" label="chargé de tâche" /></div>
        </div>
        <br>
        <div class="flex justify-center">
          <div class="col-md-auto"><q-input rounded standout v-model="localTask" type="text" label="Description Tache"/></div>
        </div>
        <br>
        <div class="flex justify-center">
          <div class="col-md-auto"><input v-model="localDate" type="date" label="date dû"/></div>
        </div>
      </div>
      <br>
      <div class="flex justify-center">
        <q-btn align="around" class="btn-fixed-width" color="primary" icon="note_add" @click="submit">
          {{ mode === 'add' ? 'Ajouter' : 'Modifier' }}
        </q-btn>
      </div>
    </q-card-section>
  </q-card>
</template>





<script>
export default {
  name: "TaskForm",

  props: {
    mode: { type: String, default: 'add' },
    index: Number,
    id: Number, 
    // Propriétés envoyées par le router lors de l'edit
    nom: String, 
    task: String,
    date: String,
    done: Boolean
  },

  data() {
    return {
    // On initialise avec les props si elles existent
    localNom: this.nom || "",
    localTask: this.task || "",
    localDate: this.date || "",
    localDone: this.done || false
    };
  },

  methods: {
    submit() {
      if (!this.localNom || !this.localTask || !this.localDate) {
        alert("Veuillez remplir tous les champs !");
        return;
      }

      const payload = {
        nom: this.localNom,
        task: this.localTask,
        date: this.localDate,
        done: this.localDone
      };

      if (this.mode === "add") {
        this.$emit("task-added"); //avec les store on n'emit plus ( on emit pour les donnée qui seront locale) sauf qu'on a rajouter un bouton dans List.vue 

        //on peut directement commit la mutation grace à commit mais on va suivre les regles 
        this.$store.dispatch('addTask',{...payload, //... permettent d'ajouter ou de modifier un elt d'un champ
          id:Date.now()
        });

        this.$q.notify({//.$q.notify est une API offerte par quasar pour pouvoir implement de "l'html ou template" dans une methode
          type:'positive', //les autres types : warning, negative, info 
          message:'Tache Ajoutée!',
          position:'top',//top-left, top-right,...
          timeout: 1500
        })

        // reset uniquement en mode ajout

        this.localNom = "";
        this.localTask = "";
        this.localDate = "";
      } else {
        //this.$emit("update-task", { ...payload, index: this.index });
        
        this.$store.dispatch('updateTask',{...payload,index:this.index,
          id:this.id
        });

        this.$q.notify({
          type:'positive',
          message:'Tache Modifiée!',
          position:'top'
        })
      }
    }
  }
};
</script>

<style>
.mt-3 {
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

