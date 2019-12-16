import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: false,
  },
  mutations: {
    toggle_auth(state) {
      state.user = !state.user
    }
  },
  actions: {
  },
  modules: {
  }
})
