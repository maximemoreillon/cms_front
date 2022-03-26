<template>
  <div class="app">

    <!-- Wrapping because Nav is fixed -->
    <div class="nav_wrapper">
      <Nav/>
    </div>



    <main>
      <router-view />
    </main>


  </div>
</template>

<script>

import 'vue-material-design-icons/styles.css'
import Nav from '@/components/Nav.vue'

export default {
  name: 'App',
  components: {
    Nav,
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
  --nav-width: 10em;
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
  display: grid;
  grid-template-areas:
    '. nav main .';
  grid-template-columns: 1fr var(--nav-width) minmax(0, 800px) 1fr;
  grid-gap: 1em;
}

.nav_wrapper {
  grid-area: nav;
  outline: 1px solid green;
}



main {
  grid-area: main;
  outline: 1px solid blue;
}

/*
  Article related stuff
  Writen here because sometiems shared between editor and article itself
  Sometimes inaccessible from Article because scoped
*/

/* TODO: Also apply to editor */


/* Hide H1 of article because displayed separately */
.article_content h1 {
  display: none;
}

/* Could maybe benefitt from being whole article */
.article_content {
  line-height: 1.5;
}

.article_content :is(img, iframe) {
  display: block; /* img, iframe default is inline */
  margin: 2em auto; /* horizontal margin auto for centering */
  width: 80%;
  filter: drop-shadow(2.5px 2.5px 5px #44444444); /* Using filter because of object fit contain */

}

.article_content img {
  max-height: 50vh;
  object-fit: contain;
  cursor: pointer;
}

.article_content iframe {
  aspect-ratio: 3/2; /* This is super useful */
}




.article_content code {
  display: block;
  overflow-x: auto; /* Allow hoprizontal scroll */
  font-size: 0.9rem;
  padding: 1em;
  background: #282b2e;
  color: #e0e2e4;
}

</style>
