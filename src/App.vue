<template>
  <div class="app">

    <Header
      @navToggle="nav = !nav"/>

    <Nav
      :open="nav"
      @navToggle="nav = !nav"
      @navClose="nav = false"/>

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
  --header-height: 65px;
  --nav-width: 12em;

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

  /* TODO: Text color depends on the type */
  color: #222222;

}

.material-design-icon__svg {
  /* Override default meterial design icon behavior */
  bottom: 0 !important;
}

.app {
  display: grid;
  grid-template-areas:
    'header header header header'
    '. nav main .';
  grid-template-columns: 1fr var(--nav-width) minmax(0, 50rem) 1fr;
  grid-template-rows: var(--header-height) 1fr;
  grid-gap: 1rem;

  /* WARNING: Gap will be present even if nav is not visible */


}


main {
  grid-area: main;
  outline: 1px solid red;
}

nav {
  grid-area: nav;

  /* So that border does not go all the way down */
  align-self: start;


  background-color: white;
  border-right: 1px solid #dddddd;

  /* Content in flex column */
  display: flex;
  flex-direction: column;

  transition: transform 0.25s;
}


.nav_backround {
  display: block;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9;

  background-color: #44444444;

  visibility: hidden;
  opacity: 0;

  transition:
    visibility 0.5s,
    opacity 0.5s;

}

.loader_container {
  margin: 1em;
  text-align: center;
  font-size: 300%;
}


/* WARNING: Affects stuff like the edit button */
main a {
  text-decoration: none;

  color: var(--accent-color);
  font-weight: bold;
  transition: 0.25s;
}

/* responsivity */
@media only screen and (max-width: 50rem) {

  .nav_backround.visible {
    visibility: visible;
    opacity: 1;
  }

  .app {
    grid-template-areas:
      'header header header'
      '. main .'
      '. nav .';

    grid-template-columns: 0 1fr 0;
  }

  nav {
    /* PROBLEM: top needs to be positioned below the header */
    position: fixed;
    top: var(--header-height);
    width: var(--nav-width);
    z-index: 10;
    height: 100%;
    transform: translateX(-100%);
  }

  nav.open {
    transform: translateX(0%);
  }

  header .navigation_button {
    opacity: 1;
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

.article_content pre code {
  display: block;
  overflow-x: auto; /* Allow horizontal scroll */
  font-size: 90%;
  padding: 1em;
  background: #282b2e;
  color: #e0e2e4;
}

.spacer {
  flex-grow: 1;
}

</style>
