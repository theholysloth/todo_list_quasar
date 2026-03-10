<template>
  <div class="q-pa-md">
  <q-toolbar class="text-dark rounded-borders">
    <q-input dense input-class="text-right" class="q-ml-md bg-white text-dark"
      type="text"
      v-model="localSearch"
      @input="updateSearch"
      placeholder="Rechercher une tâche...">
      <template v-slot:append>
        <q-icon v-if="localSearch === ''" name="search" />
        <q-icon v-else name="clear" class="cursor-pointer" @click="clearSearch" />
      </template>
    </q-input>
  </q-toolbar>
  </div>
</template>




<script>
export default {
  data () {
    return {
      localSearch: ''
    }
  }
}
</script>


<script>
export default {
  name: "SearchBar",

  data() {
    return {
      localSearch: ""
    };
  }, 

  methods: {
    updateSearch(){
      this.$store.dispatch('setSearch',this.localSearch)
    }, 

    clearSearch(){
      this.localSearch = ""
      this.$store.dispatch('setSearch',this.localSearch)

    }
  },
};
</script>

<style>
input {
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #201a1a;
}
</style>
