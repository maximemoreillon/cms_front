<template lang="html">
  <nav
    :class="{open}">

    <div class="close_wrapper">
      <close-icon
        class="navigation_button"
        @click="$emit('navToggle')"/>
    </div>



    <a
      class="logo_wrapper"
      href="https://maximemoreillon.com">
      <img
        class="logo"
        src="@/assets/logo/logo.svg"
        alt="">
    </a>

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
  top: var(--header-margin);
  align-self: start;

  background-color: white;

  display: flex;
  flex-direction: column;
  border-right: 1px solid #dddddd;
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


a:not(.logo_wrapper):hover {
  /* color: var(--accent-color); */
  /* color: #666666; */
  border-right: 3px solid #666666;
}

a:not(.logo_wrapper).router-link-exact-active {
  border-right: 3px solid var(--accent-color);
}

.close_wrapper{
  height: var(--header-height-mobile);
  display: none;
  align-items: center;
  padding: 0.25em 1em;
  font-size: 150%;
}


@media only screen and (max-width: 800px) {

  .close_wrapper {
    display: flex;
  }

  nav {
    height: 100%;
    position: fixed;
    top: 0;
    /* top: var(--header-height-mobile); */
    width: var(--nav-width);
    z-index: 10;
    left: 0;
    transform: translateX(-100%);
    transition: transform 0.5s;
    border: none;
  }

  .open {
    transform: translateX(0);
  }

}

</style>
