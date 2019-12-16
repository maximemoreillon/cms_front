<template>

  <div class="article_list_view">


    <div class="toolbar" v-if="$store.state.user && false">
      <IconButton icon="mdi-plus" v-on:buttonClicked="new_article()"/>
    </div>


    <div class="articles_container" v-if="!articles_loading">

      <div class="add_button_container" v-on:click="new_article()">
        <IconButton icon="mdi-plus" />
      </div>

      <ArticlePreview
        v-for="article in filtered_articles"
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
    filtered_articles(){
      // Shows only published articles to unauthenticated users
      if(this.$store.state.user) return this.articles;
      else return this.articles.filter(article => article.published)
    }
  }
}
</script>


<style scoped>

.toolbar {
  text-align: center;
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



.add_button_container {
  position: relative;
  margin: 10px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-basis: 300px;

  cursor: pointer;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}


</style>
