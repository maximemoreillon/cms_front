<template>
  <div class="login" >



    <form
      class="container"
      v-if="!loading && !$store.state.current_user"
      @submit.prevent="login()">

      <div class="">
        <label for="">Username</label>
        <input type="text" v-model="username" placeholder="username">
      </div>
      <div class="">
        <label for="">Password</label>
        <input type="password" v-model="password" placeholder="password">
      </div>


      <div>
        <IconButton
          type="submit"
          @click="login()">
          <login-icon/>
          <span>Login</span>
        </IconButton>
      </div>

      <div class="error_message" v-if="error">
        {{error}}
      </div>


    </form>

    <div
      class="container"
      v-if="!loading &&$store.state.current_user">

      <div class="">
        Logged in as {{$store.state.current_user.properties.display_name}}
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
      class="loader_wrapper">
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
      const url = `${process.env.VUE_APP_AUTHENTICATION_API_URL}/login`
      const body = {username: this.username, password: this.password}
      this.axios.post(url, body)
      .then(response => {
        this.$cookies.set('jwt', response.data.jwt)
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
      .finally(() => {this.loading = false})
    },
    logout(){
      this.$cookies.remove('jwt')
      this.$store.commit('check_authentication')
    }

  }



}
</script>


<style scoped>

.container {
  margin-top: 15vh;
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


.loader_wrapper {
  margin-top: 15vh;
  text-align: center;
  font-size: 200%;
}

.error_message {
  color: #c00000;
}

</style>
