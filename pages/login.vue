<template>
  <div class="wrapper">

    <client-only>
      <form v-if="!loading" class="container" @submit.prevent="login()">

        <div>
          <MaterialIconAccount />
          <input id="username" v-model="credentials.username" type="text" placeholder="Username">
        </div>

        <div>
          <MaterialIconKey />
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
    </client-only>
    
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
        this.loading = true
        await this.$auth.loginWith('local', { data: this.credentials })
        this.$router.back()
      } 
      catch (error) {
        this.error = error
        console.error(error)
      }
      finally {
        this.loading = false
      }
    },

  },




}
</script>


<style scoped>

.container {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5em;
}

.container > div {
  display: flex;
  gap: 0.5em;
}
</style>
