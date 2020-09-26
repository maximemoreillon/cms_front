<template>
  <div class="about" >
    <h1>CMS</h1>
    <p>A content management system developed by Maxime MOREILLON</p>
    <p>Version: {{version}}</p>
  </div>
</template>

<script>

import pjson from '../../package.json'



export default {
  components: {

  },

  data () {
    return {
      version: pjson.version
    }
  },



}
</script>


<style scoped>




</style>
