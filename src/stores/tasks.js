import { defineStore } from 'pinia'

import { api } from 'boot/axios'
//pareil que le store vuex, pinia permet de creer des stores (permettant de garder les données globales, ces données sont perdues au rechargement de la page )
//les stores ne sont pas des bd, ils servent à partager des données entre composants sans trop utiliser de props 
//Ce sont des gestionnaires d’état côté front-end

/* Petite Analogie 

-Pinia/Vuex = le salon  
on y met les objets dont on a besoin tout de suite : télécommande, clés, lunettes.
C’est accessible rapidement, tout le monde dans la maison peut y accéder.

-Pinia/Vuex = ton plateau  
on y met ce que on va manger maintenant.

-Base de données = la cave  
on  y range les choses importantes et durables : archives, papiers, cartons.
C’est fait pour durer, même si on quitte la maison et revient demain.
-Base de données = la cuisine  
C’est là que les plats sont préparés, stockés, conservés.

EN CONCLUSION : 
- on peut se servir de pinia/vuex pour servir des données qui sont dans la BD
comme “tampon” entre la base de données et l' interface

Pinia/Vuex sert à exposer les données de la BD
Voici comment ça se passe dans une app :

*Le composant demande des données
*Le store (Pinia/Vuex) appelle l'API
*L’API va chercher dans la base de données
*Le store garde les données en mémoire
*Tous les composants peuvent les utiliser instantanément
*/


//les store en vue 3 sont dans un fichier (par store)
export const useTasksStore = defineStore('tasks', { //defineStore permet de creer un store qui aura l'id tasks.

  //useTasksStore est donc un composable exporté, disponible dans les composants pour avoir acces au store 

  state: () => ({//state est une fonction qui definit l'etat initial du store 
    tasks: [],
    search: '',
    filter: 'all'
  }),

  getters: {//les getters sont des valeurs calculées à partir du state 
    totalTasks: (state) => Array.isArray(state.tasks) ? state.tasks.length : 0,

    allTasks: (state) => state.tasks,   

    searchValue: (state) => state.search,

    getTaskById: (state) => {//retourne une fonction qui prend en parametre id car un getter ne prend pas de parametre 
      return (id) => state.tasks.find(task => task.id === id)
    },

    getFilter: (state) => state.filter
  },

  actions: {//contrairement aux getters qui permettent de faire des calculs en fonction de l'tat, les actions permettent de MODIFIER  le state
    /*saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },*/

    /*loadTasks() {//this pour acceder aux elements de state 
      const saved = localStorage.getItem('tasks')
      if (saved) {
        this.tasks = JSON.parse(saved)
      }
    },*/

    async loadTasks(){
      const response = await api.get('/tasks')
      this.tasks = response.data.data
    },

    /*ADD_TASK(task) {
      this.tasks.push(task)
      this.saveToLocalStorage()
    },*/

    async ADD_TASK(task){
      const response = await api.post('/tasks',task)
      this.tasks.push(response.data.data)
    },

    /*UPDATE_TASK(payload) {
      const index = this.tasks.findIndex(task => task.id === payload.id)
      if (index !== -1) {
        this.tasks.splice(index, 1, {
          ...this.tasks[index],//on prend l'ancienne tache à cet index et on ne change que les champs ci dessous
          nom: payload.nom,
          task: payload.task,
          date: payload.date
        })
        this.saveToLocalStorage()
      }
    },*/

    async UPDATE_TASK(payload){
      const response = await api.put(`/tasks/${payload.id}`,payload)
      const index = this.tasks.findIndex(task => task.id === payload.id)
      if (index !== -1) {
        this.tasks.splice(index, 1, response.data.data)
      }
    },

    /*DELETE_TASK(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
      this.saveToLocalStorage()
    },*/
    async DELETE_TASK(taskId){
      await api.delete(`/tasks/${taskId}`)
      this.tasks = this.tasks.filter(task=>task.id !== taskId)
    },

    /*TOGGLE_DONE(taskId) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.done = !task.done
        this.saveToLocalStorage()
      }
    },*/

    async TOGGLE_DONE(taskId){
      const task = this.tasks.find(t => t.id === taskId)
      if (!task) return 
      const updatedTask = {
        ...task, done: !task.done
      }
      const response = await api.put(`/tasks/${taskId}`, updatedTask)
      const index = this.tasks.findIndex(t => t.id === taskId)
      if (index !== -1){
        this.tasks.splice(index,1, response.data.data)
      }
    },

    SET_SEARCH(value) {
      this.search = value
    },

    SET_TASKS(tasks) {
      this.tasks = tasks
      this.saveToLocalStorage()
    },

    SET_FILTER(value) {
      this.filter = value
    }
  }
})
