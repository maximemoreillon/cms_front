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
  axios: { },
  components: {
    Aside,
    Header
  },
  mounted(){
    this.$router.beforeEach((to, from, next) => {
      // Close Nav when link is clicked
      next()
      this.aside_open = false
    })

    this.get_current_user()

  },
  data(){
    return {
      aside_open: false,
    }
  },
  methods: {
    get_current_user(){
      const jwt = VueCookie.get('jwt')

      if(!jwt) {
        this.$store.commit('set_current_user', null)
        delete this.axios.defaults.headers.common.Authorization
        return
      }

      const url = `${this.$config.userManagerApiUrl}/v2/users/self`
      const headers = { Authorization: `Bearer ${jwt}` }
      
      this.$axios.get(url, { headers })
        .then( ({data: user}) => {
          this.$store.commit('set_current_user', user)
          this.$axios.defaults.headers.common.Authorization = `Bearer ${jwt}`
        })
        .catch( (error) => {
          console.error(error)

          VueCookie.delete('jwt')
          this.$store.commit('set_current_user', null)
          delete this.axios.defaults.headers.common.Authorization

        })

    }
  }


}
</script>

<style>
/* Styles imported from external file */

</style>
