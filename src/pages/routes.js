export default [
  {
    path: '/',
    name: 'Home',
    component: () => import('./Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('./LoginAuth.vue')
  },
  {
    path: '/register',
    name: 'Cadastrar',
    component: () => import('./CreateUser.vue')
  },
]