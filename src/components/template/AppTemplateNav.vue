<template>
  <nav
    :class="{visible: visible}"
    @click="$emit('navToggle')">

    <router-link
      v-if="$store.state.current_user"
      :to="{ name: 'article_editor', params: {article_id: 'new'}}">

      <plus-icon />
      <span>New article</span>

    </router-link>

    <router-link :to="{ name: 'article_list'}">

      <newspaper-variant-multiple-outline-icon />
      <span>All articles</span>

    </router-link>

    <router-link
      v-if="$store.state.current_user"
      :to="{ name: 'article_list', query: {author_id: current_user_id}}">
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
  name: 'AppTemplateNav',
  props: {
    visible: Boolean,
  },
  mixins: [
    IdUtils
  ],
  components: {


  },
  methods: {

  },
  computed: {

  }

}
</script>

<style>

nav {
  //border-right: 1px solid #dddddd;
}

nav a {
  padding: 0.5em 1em;
  font-size: 120%;
  text-decoration: none;
  color: currentcolor;
  display: flex;
  align-items: center;
}

nav a  > *:first-child {
  //flex-basis: 2em;
}

nav a > *:last-child {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

nav a > *:not(:last-child) {
  margin-right: 1em;
}


nav a:hover {
  color: #c00000;
}


.spacer {
  height: 3em;
}

@media only screen and (max-width: 800px) {
  nav {
    position: fixed;
    right: 0;
    top: 3em;
    background-color: white;
    z-index: 100;
    border: 1px solid #dddddd;
    transform: translateX(200%);
    transition: 0.25s;
  }
  nav.visible {
    transform: translateX(0);
  }
}


</style>
