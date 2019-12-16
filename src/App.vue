<template>
  <div id="app">

    <nav>
      <router-link to="/">Home</router-link>
      <router-link to="/about">About</router-link>
      <router-link to="/article_list">Articles</router-link>
    </nav>

    <router-view/>
  </div>
</template>

<style>


* {
  box-sizing: border-box;
}

body {
  font-family: Arial,Helvetica Neue,Helvetica,sans-serif;
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

  text-decoration: none;
  color: #222222;
}
</style>
