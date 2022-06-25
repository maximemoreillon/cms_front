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

<style>

header .navigation_button {
  grid-area: navButton;
  cursor: pointer;
  display: none;
}

header .title {
  grid-area: title;
}


header .logo_wrapper {

  grid-area: logo;

  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  /* outline: 1px solid red; */
  padding: 1.5em;
}

header .logo {
  width: 7.5em;
  height: 7.5em;
  animation-name: one_minute_rotation;
  animation-iteration-count: infinite;
  animation-duration: 60s;
  animation-timing-function: linear;
}

@keyframes one_minute_rotation {
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}


/* responsivity */
/* Not mobile first, I know it's bad practice */
@media only screen and (max-width: 50rem) {

  header {
    display: flex;
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
