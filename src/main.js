import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import VueCookies from 'vue-cookies'


Vue.use(VueAxios, axios)
Vue.use(VueCookies)




// Icon import
Vue.component('arrow-left-icon', () => import('vue-material-design-icons/ArrowLeft.vue'))
Vue.component('earth-icon', () => import('vue-material-design-icons/Earth.vue'))
Vue.component('pencil-icon', () => import('vue-material-design-icons/Pencil.vue'))
Vue.component('send-icon', () => import('vue-material-design-icons/Send.vue'))
Vue.component('tag-icon', () => import('vue-material-design-icons/Tag.vue'))
Vue.component('calendar-icon', () => import('vue-material-design-icons/Calendar.vue'))
Vue.component('account-icon', () => import('vue-material-design-icons/Account.vue'))
Vue.component('lock-icon', () => import('vue-material-design-icons/Lock.vue'))
Vue.component('eye-icon', () => import('vue-material-design-icons/Eye.vue'))
Vue.component('plus-icon', () => import('vue-material-design-icons/Plus.vue'))
Vue.component('information-outline-icon', () => import('vue-material-design-icons/InformationOutline.vue'))
Vue.component('login-icon', () => import('vue-material-design-icons/Login.vue'))
Vue.component('delete-icon', () => import('vue-material-design-icons/Delete.vue'))
Vue.component('content-save-icon', () => import('vue-material-design-icons/ContentSave.vue'))
Vue.component('newspaper-variant-multiple-outline-icon', () => import('vue-material-design-icons/NewspaperVariantMultipleOutline.vue'))
Vue.component('menu-icon', () => import('vue-material-design-icons/Menu.vue'))
Vue.component('logout-icon', () => import('vue-material-design-icons/Logout.vue') )
Vue.component('youtube-icon', () => import('vue-material-design-icons/Youtube.vue'))
Vue.component('image-icon', () => import('vue-material-design-icons/Image.vue'))
Vue.component('format-header-1-icon', () => import('vue-material-design-icons/FormatHeader1.vue'))
Vue.component('format-header-2-icon', () => import('vue-material-design-icons/FormatHeader2.vue'))
Vue.component('format-header-3-icon', () => import('vue-material-design-icons/FormatHeader3.vue'))
Vue.component('format-paragraph-icon', () => import('vue-material-design-icons/FormatParagraph.vue'))
Vue.component('format-bold-icon', () => import('vue-material-design-icons/FormatBold.vue'))
Vue.component('format-italic-icon', () => import('vue-material-design-icons/FormatItalic.vue'))
Vue.component('format-strikethrough-icon', () => import('vue-material-design-icons/FormatStrikethrough.vue'))
Vue.component('format-underline-icon', () => import('vue-material-design-icons/FormatUnderline.vue'))
Vue.component('format-list-bulleted-icon', () => import('vue-material-design-icons/FormatListBulleted.vue'))
Vue.component('format-list-numbered-icon', () => import('vue-material-design-icons/FormatListNumbered.vue'))
Vue.component('format-quote-close-icon', () => import('vue-material-design-icons/FormatQuoteClose.vue'))
Vue.component('format-bold-icon', () => import('vue-material-design-icons/FormatBold.vue'))
Vue.component('code-tags-icon', () => import('vue-material-design-icons/CodeTags.vue'))
Vue.component('undo-icon', () => import('vue-material-design-icons/Undo.vue'))
Vue.component('redo-icon', () => import('vue-material-design-icons/Redo.vue'))
Vue.component('link-icon', () => import('vue-material-design-icons/Link.vue'))




Vue.config.productionTip = false


// Redirect to login screen if not logged in (i.e. does not have JWT in cookies)
router.beforeEach((to, from, next) => {

  document.title = `Articles - Maxime MOREILLON`

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
