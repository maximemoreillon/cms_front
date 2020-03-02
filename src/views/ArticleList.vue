<template>

  <div class="article_list_view">


    <Toolbar >


      <div class="growing_spacer"/>

      <IconButton
        v-if="$store.state.logged_in"
        v-on:buttonClicked="new_article()">
        <plus-icon/>
      </IconButton>

    </Toolbar>


    <div class="articles_container" v-if="!articles_loading">


      <ArticlePreview
        v-for="article in articles"
        v-bind:key="article._id"
        v-bind:article="article"/>



    </div>

    <!-- loader -->
    <Loader v-else/>

  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Toolbar from '@/components/Toolbar.vue'
import Loader from '@/components/vue_loader/Loader.vue'

// icons
import PlusIcon from 'vue-material-design-icons/Plus.vue';



export default {
  components: {
    IconButton,
    ArticlePreview,
    Toolbar,
    Loader,

    // icons
    PlusIcon,
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
      this.articles.splice(0,this.articles.length)
      this.axios.post('https://cms.maximemoreillon.com/get_article_list', {
        category: category
      })
      .then(response => {
        this.articles.splice(0,this.articles.length);

        for (var article of response.data) {
          this.articles.push(article)
        }

        this.articles_loading = false;
      })
      .catch(error => {
        console.log(error.response.data)
        alert(error.response.data)
      })
    },
  },
  beforeRouteUpdate (to, from, next) {
    this.get_articles(to.query.category)
    next();
  },

  mounted() {
    this.get_articles(this.$route.query.category);
  },
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
}



</style>
