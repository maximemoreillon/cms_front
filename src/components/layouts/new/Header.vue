<template lang="html">
  <header>

    <!-- Open/close navigation -->
    <menu-icon
      class="navigation_button"
      @click="$emit('navToggle')"/>

    <!-- Logo as link to homepage -->
    <a
      class="logo_wrapper"
      href="https://maximemoreillon.com">
      <img
        class="logo"
        src="@/assets/logo/logo.svg"
        alt="logo">
    </a>

    <!--App title -->
    <span class="title">
      Maxime Moreillon
    </span>


  </header>
</template>

<script>



export default {
  name: 'AppTemplateNHeader',
  props: {
    nav: Object,
  }
}
</script>

<!-- Not scoped because shared with nav -->
<style lang="css">





</style>
