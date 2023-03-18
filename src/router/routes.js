export default [
  {
    path: '/',
    name: 'Home',
    component: () => import( '../views/HomeView.vue')
  },
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('../views/AuthView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/SettingsView/index.vue')
  },
  {
    path: '/exercises',
    name: 'Exercises',
    component: () => import('../views/ExercisesView/index.vue')
  },
  {
    path: '/trainees',
    name: 'Trainees',
    component: () => import('../views/TraineesView/index.vue')
  },
  {
    path: '/trainees/:id',
    name: 'Trainee',
    component: () => import('../views/TraineeView/index.vue')
  }
]