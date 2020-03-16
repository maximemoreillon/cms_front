<template>
  <div class="template">
    <nav>
      <img class="logo" src="@/assets/logo/logo.svg" alt="logo">
      <router-link
        v-for="(navigationItem, index) in navigation"
        v-bind:key="index"
        v-bind:to="navigationItem.route">

        <!-- Why have the onclick here? -->
        <!-- Why have the icon and the text in the same span? -->
        <span
          class="mdi"
          v-bind:class="'mdi-' + navigationItem.icon">
          {{navigationItem.label}}
        </span>

      </router-link>


    </nav>

    <main>
      <router-view/>
    </main>


  </div>
</template>

<script>



export default {
  name: 'Template',
  props: {
    navigation: {
      type: Array,
    }
  }


}
</script>

<style>

* {
  box-sizing: border-box;
}

body {
  /* default override */
  margin: 0;

  /* font parameters */
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #222222;


}

#app {

  /* height is fixed, scrolling through main done using overflow */
  height: 100vh;


}

.template {
  /* layout using grid */
  height: 100%;
  display: grid;
  grid-template-areas:
    'nav main';
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr;
}

nav {
  margin: 25px 0;
  grid-area: nav;
  display: flex;
  flex-direction: column;
  align-items: stretch;

  border-right: 1px solid #dddddd;
}

header {
  grid-area: header;
  display: none;
}

.logo {
  width: 100px;

  margin: 25px;
  margin-top: 0;

  /* animation */
  animation-name: logo_rotation;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

nav a {

  font-size: 135%;

  display: flex;
  justify-content: center;

  padding: 10px;

  text-decoration: none;
  color: #222222;

  /* active marker */
  border-right: 3px solid transparent;
  transition: color 0.25s, border-color 0.25s;
}

/* to be removed in the future */
nav span {
  text-align: center;
}

nav a:hover {
  border-right: 3px solid #666666;
}

nav a.router-link-exact-active {
  border-right: 3px solid #c00000;
}

main {
  grid-area: main;
  display: block; /* IE fix */

  /* height is set with grid */
  overflow-y: auto;

  /* not ideal */
  /* matches the nav margin */
  padding: 25px;
}

/* scroll bars */
main::-webkit-scrollbar {
    width: 2px;
    background-color: #F5F5F5;
}

main::-webkit-scrollbar-thumb {
    background-color: #c00000;
}


/* TEMPORARY */
/*
main pre {
  background-color: #222222;
  color: white;
}
*/


footer{
  grid-area: footer;
  text-align: center;
  display: none;
}


@keyframes logo_rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}


@media (orientation: portrait) {
  .template {
    margin: 0;
    grid-template-areas:
      'nav'
      'main';
    grid-template-columns: 1fr;
    grid-template-rows: auto 1fr;
  }

  nav {
    margin: 0 25px;
    flex-direction: row;
    align-items: stretch;
    border: none;
    border-bottom: 1px solid #dddddd;
  }

  nav a {
    display: flex;
    align-items: center;
    border: none;
    border-bottom: 3px solid transparent;
  }

  nav a:hover {
    border: none;
    border-bottom: 3px solid #666666;
  }

  nav a.router-link-exact-active {
    border: none;
    border-bottom: 3px solid #c00000;
  }

  .logo {
    margin: 25px 0;
    width: 30px;
    height: 30px;
    margin-right: auto;
  }
}

.version_info{
  margin-top: auto;
  text-align: center;
  color: #444444;
  font-size: 75%;
}

/* END OF TEMPLATING STUFF */


.icon_button {
  border: none;
  outline: none; /* remove theblue halo when clicking */
  background-color: transparent;
  position: relative;
  cursor: pointer;

  transition: color 0.25s;
  color: #444444;

  display: inline-flex;
  justify-content: center;
  align-items: center;
}


.icon_button:hover {
  color: #802020;
}

.icon_button.active {
  color: #c00000;
}

</style>
