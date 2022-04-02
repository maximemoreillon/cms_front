<template>
  <div class="template_wrapper">

    <Nav
      :visible="nav_visible"
      @navToggle="nav_visible =! nav_visible"/>

    <Header @navToggle="nav_visible =! nav_visible"/>


    <main>
      <router-view />
    </main>


  </div>

</template>

<script>

import Nav from './Nav.vue'
import Header from './Header.vue'

import 'vue-material-design-icons/styles.css'


export default {
  name: 'Layout',
  components: {
    Nav,
    Header

  },
  data(){
    return {
      nav_visible: false,
    }
  },
  methods: {

  },

}
</script>

<style>

/* @font-face {
  font-family: lexend;
  src: url(../../assets/LexendDeca-Regular.ttf);
} */

.material-design-icon__svg {
  bottom: 0 !important;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  /* font-family: lexend, sans-serif; */
  font-family: sans-serif;
  height: 100vh;
}

#app {
  height: 100%;
}

.template_wrapper {

  display: grid;
  grid-template-areas:
    '. header main .'
    '. nav main .';
  grid-template-columns: 1fr auto minmax(600px, 3fr) 1fr;
  grid-template-rows: auto 1fr;

  width: 100%;
  height: 100%;
}

.template_wrapper > * {

}

header {
  grid-area: header;
}
nav {
  grid-area: nav;

}

main {
  grid-area: main;

  /* this is used to allow pre to overflow */
  min-width: 0;

  overflow-y: auto;
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

/* Scrollbar styling */
::-webkit-scrollbar {
  width: 2px;
  height: 2px;
}

::-webkit-scrollbar-track {
  margin-top: 1em;
  margin-bottom: 30vh;
  background: #dddddd;
}

::-webkit-scrollbar-thumb {
  background: #c00000;
}

/* responsivity */
@media only screen and (max-width: 800px) {
  .template_wrapper {
    grid-template-areas:
      'header'
      'main';

      grid-template-columns: 1fr;
      grid-template-rows: auto 1fr;
  }
  ::-webkit-scrollbar-track {
    margin: 0;

  }
}

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
