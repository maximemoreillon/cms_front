<template lang="html">
  <nav>
    <router-link :to="{ name: 'articles', params: {} }">Articles</router-link>
  </nav>
</template>

<script>
export default {
}
</script>

<style lang="css" scoped>
nav {
  position: fixed;
  width: var(--nav-width);
  outline: 1px solid red;
}
</style>
