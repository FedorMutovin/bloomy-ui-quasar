const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'roots',
        name: 'roots',
        component: () => import('pages/RootsPage.vue')
      },
      {
        path: 'map',
        name: 'map',
        component: () => import('pages/RootsPage.vue')
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
