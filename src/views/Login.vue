<template>
  <div class="about" >
    <h1>Login</h1>

    <form v-if="!$store.state.current_user" class="" @submit.prevent="login">

      <div class="">
        <label for="">Username</label>
        <input type="text" v-model="username" placeholder="username">
      </div>
      <div class="">
        <label for="">Password</label>
        <input type="password" v-model="password" placeholder="password">
      </div>

      <input type="submit" value="Login">
    </form>

    <form class="" v-else @submit.prevent="logout">
      <div class="">
        Logged in as {{$store.state.current_user.properties.display_name}}
      </div>


      <div class="">
        <input type="submit" value="Logout">

      </div>

    </form>

  </div>
</template>

<script>

export default {
  components: {

  },

  data () {
    return {
      username: '',
      password: '',
    }
  },
  mounted(){

  },
  methods: {
    login(){
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
    },
    logout(){
      this.$cookies.remove('jwt')
      this.$store.commit('check_authentication')
    }

  }



}
</script>


<style scoped>

form > * {
  margin: 0.5em 0;
}

label {
  margin-right: 0.25em; 
}

</style>
