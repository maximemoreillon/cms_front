<template lang="html">
  <nav>

    <router-link v-if="$auth.user" :to="{ name: 'articles-id-edit', params: {id: 'new'}}">
      <MaterialIconPlus />
      <span>New article</span>
    </router-link>

    <router-link :to="{ name: 'index'}">
      <MaterialIconNewspaperVariantMultipleOutline />
      <span>All articles</span>
    </router-link>

    <router-link v-if="$auth.user" :to="{ name: 'index', query: { author_id: $auth.user._id}}">
      <MaterialIconAccount />
      <span>My articles</span>
    </router-link>


    <router-link v-for="(tag, index) in $store.state.pinned_tags" :key="`nav_${index}`"
      :to="{name: 'index', query: {tag_id: tag._id} }">
      <MaterialIconTag />
      <span>{{tag.name}}</span>
    </router-link>

    <router-link :to="{ name: 'tags'}">
      <MaterialIconTagMultiple />
      <span>Tags</span>
    </router-link>

    <!-- Login / Logout -->
    <router-link :to="{ name: 'logout' }" v-if="$auth.user">
      <MaterialIconLogout />
      <span>Logout</span>
    </router-link>

    <router-link :to="{ name: 'login' }" v-else>
      <MaterialIconLogin />
      <span>Login</span>
    </router-link>


    <router-link :to="{ name: 'about' }">
      <MaterialIconInformationOutline />
      <span>About</span>
    </router-link>

    



  </nav>
</template>

<script>

export default {
  name: 'Nav',
  modules: [
    '@nuxtjs/axios',
  ],
}
</script>

<style>

/* Note: media queries in main.css */

nav {

  font-size: 1.1em;

  /* Re-applying background color for times where position fixed */
  background-color: white;

  display: flex;
  flex-direction: column;

  overflow-y: auto;

}

nav a {
  padding: 0.5em 1em;
  text-decoration: none;
  color: var(--nav-color);

  display: flex;
  align-items: stretch;
  gap: 1em;
  border-right: 3px solid transparent;

  transition:
    border-color 0.25s;
}

/* Ellipsis on nav items that are too long */
nav a>*:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


nav a:hover {
  border-right-color: #666666;
}

nav a.router-link-exact-active {
  border-right-color: var(--accent-color);
}
</style>
