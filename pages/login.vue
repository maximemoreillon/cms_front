<template>
  <div class="login">



    <form
      class="container"
      v-if="!loading && !current_user"
      @submit.prevent="login()">

      <div class="">
        <label
          for="username">
          Username
        </label>
        <input
          id="username"
          type="text"
          v-model="username"
          placeholder="Username">
      </div>

      <div class="">
        <label
          for="password">
          Password
        </label>
        <input
          id="password"
          type="password"
          v-model="password"
          placeholder="Password">
      </div>

      <div>
        <IconButton
          type="submit"
          @click="login()">
          <MaterialIconLogin />
          <span>Login</span>
        </IconButton>
      </div>

      <div
        class="error_message"
        v-if="error">
        {{error}}
      </div>


    </form>

    <div
      class="container"
      v-if="!loading && current_user">

      <div class="">
        Logged in as {{current_user.display_name}}
      </div>


      <div class="">
        <IconButton
          @click="logout()">
          <MaterialIconLogout/>
          <span>Logout</span>
        </IconButton>

      </div>

    </div>

    <div
      v-if="loading"
      class="loader_container">
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
      username: '',
      password: '',
    }
  },
  mounted(){

  },
  methods: {
    login(){
      this.loading = true
      const url = `${this.$config.userManagerApiUrl}/v2/auth/login`
      const body = {username: this.username, password: this.password}

      this.$axios.post(url, body)
      .then(({data}) => {

        const {jwt} = data

        const cookie_options = {
          secure: location.protocol === 'https:',
          samesite: 'Strict',
        }

        this.$cookies.set('jwt',jwt, cookie_options)

        this.$axios.defaults.headers.common.Authorization = `Bearer ${jwt}`

        const url = `${this.$config.userManagerApiUrl}/v2/users/self`

        return this.$axios.get(url)
      })
      .then( ({data: user}) => {
        this.$store.commit('set_current_user', user)
      })
      .catch(error => {
        if(error.response) {
          console.error(error.response.data)
          this.error = error.response.data
        }
        else {
          console.error(error)
          this.error = 'Could not login, pleae contact an administrator'
        }
      })
      .finally(() => { this.loading = false })
    },
    logout(){

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
