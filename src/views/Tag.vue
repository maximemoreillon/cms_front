<template>
  <div class="tag_view">

    <div class="wrapper" v-if="tag && !loading">

      <div class="tag_wrapper" >
        <Tag v-bind:tag="tag"/>

        <div class="">
          Show on navigation:
          <input
            type="checkbox"
            v-model="tag.properties.navigation_item"
            v-on:change="update_tag()">
        </div>
      </div>




      <div class="articles_container" v-if="articles.length > 0">

        <ArticlePreview
          v-for="article in articles"
          v-bind:key="article.identity.low"
          v-bind:article="article"/>
      </div>

    </div>


    <Loader v-else-if="loading"/>


  </div>
</template>

<script>



import Loader from '@/components/vue_loader/Loader.vue'
import Tag from '@/components/Tag.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'

export default {
  components: {
    Loader,
    Tag,
    ArticlePreview,
  },
  data () {
    return {
      loading: false,
      tag: null,
      articles: [],
    }
  },

  mounted() {
    this.get_tag(this.$route.query.id);
  },
  beforeRouteUpdate (to, from, next) {
    this.get_tag(to.query.id)
    next();
  },
  methods: {
    get_tag(tag_id){
      if('id' in this.$route.query){
        this.loading = true;

        this.axios.post(process.env.VUE_APP_API_URL + '/get_tag_neo4j', {id: tag_id})
        .then(response => {

          let record = response.data[0]
          this.tag = record._fields[record._fieldLookup['tag']]

          this.loading = false;

          // Get the articles of this tag
          this.axios.post(process.env.VUE_APP_API_URL + '/get_articles_of_tag', {id: this.tag.identity.low})
          .then(response => {

            this.articles.splice(0,this.articles.length)
            response.data.forEach( record => {
              let article = record._fields[record._fieldLookup['article']]
              this.articles.push(article)
            });




          })
          .catch(error => console.log(error))



        })
        .catch(error => console.log(error))

      }
    },

    update_tag(){
      if('id' in this.$route.query){
        this.loading = true;

        this.axios.post(process.env.VUE_APP_API_URL + '/update_tag_neo4j', {
          tag: this.tag
        })
        .then( () => {
          // Not very elegant
          //this.$router.go()
          this.get_tag();
          this.$store.commit('update_categories');
        })
        .catch(error => alert(error))

      }
    },
  }

}
</script>


<style scoped>

.tag_wrapper{
  margin: 10px 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #dddddd;
}

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
