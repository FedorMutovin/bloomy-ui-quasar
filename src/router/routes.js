const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: 'core',
        component: () => import('pages/CorePage.vue'),
        children: [
          {
            path: 'wishes',
            component: () => import('pages/core/WishesPage.vue'),
            children: [
              { path: ':id', component: () => import('pages/core/wishes/WishPage.vue') }
            ]
          },
          {
            path: 'goals',
            component: () => import('pages/core/GoalsPage.vue'),
            children: [
              { path: ':id', component: () => import('pages/core/goals/GoalPage.vue') }
            ]
          },
          { path: 'tasks', component: () => import('pages/core/TasksPage.vue') },
          { path: 'actions', component: () => import('pages/core/ActionsPage.vue') },
          { path: 'thoughts', component: () => import('pages/core/ThoughtsPage.vue') }
        ]
      },
      { path: 'interests', component: () => import('pages/InterestPage.vue') }
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
