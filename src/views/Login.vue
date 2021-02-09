<template>
  <div class="about" >
    <h1>Login</h1>
    <form v-if="true" class="" @submit.prevent="login">
      <input type="text" v-model="username" placeholder="username">
      <input type="password" v-model="password" placeholder="password">
      <input type="submit" value="Login">
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
    }

  }



}
</script>


<style scoped>




</style>
