<template>

  <div id="app">

    <AppTemplate
      applicationName="Knowledge base">

      <!-- proper way to embed navigation -->
      <template v-slot:navigation>

        <router-link
          v-if="$store.state.current_user"
          :to="{ name: 'article_editor', params: {article_id: 'new'}}">
          New article
        </router-link>

        <router-link :to="{ name: 'article_list'}">
          All articles
        </router-link>

        <router-link
        v-if="$store.state.current_user"
        :to="{ name: 'article_list', query: {author_id: current_user_id}}">
          My articles
        </router-link>


        <router-link
          v-for="(item, index) in $store.state.pinned_tags"
          v-bind:key="`nav_${index}`"
          :to="item.route">
          {{item.label}}
        </router-link>

        <router-link :to="{ name: 'about', params: {} }">
          About
        </router-link>

      </template>

      <router-view />

    </AppTemplate>

  </div>

</template>

<script>

import AppTemplate from '@moreillon/vue_application_template'

import 'vue-material-design-icons/styles.css'


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
  },
  computed: {
    current_user_id(){
      const current_user = this.$store.state.current_user
      return current_user.identity.low || current_user.identity
    }
  }
}
</script>

<style>

.material-design-icon__svg {
  bottom: 0 !important;
}

* {
  box-sizing: border-box;
}
/* Styles shared by all views */

main {
  padding: 1em 2vw;
}

main a {
  text-decoration: none;
}

.article a {
  text-decoration: underline;
  color: currentColor;
  transition: 0.25s;
}

.article a:hover {
  color: #c00000;
}

.article:not(.editor_content) h1:first-child {
  display: none;
}

.article img {
  /* test CSS for images */


  display: block;
  margin: 2em auto;
  cursor: pointer;

  max-width: 60%;
  max-height: 40vh;
  object-fit: contain;

}

.article iframe {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50vw;
  height: 30vw;
}

.article pre code {
  /* manually applying style because tiptap doesn't apply the hljs class to code */
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #282b2e;
  color: #e0e2e4;
}

.loader_container {
  margin: 1em;
  text-align: center;
  font-size: 300%;
}

.error {
  color: #c00000;
}

</style>
