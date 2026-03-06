<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Quasar App
        </q-toolbar-title>

        <search-bar
        v-if="$route.path === '/list'"
        @search="search = $event"
      />

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item clickable to="/list">
          <q-item-section>Tâches</q-item-section>
        </q-item>

        <q-item clickable to="/">
          <q-item-section>Ajouter une tâche</q-item-section>
        </q-item>

        <q-item clickable to="/config">
          <q-item-section>Configuration</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container>
      <router-view
        :tasks="tasks"
        :search="search"
        @toggle-done="toggleDone"
        @add-task="addTaskFromChild"
        @update-task="updateTaskFromChild"
        @delete-task="deleteTask"
        @edit-task="goToEditPage"
      />

    </q-page-container>
  </q-layout>
</template>

<script>
import SearchBar from 'src/components/SearchBar.vue';

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
]

export default {
  name: 'MainLayout',
  components: { SearchBar },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: linksData,
      tasks: [],
      search: ''
    }
  },

  methods: {
    toggleDone (index) {
      this.tasks[index].done = !this.tasks[index].done
    },

    addTaskFromChild (task) {
      this.tasks.push({ ...task, done: false })
      this.$router.push('/list')
    },

    updateTaskFromChild (updated) {
      this.$set(this.tasks, updated.index, { ...updated })
      this.$router.push('/list')
    },

    deleteTask (index) {
      this.tasks.splice(index, 1)
    },

    goToEditPage (index) {
      const task = this.tasks[index]
      this.$router.push({
        name: 'task-edit',
        params: { index, taskData: task }
      })
    }
  }
}
</script>





<!--<template>
  <q-layout view="hHh lpR fFf">

      <q-toolbar>

        <q-btn flat to="/" label="Tâches" />
        <q-btn flat to="/add" label="Ajouter une tâche" />
        <q-btn flat to="/config" label="Configuration" />

      </q-toolbar>

  </q-layout>
</template>


-->