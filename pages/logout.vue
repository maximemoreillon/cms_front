<template>
  <div class="logout">

    <div class="container" v-if="$auth.user">

      <div class="">
        Logged in as {{ $auth.user.display_name }}
      </div>


      <div class="">
        <IconButton @click="logout()">
          <MaterialIconLogout />
          <span>Logout</span>
        </IconButton>

      </div>

    </div>

    <div v-if="loading" class="loader_container">
      <Loader />
    </div>


  </div>
</template>

<script>
import IconButton from '@/components/IconButton.vue'
import Loader from '@moreillon/vue_loader'
// import VueCookie from 'vue-cookie'

export default {
  name: 'Login',
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  axios: { },
  components: {
    IconButton,
    Loader
  },

  data () {
    return {
      loading: false,
      error: null,
      credentials: {
        username: '',
        password: '',
      }
      
    }
  },
  mounted(){

  },
  methods: {
    
    logout_custom(){

      this.$cookies.remove('jwt')
      this.$store.commit('set_current_user', null)
      delete this.$axios.defaults.headers.common.Authorization
    },

  },
  computed: {
    current_user(){
      return this.$store.state.current_user
    }
  }



}
</script>


<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.container > * {
  margin: 1em 0;
}

label {
  margin-right: 0.5em;
}


</style>
