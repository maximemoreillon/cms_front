<template>
  <div id="app">

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/article_list">Article list</router-link>
      <router-link to="/article_editor">Article editor</router-link>
      <!--<router-link to="/article">Article</router-link>-->
    </nav>

    <router-view/>
  </div>
</template>

<style>

* {
  box-sizing: border-box;
}

body {
  margin: 0;
}

nav {
  display: flex;
}

nav a {
  flex-grow: 1;
  flex-basis: 0;

  display: flex;
  justify-content: center;

  padding: 10px;
}
</style>
