import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    current_user: null,
    pinned_tags: [],
  },
  mutations: {
    check_authentication(state){

      this.commit('update_categories',state)

      const jwt = localStorage.jwt


      if(!jwt) {
        state.current_user = null
        return
      }

      // Retrieve current user
      const url = `${process.env.VUE_APP_AUTHENTICATION_API_URL}/whoami`
      const options = { headers: { Authorization: `Bearer ${jwt}` } }
      axios.get(url, options)
      .then( ({data}) => {
        state.current_user = data
      })
      .catch(error => {
        if(error.response) console.error(error.response.data)
        else console.error(error)
      })



    },
    update_categories(state){

      // Get pinned tags
      axios.get(`${process.env.VUE_APP_CMS_API_URL}/v3/tags/pinned`)
      .then(response => {
        // delete all navigation items

        state.pinned_tags = response.data.map(record => {
          const tag = record._fields[record._fieldLookup['tag']]
          return {
            route: `/?tag_id=${tag.properties._id}`,
            label: tag.properties.name,
          }
        })

      })
      .catch(error => console.log(error))
    }

  },
  actions: {
  },
  modules: {
  }
})
