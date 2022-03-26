<template lang="html">
  <nav
    :class="{open}">

    <router-link
      v-if="$store.state.current_user"
      :to="{ name: 'article_editor', params: {article_id: 'new'}}">

      <plus-icon />
      <span>New article</span>

    </router-link>

    <router-link :to="{ name: 'articles'}">

      <newspaper-variant-multiple-outline-icon />
      <span>All articles</span>

    </router-link>

    <router-link
      v-if="$store.state.current_user"
      :to="{ name: 'articles', query: {author_id: current_user_id}}">
      <account-icon />
      <span>My articles</span>
    </router-link>


    <router-link
      v-for="(item, index) in $store.state.pinned_tags"
      v-bind:key="`nav_${index}`"
      :to="item.route">
      <tag-icon />
      <span>{{item.label}}</span>

    </router-link>

    <router-link :to="{ name: 'tags'}">

      <tag-multiple-icon />
      <span>Tag list</span>

    </router-link>

    <!--<div class="spacer" />-->

    <router-link :to="{ name: 'login' }">
      <template v-if="!$store.state.current_user">
        <login-icon />
        <span>Login</span>
      </template>
      <template v-else>
        <logout-icon />
        <span>Logout</span>
      </template>

    </router-link>


    <router-link :to="{ name: 'about' }">
      <information-outline-icon />
      <span>About</span>
    </router-link>

  </nav>
</template>

<script>
import IdUtils from '@/mixins/IdUtils'

export default {
  name: 'Nav',
  props: {
    open: Boolean
  },
  mixins: [
    IdUtils
  ],
}
</script>

<style lang="css" scoped>

nav {
  grid-area: nav;
  position: sticky;
  top: var(--header-height-desktop);
  align-self: start;

  background-color: lightblue;

  display: flex;
  flex-direction: column;
}

a {
  padding: 0.5em 1em;
  font-size: 120%;
  text-decoration: none;
  color: currentcolor;
  display: flex;
  align-items: center;
}

/* Ellipsis on nav item if too long */
a > *:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Spacign between icon and lavel */
nav a > *:not(:last-child) {
  margin-right: 1em;
}


a:hover {
  /* color: var(--accent-color); */
  /* color: #666666; */
  border-right: 3px solid #666666;
}

a.router-link-exact-active {
  border-right: 3px solid var(--accent-color);
}


@media only screen and (max-width: 800px) {

  nav {
    height: 100%;
    position: fixed;
    top: var(--header-height-mobile);
    width: var(--nav-width);
    z-index: 10;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.5s;
  }

  .open {
    transform: translateX(0);
  }

}

</style>
