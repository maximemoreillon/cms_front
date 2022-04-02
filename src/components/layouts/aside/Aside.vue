<template lang="html">
  <aside :class="{open}">

    <!-- Would be forgiven to wrap stuff other than nav in its own div-->

    <!-- Open/close navigation -->
    <div class="nav_button_wrapper">
      <menu-icon
        class="navigation_button"
        @click="$emit('navToggle')"/>
    </div>


    <!-- Logo as link to homepage -->
    <a
      class="logo_wrapper"
      href="https://maximemoreillon.com">
      <img
        class="logo"
        src="@/assets/logo/logo.svg"
        alt="Maxiime Moreillon logo">
    </a>

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

<style lang="css">

</style>
