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
        alt="">
    </a>

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
  display: none;

  background-color: white;
  z-index: 8;
  grid-area: header;
  position: sticky;
  top: 0;

  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  padding: 0.25em 1em;

  font-size: 150%;
  border-bottom: 1px solid #dddddd;


}

.logo {
  height: 1.5em;
  width: 1.5em;
}



.navigation_button {
  display: none;
}



@media only screen and (max-width: 800px) {
  header {
    display: flex;
  }

  .navigation_button {
    display: inline;
    margin-right: 1em;
  }
}


</style>
