import Vue from 'vue'
import VueImgFallback from 'v-img-fallback';
import App from './App.vue'
import store from './store'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false
Vue.use(VueImgFallback, {
  loading: 'path/to/loading/image',
  error: 'path/to/error/image'
});

window._Vue = new Vue({
  store,
  router,
  vuetify,
  render: h => h(App)
}).$mount('#app')
