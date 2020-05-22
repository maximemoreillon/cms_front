<template>

  <div id="app">

    <AppTemplate
      applicationName="CMS"
      :authenticationApiUrl="authenticationApiUrl"
      :authenticationFrontUrl="authenticationFrontUrl">

      <!-- proper way to embed navigation -->
      <template v-slot:navigation>
        <router-link to="/">All articles</router-link>

        <router-link
          v-for="(item, index) in $store.state.navigation_items"
          v-bind:key="`nav_${index}`"
          :to="item.route">
          {{item.label}}
        </router-link>
      </template>

      <router-view />

    </AppTemplate>

  </div>

</template>

<script>

import AppTemplate from '@moreillon/vue_application_template'

// That is the correct way to do import styles:
import 'highlight.js/styles/obsidian.css'

export default {
  name: 'App',
  components: {
    AppTemplate
  },
  data(){
    return{
      authenticationApiUrl : process.env.VUE_APP_AUTHENTICATION_API_URL,
      authenticationFrontUrl : process.env.VUE_APP_AUTHENTICATION_FRONT_URL,
    }
  }
}
</script>

<style>

* {
  box-sizing: border-box;
}
/* Styles shared by all views */

main {
  padding: 1em 2vw;
}
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
  width: 50vw;
  height: 30vw;
}

.loader_container {
  margin: 1em;
  text-align: center;
  font-size: 300%;
}


</style>
