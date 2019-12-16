<template>

  <div id="app">

    <header>
      Header
    </header>

    <nav>
      <img class="logo" src="@/assets/logo/logo.svg" alt="logo">
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/article_list">Articles</router-link>
      <span
        class="mdi"
        v-on:click="$store.commit('toggle_auth')"
        v-bind:class="$store.state.user ? 'mdi-logout' : 'mdi-login'"/>
    </nav>



    <main>
      <router-view/>
    </main>


    <footer>

    </footer>

  </div>

</template>

<script>
export default {
  name: 'App',
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

  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;

  height: 100vh;

  /* layout using grid */
  display: grid;
  grid-template-areas:
    'nav main'
    'nav footer';
  grid-template-columns: auto 1fr;
  grid-template-rows: 1fr auto;
  grid-gap: 0 25px;
}

nav {
  margin: 15px 0;
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

  margin: 15px;

  /* animation */
  animation-name: logo_rotation;
  animation-duration: 60s;
  animation-timing-function: linear;
  animation-iteration-count: infinite;
}

nav a {

  font-size: 150%;

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
  color: #666666;
}

nav a.router-link-exact-active {
  border-right: 3px solid #c00000;
}

main {
  grid-area: main;
  display: block; /* IE fix */
}

footer{
  grid-area: footer;
  text-align: center;
}



@keyframes logo_rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>
