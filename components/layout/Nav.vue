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
  data(){
    return {
    }
  },
  mounted(){


    

  },
  methods: {

  },

  async fetch (){

  },


}
</script>

<style lang="css" scoped>





</style>
