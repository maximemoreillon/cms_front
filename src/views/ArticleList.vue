<template>

  <div class="article_list_view">


    <div class="toolbar" v-if="$store.state.user">
      <div class="">Sort by: Date</div>
      <IconButton icon="mdi-plus" v-on:buttonClicked="new_article()"/>
    </div>


    <div class="articles_container" v-if="!articles_loading">

      <ArticlePreview
        v-for="article in articles"
        v-bind:key="article._id"
        v-bind:article="article"/>

    </div>

    <!-- loader -->
    <div class="loader" v-else>Loading...</div>

  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'

export default {
  components: {
    IconButton,
    ArticlePreview
  },
  data () {
    return {
      articles: [],
      articles_loading: false,
    }
  },
  methods: {
    new_article(){
      this.$router.push({ path: 'article_editor' })
    },
  },
  mounted() {
    this.articles_loading = true;
    this.axios.post('https://cms.maximemoreillon.com/get_article_list')
    .then(response => {
      this.articles = response.data;
      this.articles_loading = false;
    })
    .catch(error => alert(error))
  },
  computed: {

  }
}
</script>


<style scoped>

.toolbar {
  display: flex;
  justify-content: space-between;
}

.articles_container {
  /* IE fallback behavior */
  display: flex;
  flex-wrap: wrap;

  /* Normal behavior */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-column-gap: 10px;
}



</style>
