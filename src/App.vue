<template>
  <div class="app">

    <Header @navToggle="nav = !nav"/>

    <Nav
      :open="nav"
      @navToggle="nav = !nav"/>

    <div
      @click="nav = !nav"
      class="nav_backround"
      :class="{visible: nav}"/>


    <main>
      <router-view />
    </main>


  </div>
</template>

<script>

import 'vue-material-design-icons/styles.css'
import Nav from '@/components/Nav.vue'
import Header from '@/components/Header.vue'

export default {
  name: 'App',
  components: {
    Nav,
    Header
  },
  data(){
    return {
      nav: false,
    }
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

:root {
  /* Sizes */

  --nav-width: 12em;
  --header-margin: 1em;
  --header-height-desktop: 200px;
  --header-height-mobile: 56px;
  /* Colors */
  --accent-color:#c00000;
}


html {
  /* Keep the scrollbar visible at all time */
  overflow-y: scroll;
}

* {
  box-sizing: border-box;
}

body {
  /* font-family: lexend, sans-serif; */
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;

}

.material-design-icon__svg {
  /* Override default meterial design icon behavior */
  bottom: 0 !important;
}

.app {
  /* Needed because otherwise nav jumping when page empty */
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    '. nav main .';
  grid-template-columns: 1fr var(--nav-width) minmax(0, 800px) 1fr;
  /* I don't get this */
  /* grid-template-rows: var(--header-height-desktop) auto; */
  /* grid-gap: 1em; */
}


main {
  grid-area: main;
  padding: 0 1em;
  align-self: start;
}

/* Logo related */
@keyframes logo_rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}

.logo_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 5em;
  animation-name: logo_rotation;
  animation-iteration-count: infinite;
  animation-duration: 60s;
  animation-timing-function: linear;
}

.navigation_button{
  cursor: pointer;
}
.nav_backround {
  display: none;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #44444444;
}

.nav_backround.visible {
  display: block;
}

/* responsivity */
@media only screen and (max-width: 800px) {

  body {
    font-size: 1rem;
  }
  .app {
    /* Nav becomes absolutely positioned so anywhere is fine */
    grid-template-areas:
      'header'
      'main'
      'nav';

      /* all horizontal space */
      grid-template-columns: 1fr;
      grid-template-rows: var(--header-height-mobile) 1fr;

  }
}



/*
  Article related stuff
  Writen here because sometiems shared between editor and article itself
  Sometimes inaccessible from Article because scoped
*/

/* TODO: Also apply to editor */

/* Hide H1 of article because displayed separately */
.article_content:not(.editor_content) h1 {
  display: none;
}

.article_content {
  line-height: 1.5;
}

.article_content :is(img, iframe) {
  display: block; /* img, iframe default is inline */
  margin: 2em auto; /* horizontal margin auto for centering */
  max-width: 80%;
  filter: drop-shadow(2.5px 2.5px 5px #44444444); /* Using filter because of object fit contain */

}

.article_content img {
  max-height: 50vh;
  object-fit: contain;
  cursor: pointer;
}

.article_content iframe {
  width: 80%;
  aspect-ratio: 3/2; /* This is super useful */
}

.article_content code {
  display: block;
  overflow-x: auto; /* Allow hoprizontal scroll */
  font-size: 90%;
  padding: 1em;
  background: #282b2e;
  color: #e0e2e4;
}

.article_content a {
  text-decoration: none;

  color: var(--accent-color);
  font-weight: bold;
  transition: 0.25s;
}

</style>
