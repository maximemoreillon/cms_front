<template lang="html">
  <header>

    <!-- Would be forgiven to wrap stuff other than nav in its own div-->

    <!-- Open/close navigation -->
    <MaterialIconMenu
      class="navigation_button"
      @click="$emit('navToggle')"/>

    <!-- Logo as link to homepage -->
    <a
      class="logo_wrapper"
      href="#">
      <img
        class="logo"
        src="~/assets/images/logo/logo.svg"
        alt="logo">
    </a>




  </header>
</template>

<script>
export default {
  name: 'Header',
  components: {
  },
  props: {
    nav: Boolean
  },
  data(){
    return {
    }
  },

}
</script>

