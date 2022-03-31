<template>
  <div class="app">
    
    <!-- NAV management is a bit tedious -->
    <Header
      :nav="nav"
      @navToggle="nav = !nav"/>

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
import Header from './Header.vue'

import 'vue-material-design-icons/styles.css'
import '@/styles/verticalHeader/main.css'

export default {
  name: 'Layout',
  components: {
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
