import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    categories: [],
  },
  mutations: {
    check_authentication(state){
      console.log('[Auth] Checking authentication')
      axios.post('https://authentication.maximemoreillon.com/status')
      .then(response => {
        if(response.data.logged_in) {
          console.log('[Auth] Logged in')
          state.user = response.data.username;
        }
        else {
          console.log('[Auth] Logged out')
          state.user = undefined;
        }
      })
      .catch(error => console.log(error))
    },
    update_categories(state){
      axios.post('https://cms.maximemoreillon.com/get_article_categories')
      .then(response => {
        state.categories = [... new Set(response.data.map(e => e.category))]
        .filter(e => e != undefined)
        .filter(e => e != '')
      })
      .catch(error => console.log(error))
    }

  },
  actions: {
  },
  modules: {
  }
})
