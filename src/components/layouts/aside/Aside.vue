<template lang="html">
  <aside :class="{open}">

    <!-- Would be forgiven to wrap stuff other than nav in its own div-->

    <!-- Open/close navigation -->
    <menu-icon
      class="navigation_button"
      @click="$emit('navToggle')"/>

    <!-- Logo as link to homepage -->
    <a
      class="logo_wrapper"
      href="#">
      <img
        class="logo"
        src="@/assets/logo/logo.svg"
        alt="logo">
    </a>

    <!--App title -->
    <!-- <span class="title">
      Maxime Moreillon
    </span> -->

    <Nav/>




  </aside>
</template>

<script>
import Nav from './Nav.vue'

export default {
  name: 'Aside',
  components: {
    Nav,
  },
  props: {
    open: Boolean
  },
  data(){
    return {
    }
  },

}
</script>

<!-- Not scoped because shared with nav -->
<style lang="css">





</style>
