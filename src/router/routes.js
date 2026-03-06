const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: 'list', component: () => import('pages/List.vue')},
      { path: 'edit/:index',name: 'task-edit',
        component: () => import('pages/EditTask.vue'),
        props: route => ({
          mode: 'edit',
          index: parseInt(route.params.index),
          taskData: route.params.taskData
        })
      }

    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  },
]


export default routes
