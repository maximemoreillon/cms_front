<template>
  <AppTemplate/>
</template>
<script>

//import AppTemplate from '@moreillon/vue_application_template'
import AppTemplate from '@/components/template/AppTemplate.vue'

import 'vue-material-design-icons/styles.css'
import IdUtils from '@/mixins/IdUtils'


export default {
  name: 'App',
  components: {
    AppTemplate
  },
  mixins: [
    IdUtils
  ],
  data(){
    return{

    }
  },
  computed: {

  }
}
</script>

<style>

@font-face {
  font-family: lexend;
  src: url(./assets/LexendDeca-Regular.ttf);
}

.material-design-icon__svg {
  bottom: 0 !important;
}

* {
  box-sizing: border-box;
}

body {
  font-family: lexend, sans-serif;
}

nav {
  grid-area: nav;
}

main {
  grid-area: main;
  padding: 0.25em 1em;
}


main a {
  text-decoration: none;

  color: #c00000;
  font-weight: bold;
  transition: 0.25s;
}

main a:hover {
  color: #c00000;
  text-decoration: underline;
}
/* TO HERE: IS DUPLICATEDD IN LOCAL TEMPLATE */

:is(article, .editor_content) {
  line-height: 1.5;
}


.article:not(.editor_content) h1:first-child {
  display: none;
}

article img {
  cursor: pointer;
}

:is(article, .editor_content) img {
  /* test CSS for images */


  display: block;
  margin: 2em auto;

  max-width: 60%;
  max-height: 40vh;
  object-fit: contain;

}

:is(article, .editor_content) iframe {
  display: block;
  width: 80%;
  height: 30vw;
  margin: 2.5em auto;
}

:is(article, .editor_content) pre code {
  display: block;
  overflow-x: auto;
  padding: 1em;
  background: #282b2e;
  color: #e0e2e4;
}

.loader_container {
  margin: 1em;
  text-align: center;
  font-size: 300%;
}

.button {
  background-color: white;
  cursor: pointer;
  border: 1px solid #aaaaaa;
  padding: 0.25em 0.5em;
  border-radius: 0.25em;
  color: #444444;
  transition: 0.25s;
  outline: none;
}

.button:hover, .button.active {
  color: #c00000;
  border-color: #c00000;
}

.button > *:not(:last-child) {
  margin-right: 0.25em;
}

.error {
  color: #c00000;
}

</style>
