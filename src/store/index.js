import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: undefined,
    categories: [],
  },
  mutations: {
    update_user(state, user){
      state.user = user;
    },
    update_categories(state, categories){
      state.categories = categories;
      
    }
  },
  actions: {
  },
  modules: {
  }
})
