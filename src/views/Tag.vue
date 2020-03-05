<template>
  <div class="tag_view">

    <!-- Wrapper to show loading -->
    <div class="wrapper" v-if="tag && !loading">

      <!-- basically a toolbar -->
      <div class="tag_wrapper" >
        <Tag v-bind:tag="tag"/>

        <!-- Option to show on navigation -->


        <IconButton
          v-if="$store.state.logged_in"
          v-on:click="prompt_for_rename()">
          <pencil-icon/>
        </IconButton>

        <IconButton
          v-if="$store.state.logged_in"
          v-on:click="delete_tag()">
          <delete-icon />
        </IconButton>

        <IconButton
          v-if="$store.state.logged_in"
          v-bind:active="tag.properties.navigation_item"
          v-on:click="toggle_navigation_item()">
          <pin-icon />
        </IconButton>

      </div>






    </div>


    <Loader v-else-if="loading"/>

    <div class="" v-else>
      Tag not found
    </div>


    <!-- Articles are retrived separately -->
    <div class="articles_wrapper" v-if="articles.length > 0 && !articles_loading">
      <div class="">
        Articles with this tag ({{articles.length}}):
      </div>

      <div class="articles_container" >

        <ArticlePreview
          v-for="article in articles"
          v-bind:key="article.identity.low"
          v-bind:article="article"/>
      </div>

    </div>


    <Loader v-else-if="loading"/>

    <div class="" v-else>
      No article with this tag
    </div>


  </div>
</template>

<script>



import Loader from '@/components/vue_loader/Loader.vue'
import Tag from '@/components/Tag.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'

// Icons
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import PinIcon from 'vue-material-design-icons/Pin.vue';

import DeleteIcon from 'vue-material-design-icons/Delete.vue';

export default {
  components: {
    Loader,
    Tag,
    ArticlePreview,
    IconButton,

    // icons
    DeleteIcon,
    PencilIcon,
    PinIcon,
  },
  data () {
    return {
      loading: false,
      tag: null,

      articles: [],
      articles_loading: false,
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
      this.tag = null
      if('id' in this.$route.query){
        this.loading = true;

        // Delete the list of related articles
        this.articles.splice(0,this.articles.length)

        this.axios.post(process.env.VUE_APP_API_URL + '/get_tag_neo4j', {id: tag_id})
        .then(response => {

          this.loading = false;

          if(response.data.length > 0){
            let record = response.data[0]
            this.tag = record._fields[record._fieldLookup['tag']]
            this.get_articles_of_tag(this.tag.identity.low);
          }


        })
        .catch(error => console.log(error.response.data))
      }
    },

    get_articles_of_tag(article_id){
      // Get the articles of this tag

      this.articles_loading = true
      this.axios.post(process.env.VUE_APP_API_URL + '/get_articles_of_tag', {id: article_id})
      .then(response => {

        this.articles.splice(0,this.articles.length)
        response.data.forEach( record => {
          let article = record._fields[record._fieldLookup['article']]
          this.articles.push(article)
        });
        this.articles_loading = false

      })
      .catch(error => console.log(error.response.data))
    },

    update_tag(){
      if('id' in this.$route.query){
        this.loading = true;

        this.axios.post(process.env.VUE_APP_API_URL + '/update_tag_neo4j', {
          tag: this.tag
        })
        .then( () => {
          this.get_tag(this.$route.query.id);
          this.$store.commit('update_categories');
        })
        .catch(error => alert(error))

      }
    },

    prompt_for_rename(){
      let new_name = prompt("New tag name", this.tag.properties.name)
      if(new_name){
        this.tag.properties.name = new_name
        this.update_tag()
      }

    },

    toggle_navigation_item(){
      this.tag.properties.navigation_item = !this.tag.properties.navigation_item
      this.update_tag()
    },

    delete_tag(){
      if(confirm('Delete tag?')){
        this.article_loading = true;

        // WARNING: using the query to get the ID is not very robust...
        this.axios.post(process.env.VUE_APP_API_URL + '/delete_tag_neo4j', {id: this.tag.identity.low})
        .then( () => {
          this.$router.push({ name: 'article_list' })
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
