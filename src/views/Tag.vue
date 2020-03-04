<template>
  <div class="tag_view">

    <div class="wrapper" v-if="tag">

      <div class="tag_wrapper" >
        <Tag v-bind:tag="tag"/>
      </div>

      <div class="">
        Show on navigation:
        <input
          type="checkbox"
          v-model="tag.properties.navigation_item"
          v-on:change="update_tag()">
      </div>

      <div class="articles_wrapper">
        <div class="">
          Articles with this tag:
        </div>
        <ArticlePreview
          v-for="(article, i) in articles"
          v-bind:key="i"
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
    this.get_tag();
  },
  methods: {
    get_tag(){
      if('id' in this.$route.query){
        this.loading = true;

        this.axios.post('http://192.168.1.2:8050/get_tag_neo4j', {id: this.$route.query.id})
        .then(response => {

          this.loading = false;

          let record = response.data[0]
          this.tag = record._fields[record._fieldLookup['tag']]

          this.articles.splice(0,this.articles.length)
          response.data.forEach(record => {
            let article = record._fields[record._fieldLookup['article']]
            this.articles.push(article)
          });

        })
        .catch(error => alert(error))

      }
    },

    update_tag(){
      if('id' in this.$route.query){
        this.loading = true;

        this.axios.post('http://192.168.1.2:8050/update_tag_neo4j', {
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
}



</style>
