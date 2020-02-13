import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    categories: [],
  },
  mutations: {
    check_authentication(state){
      if(Vue.$cookies.get('jwt')) state.logged_in = true
      else state.logged_in = false
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
