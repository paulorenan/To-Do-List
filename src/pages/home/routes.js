export default [
  {
    path: '/',
    name: 'home',
    component: () => import(/* webpackChunkName: "about" */ './Home.vue')
  }
]