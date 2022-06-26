<template>
  <div class="logout">

    <div class="container" v-if="$auth.user">

      <div class="">
        Logged in as {{ $auth.user.display_name }}
      </div>


      <button @click="logout()" class="outlined">
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
  mounted(){

  },
  methods: {
    
    async logout(){
      await this.$auth.logout()
    }

  },
  computed: {

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
