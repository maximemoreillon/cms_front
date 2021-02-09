<template>
  <div class="about" >
    <h1>CMS</h1>
    <p>A content management system developed by Maxime MOREILLON</p>
    <p>Front-end version: {{version}}</p>
    <p v-if="back_end_version">Back-end version: {{back_end_version}}</p>
  </div>
</template>

<script>

import pjson from '../../package.json'



export default {
  components: {

  },

  data () {
    return {
      version: pjson.version,
      back_end_version: null,
    }
  },
  mounted(){    
    this.get_back_end_version()
  },
  methods: {
    get_back_end_version(){
      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/`)
      .then(response => {
        this.back_end_version = response.data.version
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
