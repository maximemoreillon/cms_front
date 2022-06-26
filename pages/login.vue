<template>
  <div class="login">

    <form class="container" v-if="!loading" @submit.prevent="login()">

      <div class="">
        <label for="username">
          Username
        </label>
        <input id="username" type="text" v-model="credentials.username" placeholder="Username">
      </div>

      <div class="">
        <label for="password">
          Password
        </label>
        <input id="password" type="password" v-model="credentials.password" placeholder="Password">
      </div>

      <div>
        <button type="submit" @click="login()" class="outlined">
          <MaterialIconLogin />
          <span>Login</span>
        </button>
      </div>

      <div class="error_message" v-if="error">
        {{error}}
      </div>


    </form>

    <div v-if="loading" class="loader_container">
      <Loader />
    </div>


  </div>
</template>

<script>
import Loader from '@/components/Loader'

export default {
  name: 'Login',
  modules: [
    '@nuxtjs/axios',
    'cookie-universal-nuxt',
  ],
  axios: { },
  components: {
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
    async login() {
      // Using nuxt auth
      try {
        await this.$auth.loginWith('local', { data: this.credentials })
      } 
      catch (error) {
        this.error = error
        console.error(error)
      }
    },

  },




}
</script>


<style scoped>

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}
.container > * {
  margin: 1em 0;
}



</style>
