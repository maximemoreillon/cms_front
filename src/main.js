import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookie from 'vue-cookie'
import './icon_import.js'

import Loader from '@moreillon/vue_loader'

Vue.use(VueCookie)
Vue.use(VueAxios, axios)

Vue.component('Loader', Loader)


Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  document.title = `Articles - Maxime MOREILLON`
  store.commit('check_authentication')
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
