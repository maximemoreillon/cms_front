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

    <span class="title">
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

<!-- Not scoped because shared with nav -->
<style lang="css">


header {
  grid-area: header;

  background-color: white;

  display: flex;
  flex-direction: row;
  align-items: center;

  padding: 0.5em 1em;

  font-size: 150%;
  border-bottom: 1px solid #dddddd;

  position: sticky;
  height: var(--header-height);
  left: 0;
  top: 0;
  right: 0;
  z-index: 11;

}

header > *+* {
  margin-left: 0.5em;
}




.logo_wrapper {
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo {
  height: 2.5rem;
  width: 2.5rem;
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
  cursor: pointer;
  display: none;
}

.title {
  grid-area: title;
}


</style>
