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
          <login-icon/>
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
          <logout-icon/>
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
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import Loader from '@moreillon/vue_loader'

export default {
  name: 'Login',
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
      const url = `${process.env.VUE_APP_USER_MANAGER_API_URL}/v2/auth/login`
      const body = {username: this.username, password: this.password}
      this.axios.post(url, body)
      .then(({data}) => {

        const cookie_options = {
          secure: location.protocol === 'https:',
          samesite: 'Strict',
          expires: '1M',
        }

        this.$cookie.set('jwt',data.jwt, cookie_options)

        this.$store.commit('check_authentication')
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

      this.$cookie.delete('jwt')
      delete this.axios.defaults.headers.common['Authorization']
      this.$store.commit('check_authentication')
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
