export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ './Home.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import(/* webpackChunkName: "about" */ './LoginAuth.vue')
  }
]