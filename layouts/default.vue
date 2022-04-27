<template>
  <div class="app">

    <Header
      @navToggle="aside_open = !aside_open" />

    <!-- NAV management is a bit tedious -->
    <Aside
      :open="aside_open"
      @navToggle="aside_open = !aside_open" />

    <main>
      <router-view />
    </main>

    <footer>
      Article management system - Maxime Moreillon
    </footer>

    <!-- Overlay when the nav is open -->
    <div
      @click="aside_open = false"
      class="nav_backround"
      :class="{visible: aside_open}"/>


  </div>
</template>

<script>
import Aside from './Aside.vue'
import Header from './Header.vue'

import VueCookie from 'vue-cookie'

export default {
  name: 'Layout',
  modules: [
    '@nuxtjs/axios',
  ],
  axios: {},
  components: {
    Aside,
    Header
  },
  mounted(){

    this.$router.beforeEach((to, from, next) => {
      this.get_current_user()
      
      // Close Nav when link is clicked
      this.aside_open = false

      next()
    })

    

  },
  data(){
    return {
      aside_open: false,
    }
  },
  methods: {
    destroy_user(){
      VueCookie.delete('jwt')
      this.$store.commit('set_current_user', null)
      delete this.$axios.defaults.headers.common.Authorization
    },

    get_current_user(){
      const jwt = VueCookie.get('jwt')

      if(!jwt) return this.destroy_user()

      // Configue headers for all future requesrs
      this.$axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
      
      const url = `${this.$config.userManagerApiUrl}/v2/users/self`
      
      this.$axios.get(url)
        .then( ({data: user}) => {
          this.$store.commit('set_current_user', user)
          
        })
        .catch( (error) => {
          console.error(error)
          this.destroy_user()
        })

    }
  }


}
</script>

<style>
/* Styles imported from external file */

</style>
