<template>
  <div class="app">

    <Header
      @navToggle="nav = !nav"/>

    <Nav
      :open="nav"
      @navToggle="nav = !nav"
      @navClose="nav = false"/>

    <main>
      <router-view />
    </main>

    <footer>
      Maxime Moreillon
    </footer>

    <!-- Overlay when the nav is open -->
    <div
      @click="nav = false"
      class="nav_backround"
      :class="{visible: nav}"/>


  </div>
</template>

<script>


import Nav from './Nav.vue'
import Header from './Header.vue'

import 'vue-material-design-icons/styles.css'
import '@/styles/horizontalTopHeader/main.css'

export default {
  name: 'Layout',
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
/* Styles imported from external file */

</style>
