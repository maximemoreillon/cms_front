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
      axios.post('http://192.168.1.2:8050/get_navigation_items')
      .then(response => {
        console.log(response.data)
        console.log(state.navigation_items)

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
