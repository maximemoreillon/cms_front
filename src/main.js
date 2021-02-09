import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


Vue.use(VueAxios, axios)
Vue.use(VueCookies)

// Icons
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
import EarthIcon from 'vue-material-design-icons/Earth.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import PlusIcon from 'vue-material-design-icons/Plus.vue'
import SendIcon from 'vue-material-design-icons/Send.vue'
import TagIcon from 'vue-material-design-icons/Tag.vue'
import CalendarIcon from 'vue-material-design-icons/Calendar.vue'
import AccountIcon from 'vue-material-design-icons/Account.vue'
import LockIcon from 'vue-material-design-icons/Lock.vue'
import EyeIcon from 'vue-material-design-icons/Eye.vue'



Vue.component('ArrowLeftIcon', ArrowLeftIcon)
Vue.component('earth-icon', EarthIcon)
Vue.component('pencil-icon', PencilIcon)
Vue.component('send-icon', SendIcon)
Vue.component('tag-icon', TagIcon)
Vue.component('calendar-icon', CalendarIcon)
Vue.component('account-icon', AccountIcon)
Vue.component('lock-icon', LockIcon)
Vue.component('eye-icon', EyeIcon)
Vue.component('plus-icon', PlusIcon)






Vue.config.productionTip = false


// Redirect to login screen if not logged in (i.e. does not have JWT in cookies)
router.beforeEach((to, from, next) => {

  document.title = `CMS - Maxime MOREILLON`

  // Save authentication state in Vuex
  store.commit('check_authentication')

  // deal with authentication header
  if(Vue.$cookies.get("jwt")) axios.defaults.headers.common['Authorization'] = `Bearer ${Vue.$cookies.get('jwt')}`
  else delete axios.defaults.headers.common['Authorization']

  next()

})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
