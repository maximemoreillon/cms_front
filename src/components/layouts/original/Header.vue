<template>
  <header>

    <a class="logo_wrapper" href="https://maximemoreillon.com">
      <img class="logo" src="@/assets/logo/logo.svg" alt="">
    </a>


    <!--
    <div class="title">
      Articles
    </div>
    -->

    <menu-icon
      class="navigation_button"
      @click="$emit('navToggle')"/>




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

<style>

header {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 0.5em;

  font-size: 150%;
}

.title {
  margin-top: 0.5em;
  font-size: 120%;
  font-weight: bold;
}
.logo_wrapper {
  display: flex;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 100px;
  animation-name: logo_rotation;
  animation-iteration-count: infinite;
  animation-duration: 60s;
  animation-timing-function: linear;
}

header .navigation_button {
  display: none;
}

@keyframes logo_rotation {
  from {transform: rotate(0deg);}
  to {transform: rotate(360deg);}
}

@media only screen and (max-width: 800px) {
  header {
    flex-direction: row;
    padding: 0.25em 1em;
    justify-content: flex-start;
    border-bottom: 1px solid #dddddd;
  }
  .logo {
    height: 1.5em;
    width: 1.5em;
  }
  header .navigation_button {
    margin-left: auto;
    display: inline;
    cursor: pointer
  }
}


</style>
