import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    logged_in: false,
    username: null, // Get rid of this
    current_user: null,
    navigation_items: [],
  },
  mutations: {
    check_authentication(state){

      if(Vue.$cookies.get('jwt')) {
        state.logged_in = true

        // Retrieve username
        axios.post(`${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`,
        {}, { headers: { Authorization: "Bearer " + Vue.$cookies.get('jwt') } })
        .then(response => {
          state.user = response.data

          // Get rid of this
          state.username = response.data.properties.username

          this.commit('update_categories',state)
        })
        .catch(error => {
          if(error.response) console.log(error.response.data)
          else console.log(error)
        })

      }
      else {
        state.logged_in = false
        this.commit('update_categories',state)
      }
    },
    update_categories(state){

      // Get pinned tags
      axios.get(`${process.env.VUE_APP_CMS_API_URL}/tag/pinned`)
      .then(response => {
        // delete all navigation items

        state.navigation_items = []

        if(state.user) {

          state.navigation_items.push({
            route: `/?author_id=${state.user.identity.low}`,
            label: 'My articles'
          })
        }

        response.data.forEach( record => {
          let tag = record._fields[record._fieldLookup['tag']]
          state.navigation_items.push({
            route: `/?tag_id=${tag.identity.low}`,
            label: tag.properties.name,
          })
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
