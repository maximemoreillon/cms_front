<<<<<<< HEAD
<template>

  <div id="app">

    <nav>
      <img class="logo" src="@/assets/logo/logo.svg" alt="logo">
      <router-link to="/">Home</router-link>


      <!--<router-link to="/about">About</router-link>-->
      <!--<router-link v-bind:to="{ path: 'article_list', query: { category: 'project' }}">Projects</router-link>-->

      <router-link
        v-for="(category, i) in $store.state.categories" v-bind:key="i"
        v-bind:to="{ path: 'article_list', query: { category: category }}">
      {{category}}</router-link>

      <router-link to="/article_list">All</router-link>
    </nav>

    <!-- ID set for quill -->
    <main id="main">
      <router-view/>
    </main>


  </div>

</template>

<script>
export default {
  name: 'App',
  data(){
    return {
      categories: [],
    }
  },
  mounted() {
    this.$store.commit('check_authentication');
    this.$store.commit('update_categories');
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

  /*
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  */


  /* height is fixed, scrolling through main done using overflow */
  height: 100vh;

  /* layout using grid */
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

main::-webkit-scrollbar {
    width: 2px;
    background-color: #F5F5F5;
}

main::-webkit-scrollbar-thumb {
    background-color: #c00000;
}

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
  #app {
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

</style>
=======
<template>

  <div id="app">

    <nav>
      <img class="logo" src="@/assets/logo/logo.svg" alt="logo">
      <router-link to="/">Home</router-link>

      <!-- hard coded route -->
      <!--<router-link v-bind:to="{ path: 'article_list', query: { category: 'project' }}">Projects</router-link>-->

      <router-link
        v-for="(category, i) in $store.state.categories" v-bind:key="i"
        v-bind:to="{ path: 'article_list', query: { category: category }}">
      {{category}}</router-link>

      <router-link to="/article_list">All</router-link>
    </nav>

    <main>
      <router-view/>
    </main>


  </div>

</template>

<script>
export default {
  name: 'App',
  mounted() {
    this.$store.commit('check_authentication');
    this.$store.commit('update_categories');
  }
}
</script>

<style>


* {
  box-sizing: border-box;
}

/* Customize scollbar */
/*
*::-webkit-scrollbar {
    width: 2px;
    background-color: #F5F5F5;
}

*::-webkit-scrollbar-thumb {
    background-color: #c00000;
}
*/

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

  /* layout using grid */
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

  /* matches the nav margin */
  padding: 25px;
}


@keyframes logo_rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}

/* smartphone view */
@media (orientation: portrait) {
  #app {
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
    margin: 15px 0;
    width: 30px;
    height: 30px;

    /* align other items of the nav on the right */
    margin-right: auto;
  }
}

</style>
>>>>>>> 90ea92786b0efb4dd03177726c7d37bc7de8c838
