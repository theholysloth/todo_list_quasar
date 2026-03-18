import { defineStore } from 'pinia'

export const useTasksStore = defineStore('tasks', {
  state: () => ({
    tasks: [],
    search: '',
    filter: 'all'
  }),

  getters: {
    totalTasks: (state) => Array.isArray(state.tasks) ? state.tasks.length : 0,

    allTasks: (state) => state.tasks,   // ← RENOMMÉ

    searchValue: (state) => state.search,

    getTaskById: (state) => {
      return (id) => state.tasks.find(task => task.id === id)
    },

    getFilter: (state) => state.filter
  },

  actions: {
    saveToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks))
    },

    loadTasks() {
      const saved = localStorage.getItem('tasks')
      if (saved) {
        this.tasks = JSON.parse(saved)
      }
    },

    ADD_TASK(task) {
      this.tasks.push(task)
      this.saveToLocalStorage()
    },

    UPDATE_TASK(payload) {
      const index = this.tasks.findIndex(task => task.id === payload.id)
      if (index !== -1) {
        this.tasks.splice(index, 1, {
          ...this.tasks[index],
          nom: payload.nom,
          task: payload.task,
          date: payload.date
        })
        this.saveToLocalStorage()
      }
    },

    DELETE_TASK(taskId) {
      this.tasks = this.tasks.filter(task => task.id !== taskId)
      this.saveToLocalStorage()
    },

    TOGGLE_DONE(taskId) {
      const task = this.tasks.find(t => t.id === taskId)
      if (task) {
        task.done = !task.done
        this.saveToLocalStorage()
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
