<template>
  <div class="template_wrapper">

    <AppTemplateNav
      :visible="nav_visible"
      @navToggle="nav_visible =! nav_visible"/>

    <AppTemplateHeader @navToggle="nav_visible =! nav_visible"/>


    <main>
      <router-view />
    </main>


  </div>

</template>

<script>

import AppTemplateNav from '@/components/template/AppTemplateNav.vue'
import AppTemplateHeader from '@/components/template/AppTemplateHeader.vue'

import 'vue-material-design-icons/styles.css'


export default {
  name: 'AppTemplate',
  components: {
    AppTemplateNav,
    AppTemplateHeader

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

@font-face {
  font-family: lexend;
  src: url(../../assets/LexendDeca-Regular.ttf);
}

.material-design-icon__svg {
  bottom: 0 !important;
}

* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: lexend, sans-serif;
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


</style>
