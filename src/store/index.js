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
      const url = `${process.env.VUE_APP_CMS_API_URL}/v3/tags/`
      const params = {pinned: true}
      axios.get(url, {params})
      .then( ({data}) => {
        // delete all navigation items

        state.pinned_tags = data.map( tag => ({
            route: `/?tag_id=${tag._id}`,
            label: tag.name,
          })
        )

      })
      .catch(error => console.log(error))
    }

  },
  actions: {
  },
  modules: {
  }
})
