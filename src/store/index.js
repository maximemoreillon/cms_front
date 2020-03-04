import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    navigation_items: [],
  },
  mutations: {
    check_authentication(state){
      if(Vue.$cookies.get('jwt')) state.logged_in = true
      else state.logged_in = false
    },
    update_categories(state){
      axios.post(process.env.VUE_APP_API_URL + '/get_navigation_items')
      .then(response => {
        state.navigation_items.splice(0,state.navigation_items.length)
        response.data.forEach( record => {
          let tag = record._fields[record._fieldLookup['tag']]
          state.navigation_items.push(tag)
        });


      })
      .catch(error => console.log(error))
    }

  },
  actions: {
  },
  modules: {
  }
})
