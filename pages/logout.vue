<template>
  <div class="logout">
    <div v-if="$auth.user" class="container">
      <div class="">
        Logged in as {{ $auth.user.display_name }}
      </div>


      <button class="outlined" @click="logout()">
        <MaterialIconLogout />
        <span>Logout</span>
      </button>
    </div>

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
    }
  },

  methods: {
    
    async logout(){
      try {
        this.loading = true
        await this.$auth.logout()
        this.$router.back()
      } catch (error) {
        console.error(error)
        this.error = error
      }
      finally {
        this.loading = false
      }
      
    }

  }



}
</script>


<style scoped>

.container {
  margin-top: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1em;
}


</style>
