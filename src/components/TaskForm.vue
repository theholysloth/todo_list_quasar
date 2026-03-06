<template>
  <q-card dark bordered class="mt-3">
    <q-card-selection>
        <div class="text-h6">Formulaire d'Ajout de Taches</div>
    </q-card-selection>

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
    // Propriétés envoyées par le router lors de l'edit
    nom: String, 
    task: String,
    date: String
  },

  data() {
    return {
    // On initialise avec les props si elles existent
    localNom: this.nom || "",
    localTask: this.task || "",
    localDate: this.date || ""
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
        date: this.localDate
      };

      if (this.mode === "add") {
        this.$emit("add-task", payload);
      } else {
        this.$emit("update-task", { ...payload, index: this.index });
      }

      // reset uniquement en mode ajout
      if (this.mode === "add") {
        this.localNom = "";
        this.localTask = "";
        this.localDate = "";
      }
    }
  }
};
</script>

<style>
.mt-3 {
    margin-top: 1rem !important;
    width: 75%;
    margin-left: 15%;
    margin-right: 15%;
    background-color: #ebebd3;
}
.text-h6{
  color: black;
  display:flex;
  justify-content: center;
}
</style>

