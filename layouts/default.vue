<template>
  <div class="app">

    <Header
      @navToggle="aside_open = !aside_open" />

    <!-- NAV management is a bit tedious -->
    <Aside
      :open="aside_open"
      @navToggle="aside_open = !aside_open" />

    <main>
      <router-view />
    </main>

    <!-- Footer not displayed at the moment -->
    <footer>
      Article management system - Maxime Moreillon
    </footer>

    <!-- Overlay when the nav is open -->
    <!-- TODO: Try to put in NAV -->
    <div
      @click="aside_open = false"
      class="nav_backround"
      :class="{visible: aside_open}"/>


  </div>
</template>

<script>
import Aside from '~/components/layout/Aside.vue'
import Header from '~/components/layout/Header.vue'


export default {
  name: 'Layout',
  components: {
    Aside,
    Header
  },
  data(){
    return {
      aside_open: false,
    }
  },
}
</script>

<style>



/* @font-face {
  font-family: lexend;
  src: url(./assets/LexendDeca-Regular.ttf);
} */




.app {

  /* Spacing  (padding) achieved using grid */
  min-height: 100vh;

  display: grid;
  grid-template-areas:
    '. . . .'
    '. aside main .'
    /* '. footer footer .' */
    /* '. . . .' */
  ;
  grid-template-columns: 1fr var(--aside-width) minmax(auto, var(--main-max-width)) 1fr;
  grid-template-rows:
    0 1fr
    /* auto */
  ;
  grid-gap: var(--grid-gap);




}

header {
  grid-area: header;
  display: none;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 8;

  font-size: 1.5rem;

  border: none;
  border-bottom: 1px solid var(--border-color);

  padding: 0.25em 0.5em;
}




main {
  grid-area: main;

  /* If not set like that, pre code overflows */
  /* This is absolute horseshit */
  overflow-x: auto;

  /* Debug */
  /* background-color: lightgreen; */


}

/* WARNING: Affects stuff like the edit button */
main a {
  text-decoration: none;
  color: var(--accent-color);
  font-weight: bold;
}

footer {
  grid-area: footer;


  border-top: 1px solid var(--border-color);
  padding: var(--grid-gap);

  display: flex;
  justify-content: center;

  display: none;
}


::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: #c00000;
}


/* responsivity */
/* Not mobile first, I know it's bad practice */
@media only screen and (max-width: 50rem) {

  .nav_backround {

    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;

    background-color: #00000044;

    visibility: hidden;
    opacity: 0;

    transition:
      visibility 0.5s,
      opacity 0.5s;

  }

  .nav_backround.visible {
    visibility: visible;
    opacity: 1;
  }

  .app {
    /* Outer columns to zero because gap is enough */
    /* Aside outside the flow so omitted from grid*/
    grid-template-columns: 0 1fr 0;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      'header header header'
      /* '. . .' */
      '. main .'
      '. footer .'
      '. . .';
  }

  header {
    display: flex;
  }


  aside {
    font-size: 1.2rem;
    position: fixed;
    left: 0;
    top: 0;

    height: 100%;
    width: var(--nav-width);

    transform: translateX(-100%);
    border: none;

    filter: drop-shadow(0em 0em 0.25em #44444444);
  }

  aside.open {
    transform: translateX(0%);
  }

  aside .nav_button_wrapper {
    /* display: flex; */
  }

  header .navigation_button {
    display: block;
    margin-right: 1em;
  }

  header .logo_wrapper {
    padding: 0;

  }

  header .logo {
    height: 1.75em;
    width: 1.75em;
  }

}
</style>
