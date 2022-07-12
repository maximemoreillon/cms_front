<template>
  <div class="login">
    <form v-if="!loading" class="container" @submit.prevent="login()">
      <div class="">
        <label for="username">
          Username
        </label>
        <input id="username" v-model="credentials.username" type="text" placeholder="Username">
      </div>

      <div class="">
        <label for="password">
          Password
        </label>
        <input id="password" v-model="credentials.password" type="password" placeholder="Password">
      </div>

      <div>
        <button type="submit" class="outlined" @click="login()">
          <MaterialIconLogin />
          <span>Login</span>
        </button>
      </div>

      <div v-if="error" class="error_message">
        {{ error }}
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
