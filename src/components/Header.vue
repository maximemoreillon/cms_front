<template lang="html">
  <header>

    <menu-icon
      class="navigation_button"
      @click="$emit('navToggle')"/>


    <a
      class="logo_wrapper"
      href="https://maximemoreillon.com">
      <img
        class="logo"
        src="@/assets/logo/logo.svg"
        alt="logo">
    </a>

    <!-- Necessary? -->
    <span>
      Maxime Moreillon
    </span>

  </header>
</template>

<script>



export default {
  name: 'AppTemplateNHeader',
  components: {


  },
  methods: {

  },
  computed: {

  }

}
</script>

<style lang="css" scoped>


header {
  grid-area: header;

  background-color: white;
  position: sticky;
  top: 0;
  z-index: 8;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.5em 1em;

  font-size: 150%;
  border-bottom: 1px solid #dddddd;


}

header > *+* {
  margin-left: 0.5em;
}




.logo_wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 3rem;
  width: 3rem;
  animation-name: logo_rotation;
  animation-iteration-count: infinite;
  animation-duration: 60s;
  animation-timing-function: linear;
}

@keyframes logo_rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}


.navigation_button {
  transition: opacity 0.25s;
}


</style>
