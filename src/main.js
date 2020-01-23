import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'

import '@mdi/font/css/materialdesignicons.css';

// require styles


axios.defaults.withCredentials = true  // enable axios post cookie, default false
axios.defaults.crossDomain = true
axios.defaults.timeout = 10000



Vue.use(VueAxios, axios)

Vue.config.productionTip = false


router.beforeEach((to, from, next) => {
  store.commit('check_authentication')
  next();
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
