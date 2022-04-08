<template lang="html">
  <form
    class="search_wrapper"
    @submit.prevent="search()">

    <input
      type="search"
      class="search_bar"
      ref="search"
      placeholder="Search articles"
      :class="{ open }"
      v-model="search_string">

    <button
      type="submit">
      <magnify-icon/>
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
      open: false,
      search_string: '',
    }
  },
  methods: {
    search(){
      if(this.open){
        // if the search bar is open, search or close

        const query = {...this.$route.query, search: this.search_string}

        if(this.search_string === '') {
          this.open = false
          delete query.search
        }

        if(this.$route.query.search === query.search) return

        this.$router.push({name: 'articles', query})

      }
      else {
        // If the search bar is closed, open it
        this.open = true
        setTimeout(() => this.$refs.search.focus(),50)
      }

    }
  }

}
</script>

<style lang="css" scoped>

.search_wrapper {
  display: flex;
  align-items: stretch;
  font-size: 120%;
}

.search_bar {
  flex-grow: 1;
  padding: 0.5em;
}

.search_bar.open {
  /* DIRTY */
  width: 20vw;
  visibility: visible;
}


</style>
