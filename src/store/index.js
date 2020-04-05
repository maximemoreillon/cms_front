import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    username: null,
    navigation_items: [
      {route: '/', icon: '', label: 'All articles'},
    ],
  },
  mutations: {
    check_authentication(state){
      if(Vue.$cookies.get('jwt')) {
        state.logged_in = true

        // Retrieve username
        // Todo: Use dotenv for this
        axios.post("https://api.authentication.maximemoreillon.com/whoami",
        {}, { headers: { Authorization: "Bearer " + Vue.$cookies.get('jwt') } })
        .then(response => { state.username = response.data.properties.username })
        .catch(error => { console.log(error.response.data) })

      }
      else state.logged_in = false
    },
    update_categories(state){
      axios.post(process.env.VUE_APP_API_URL + '/get_navigation_items')
      .then(response => {

        // delete all navigation items (except the first one)
        state.navigation_items.splice(1,state.navigation_items.length)

        response.data.forEach( record => {
          let tag = record._fields[record._fieldLookup['tag']]
          let navigation_item = {route: '/?tag_id='+tag.identity.low, icon: '', label: tag.properties.name}
          state.navigation_items.push(navigation_item)
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
