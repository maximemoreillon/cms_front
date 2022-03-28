<template lang="html">
  <nav :class="{open}">

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
      <span>Tags</span>

    </router-link>


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
  mounted(){
    this.$router.beforeEach((to, from, next) => {
      next()
      this.$emit('navClose')
    })
  },

  mixins: [
    IdUtils
  ],
}
</script>

<style lang="css" scoped>
nav {
  grid-area: nav;

  font-size: 110%;

  /* So that border does not go all the way down */
  align-self: start;


  background-color: white;
  border-right: 1px solid #dddddd;

  /* Content in flex column */
  display: flex;
  flex-direction: column;

  transition: transform 0.25s;
}

a {
  padding: 0.5em 1em;
  text-decoration: none;
  color: currentcolor;
  display: flex;
  align-items: center;
}

/* Ellipsis on nav items that are too long */
a > *:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Spacing between icon and label */
nav a > *:first-child {
  margin-right: 1em;
}


a:not(.logo_wrapper):hover {
  border-right: 3px solid #666666;
}

a:not(.logo_wrapper).router-link-exact-active {
  border-right: 3px solid var(--accent-color);
}



</style>
