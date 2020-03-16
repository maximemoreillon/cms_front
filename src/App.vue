<template>

  <div id="app">

    <AppTemplate
      v-bind:navigation="$store.state.navigation_items"
      applicationName="CMS"/>

  </div>

</template>

<script>
//import AppTemplate from '@moreillon/vue_application_template'

// That is the correct way to do import styles:
import 'highlight.js/styles/obsidian.css'
//import AppTemplate from '@/components/AppTemplate.vue'
import AppTemplate from '@moreillon/vue_application_template'

export default {
  name: 'App',
  components: {
    AppTemplate
  },

  mounted() {
    this.$store.commit('check_authentication');
    this.$store.commit('update_categories');
  }


}
</script>

<style>

* {
  box-sizing: border-box;
}
/* Styles shared by all views */

main a {
  font-weight: bold;
  text-decoration: none;
  color: #c00000;
}

article img {
  /* test CSS for images */


  display: block;
  margin-left: auto;
  margin-right: auto;
  cursor: pointer;

  width: 60%;
  max-height: 40vh;
  object-fit: contain;

}

article iframe {
  display: block;
  margin-left: auto;
  margin-right: auto;
}



</style>
