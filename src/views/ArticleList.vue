<template>

  <div class="article_list_view">


    <Toolbar v-if="$store.state.user">

      
      <div class="growing_spacer"/>

      <IconButton icon="mdi-plus" v-on:buttonClicked="new_article()"/>
    </Toolbar>


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
import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    IconButton,
    ArticlePreview,
    Toolbar
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
    get_articles(category){
      this.articles_loading = true;
      this.axios.post('https://cms.maximemoreillon.com/get_article_list', {
        category: category
      })
      .then(response => {
        this.articles = response.data;
        this.articles_loading = false;
      })
      .catch(error => alert(error))
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.get_articles(to.query.category)
    next();
  },

  mounted() {
    this.get_articles(this.$route.query.category);
  },
  computed: {

  }
}
</script>


<style scoped>

.articles_container {

  /* IE fallback behavior */
  display: flex;
  flex-wrap: wrap;

  /* Normal behavior */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-gap: 10px;
  margin-top: 10px;
}



</style>
