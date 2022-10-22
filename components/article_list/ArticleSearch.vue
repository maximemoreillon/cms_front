<template>
  <form
    class="search_wrapper"
    @submit.prevent="search()">
    <input
      ref="search"
      v-model="search_string"
      type="search"
      class="search_bar"
      placeholder="Search articles">

    <button type="submit">
      <MaterialIconMagnify />
    </button>
  </form>
</template>

<script>

export default {
  name: 'ArticleSearch',
  components: {
  },
  data(){
    return {
      search_string: '',
    }
  },
  methods: {
    search(){
      // This would better be a mixin
      const query = {...this.$route.query, search: this.search_string}
      if(this.$route.query.search === query.search) return
      if(this.search_string === '') delete query.search
      this.$router.push({name: 'index', query})
    }
  }

}
</script>

<style lang="css" scoped>

.search_wrapper {
  display: flex;
  align-items: stretch;
  gap: 0.25em;
  /* For button size */
  font-size: 120%;
}

.search_bar {
  flex-grow: 1;
}



</style>
