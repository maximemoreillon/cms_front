<template>
  <div class="login" >



    <form 
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
        <input type="submit" value="Login">
        <IconButton
          @click="login()">
          <login-icon/>
          <span>Login</span>
        </IconButton>
      </div>

      
    </form>

    <form 
      class="" 
      v-if="!loading &&$store.state.current_user" 
      @submit.prevent="logout()">

      <div class="">
        Logged in as {{$store.state.current_user.properties.display_name}}
      </div>


      <div class="">
        <input type="submit" value="Logout">
        <IconButton
          @click="logout()">
          <logout-icon/>
          <span>Logout</span>
        </IconButton>
        
      </div>

    </form>

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
        if(error.response) console.error(error.response.data)
        else console.error(error)
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

form {
  margin-top: 15vh;
  display: flex;
  flex-direction: column;
  align-items: center;
}
form > * {
  margin: 1em 0;
}

label {
  margin-right: 0.5em; 
}

input[type="submit"] {
  display: none;
}

.loader_wrapper {
  margin-top: 15vh;
  text-align: center;
  font-size: 200%;
}

</style>
