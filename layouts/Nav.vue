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


    <router-link
      v-for="(tag, index) in tags"
      :key="`nav_${index}`"
      :to="{name: 'index', query: {tag_id: tag._id} }">
      <MaterialIconTag />
      <span>{{tag.name}}</span>
    </router-link>

    <router-link :to="{ name: 'tags'}">
      <MaterialIconTagMultiple />
      <span>Tags</span>
    </router-link>

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
  modules: [
    '@nuxtjs/axios',
  ],

  axios: {
    // proxy: true
  },
  data(){
    return {
      tags: []
    }
  },

  async fetch (){
    // Async data only allowed for pages
    const api_url = 'https://api.cms.maximemoreillon.com'
    const url = `${api_url}/v1/tags/`
    const params = { pinned: true }

    const {data} = await this.$axios.get(url, {params})

    this.tags = data



  },


}
</script>

<style lang="css" scoped>





</style>
