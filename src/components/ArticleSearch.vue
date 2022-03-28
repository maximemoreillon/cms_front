<template lang="html">
  <form class="search_wrapper" @submit.prevent="search()">
    <input
      type="search"
      class="search_bar"
      ref="search"
      :class="{search_bar_open}"
      v-model="search_string">

    <input type="submit" style="display:none;">

    <IconButton
      v-on:click="search()">
      <magnify-icon/>
    </IconButton>

  </form>
</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  name: 'ArticleSearch',
  components: {
    IconButton,
  },
  data(){
    return {
      search_bar_open: false,
      search_string: '',
    }
  },
  methods: {
    search(){
      if(this.search_bar_open){
        // if the search bar is open, search or close

        // This check does nto accoutn for wehn search is '' and query is undefined
        if(this.search_string === this.$route.query.search) return

        const query = {...this.$route.query, search: this.search_string}

        if(this.search_string === '') {
          this.search_bar_open = false
          delete query.search
        }

        this.$router.push({name: 'articles', query})

      }
      else {
        // If the search bar is closed, open it
        this.search_bar_open = true
        setTimeout(() => this.$refs.search.focus(),50)
      }

    }
  }

}
</script>

<style lang="css" scoped>
.search_bar {
  transition: 0.25s;
  width: 0;
  visibility: hidden;
}

.search_bar.search_bar_open {
  width: 20vw;
  visibility: visible;
}

.search_wrapper {
  display: flex;
  align-items: stretch;
}
</style>
