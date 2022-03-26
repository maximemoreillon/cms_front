<template>
  <div class="app">

    <nav>
      <router-link :to="{ name: 'article_list' }">Articles</router-link>
    </nav>

    <main>
      <router-view />
    </main>


  </div>
</template>

<script>

import 'vue-material-design-icons/styles.css'

export default {
  name: 'App',

}
</script>

<style>

@font-face {
  font-family: lexend;
  src: url(./assets/LexendDeca-Regular.ttf);
}

.material-design-icon__svg {
  bottom: 0 !important;
}

* {
  box-sizing: border-box;
}

body {
  /* font-family: lexend, sans-serif; */
  font-family: sans-serif;
  padding: 0;
  margin: 0;
  font-size: 1.2rem;

}

.material-design-icon__svg {
  /* Override default meterial design icon behavior */
  bottom: 0 !important;
}

.app {

}

nav {
  position: fixed;

  height: 56px;
  outline: 1px solid red;
}

main {
  padding: 56px 0 0 0; /* Accounting for Nav */
  margin-left: auto;
  margin-right: auto;
  outline: 1px solid blue;
  max-width: 800px;
}

.article_content h1 {
  display: none;
}

.article_content {
  line-height: 1.5;

}

.article_content img {
  display: block; /* img default is inline */
  max-height: 50vh;
  margin: 2em auto; /* horizontal margin auto for centering */
  object-fit: contain;
  filter: drop-shadow(2.5px 2.5px 5px #44444444); /* Using filter because of object fit contain */
  cursor: pointer;
}

.article_content code {
  display: block;
  overflow-x: auto; /* Allow hoprizontal scroll */
  font-size: 0.9rem;
  padding: 1em;
  background: #282b2e;
  color: #e0e2e4;
}

</style>
