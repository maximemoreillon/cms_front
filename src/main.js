import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueQuillEditor from 'vue-quill-editor'
import '@mdi/font/css/materialdesignicons.css';

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.withCredentials = true  // enable axios post cookie, default false
axios.defaults.crossDomain = true

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false


// Check auth at each route
router.beforeEach((to, from, next) => {

  // Authentication
  axios.post('https://authentication.maximemoreillon.com/status')
  .then(response => {
    if(response.data.logged_in) store.commit('update_user',response.data.username)
    else store.commit('update_user', undefined)
    next();
  })
  .catch(error => console.log(error))

});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
