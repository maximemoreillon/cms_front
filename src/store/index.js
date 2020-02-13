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
      // KIND OF A DIRTY FIX
      if(this.$cookies.get('jwt')) state.user = response.data.username
      else state.user = undefined
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
