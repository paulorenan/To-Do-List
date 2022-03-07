export default [
  {
    path: '/login',
    name: 'loginAuth',
    component: () => import(/* webpackChunkName: "about" */ './pages/LoginAuth.vue')
  }
]