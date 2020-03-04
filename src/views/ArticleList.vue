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
        v-for="(article, i) in articles"
        v-bind:key="i"
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
    get_articles(query){

      this.articles_loading = true

      // Delete all articles
      this.articles.splice(0,this.articles.length)

      this.axios.post('http://192.168.1.2:8050/get_article_list_neo4j', query)
      .then(response => {


        response.data.forEach( record => {


          let article_node = record._fields[record._fieldLookup['article']]
          let tag_node = record._fields[record._fieldLookup['tag']]

          let found_article = this.articles.find( article => {
            return article.identity.low === article_node.identity.low
          })

          if(!found_article){
            this.articles.push(article_node)
            this.articles[this.articles.length-1].tags = []
          }

          if(tag_node){
            this.articles[this.articles.length-1].tags.push(tag_node)
          }

        });


        this.articles_loading = false;
      })
      .catch(error => {
        console.log(error)
      })

    },
  },

  beforeRouteUpdate (to, from, next) {
    this.get_articles({
      category: to.query.category,
      tags: to.query.tags
    })
    next();
  },

  mounted() {
    this.get_articles({
      category: this.$route.query.category,
      tags: this.$route.query.tags
    });
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
