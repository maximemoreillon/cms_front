import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


Vue.use(VueAxios, axios)
Vue.use(VueCookies)

Vue.config.productionTip = false


// Redirect to login screen if not logged in (i.e. does not have JWT in cookies)
router.beforeEach((to, from, next) => {

  // Save authentication state in Vuex
  store.commit('check_authentication')

  // deal with authentication header
  if(Vue.$cookies.get("jwt")) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${Vue.$cookies.get('jwt')}`
  }
  else {
    delete axios.defaults.headers.common['Authorization']
  }

  next();

});


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
