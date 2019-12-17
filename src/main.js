import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueQuillEditor, {Quill} from 'vue-quill-editor'
import ImageResize from 'quill-image-resize-module';
import { ImageDrop } from 'quill-image-drop-module'

import '@mdi/font/css/materialdesignicons.css';

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

axios.defaults.withCredentials = true  // enable axios post cookie, default false
axios.defaults.crossDomain = true

// Use inline css instead of quill classes
Quill.register(Quill.import('attributors/style/align'), true);
Quill.register(Quill.import('attributors/class/color'), true);
Quill.register(Quill.import('attributors/style/size'), true);

Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/imageDrop', ImageDrop)

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

  // Article categories
  // Get article categories
  axios.post('https://cms.maximemoreillon.com/get_article_categories')
  .then(response => {
    let distinct_categories = [... new Set(response.data.map(e => e.category))]
    .filter(e => e != undefined)
    .filter(e => e != '')
    store.commit('update_categories',distinct_categories)
  })
  .catch(error => console.log(error))


});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
