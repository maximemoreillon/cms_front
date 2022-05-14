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

    <footer>
      Article management system - Maxime Moreillon
    </footer>

    <!-- Overlay when the nav is open -->
    <div
      @click="aside_open = false"
      class="nav_backround"
      :class="{visible: aside_open}"/>


  </div>
</template>

<script>
import Aside from './Aside.vue'
import Header from './Header.vue'


export default {
  name: 'Layout',

  components: {
    Aside,
    Header
  },
  mounted(){

    

  },
  data(){
    return {
      aside_open: false,
    }
  },
  methods: {

  }


}
</script>

<style>
/* Styles imported from external file */

</style>
