<template lang="html">
  <nav >

    <!-- Nav is just a collection of links -->

    <!-- <router-link
      v-if="$store.state.current_user"
      :to="{ name: 'article_editor', params: {article_id: 'new'}}">

      <plus-icon />
      <span>New article</span>

    </router-link> -->

    <router-link :to="{ name: 'index'}">

      <MaterialIconNewspaperVariantMultipleOutline />
      <span>All articles</span>

    </router-link>

    <!-- <router-link
      v-if="$store.state.current_user"
      :to="{ name: 'articles', query: {author_id: current_user_id}}">
      <account-icon />
      <span>My articles</span>
    </router-link> -->


    <!-- <router-link
      v-for="({to, label}, index) in $store.state.pinned_tags"
      :key="`nav_${index}`"
      :to="to">
      <tag-icon />
      <span>{{label}}</span>
    </router-link>

    <router-link :to="{ name: 'tags'}">
      <tag-multiple-icon />
      <span>Tags</span>
    </router-link> -->

    <!-- Login / Logout -->
    <!-- <router-link :to="{ name: 'login' }">
      <template v-if="!$store.state.current_user">
        <login-icon />
        <span>Login</span>
      </template>
      <template v-else>
        <logout-icon />
        <span>Logout</span>
      </template>
    </router-link> -->



    <router-link :to="{ name: 'about' }">
      <MaterialIconInformationOutline />
      <span>About</span>
    </router-link>



  </nav>
</template>

<script>

export default {
  name: 'Nav',
  props: {
  },

}
</script>

<style lang="css" scoped>





</style>
