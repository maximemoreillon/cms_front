<template>
  <div>

    <template v-if="tag">
      <h1>Articles tagged with {{tag.name}}</h1>


      <TagManagement
        v-if="user_is_admin"
        :tag="tag"
        @tagUpdate="delete_all_and_get_articles()"/>


    </template>

    <template v-else-if="author">
      <h1>Articles written by {{author.display_name}}</h1>
    </template>

    <template v-else>
      <h1>Articles</h1>
    </template>


    <!-- Toolbar for sorting and new article -->
    <!-- <div class="toolbar" >
      <div class="counter">
        <file-document-outline-icon/>
        <span>{{article_count}}</span>
      </div>
      <SortingTools />
      <div class="spacer"/>
    </div> -->

    <div class="query_tools">

      <div class="">
        <ArticleSearch />
      </div>

      <div class="query_tools_row">
        <div class="counter">
          <file-document-outline-icon/>
          <span>{{article_count}}</span>
        </div>
        <div class="spacer" />
        <SortingTools />

      </div>



    </div>

    <div
      class="articles_container"
      ref="articles_container"
      v-if="!loading_error && articles.length">


      <ArticlePreview
        v-for="(article, index) in articles"
        :key="`article_${index}`"
        :article="article"/>

    </div>

    <!-- loader -->
    <div
      class="loader_container"
      v-if="articles_loading">
      <Loader />
    </div>

    <!-- No articles indicator -->
    <div
      class=""
      v-if="!articles.length && !articles_loading && !loading_error">
      No articles
    </div>

    <!-- Error loading -->
    <div class="error"
      v-if="loading_error">
      Error loading articles
    </div>

    <!-- Load more -->
    <div
      class="load_more_wrapper"
      :style="{display: load_more_possible ? 'block' : 'none'}">
      <button
        class="outlined"
        ref="load_more"
        v-on:click="get_articles()">
        <span>Load more</span>
      </button>
    </div>




  </div>
</template>

<script>


import SortingTools from '@/components/SortingTools.vue'
import ArticleSearch from '@/components/ArticleSearch.vue'

import TagManagement from '@/components/TagManagement.vue'
// import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
// import Toolbar from '@/components/Toolbar.vue'



import IdUtils from '@/mixins/IdUtils'

export default {
  name: 'Articles',
  components: {
    // IconButton,
    // Toolbar,
    ArticlePreview,
    TagManagement,
    SortingTools,
    ArticleSearch,
    //Tag,
    //Author,
  },
  mixins: [
    IdUtils
  ],
  data () {
    return {
      articles: [],
      article_count: 0,

      // loading flags
      articles_loading: false,
      articles_all_loaded: false,
      loading_error: null,

      tag: null,
      tag_loading: false,

      author: null,


      load_more_observer: null,

    }
  },

  mounted() {

    this.delete_all_and_get_articles()

  },
  beforeRouteUpdate (to, from, next) {
    next()

    this.$nextTick().then( () => {
      this.delete_all_and_get_articles()
    })
  },

  methods: {


    delete_all_and_get_articles(){
      this.get_tag()
      this.get_author()
      this.articles = []
      this.articles_all_loaded = false
      this.get_articles()
    },


    get_articles(){

      this.articles_loading = true


      const {
        search,
        author_id,
        tag_id,
        sort = 'date',
        order = 'DESC',
      } = this.$route.query

      const params = {
        sort,
        order,
        start_index : this.articles.length,
        batch_size : 10,
        search,
        tag_id,
        author_id,
      }

      const url = `${process.env.VUE_APP_CMS_API_URL}/v1/articles`

      this.axios.get(url, { params })
      .then( ({data}) => {

        this.article_count = data.article_count

        // Add batch of articles to existing list
        data.articles.forEach( (article) => { this.articles.push(article) })


        // Check if all articles loaded (less than batch size)
        if(this.articles.length >= this.article_count) this.articles_all_loaded = true
        if(!this.load_more_observer) setTimeout(this.load_more_when_scroll_to_bottom,200)

      })
      .catch(error => {
        this.loading_error = true
        if(error.response) console.error(error.response.data)
        else console.error(error)
      })
      .finally(() => { this.articles_loading = false })

    },

    get_tag(){
      this.tag = null

      const tag_id = this.$route.query.tag_id

      if(!tag_id) return

      this.tag_loading = true;
      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/v1/tags/${tag_id}`)
      .then( ({data}) => {
        this.tag = data
       })
      .catch(error => {
        if(error.response) alert(error.response.data)
        else alert(error)
      })
      .finally( () => {this.tag_loading = false})
    },

    get_author(){

      this.author = null

      const author_id = this.$route.query.author_id

      if(!author_id) return

      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/v1/authors/${author_id}`)
      .then(response => { this.author = response.data })
      .catch(error => {
        // Dirty
        this.$set(this.author,'error', 'Error getting author')
        if(error.response) alert(error.response.data)
        else alert(error)
      })

    },

    load_more_when_scroll_to_bottom(){

      const target = this.$refs.load_more

      const options = { rootMargin: '0px', threshold: 1.0 }

      const callback = (entries) => {
        const { isIntersecting } = entries.find(e => e.target === target)
        if(isIntersecting && this.load_more_possible) this.get_articles()
      }

      this.observer = new IntersectionObserver(callback, options);

      this.observer.observe(target)

    },





  },
  computed: {
    user_is_admin(){
      const {current_user} = this.$store.state
      if(!current_user) return false
      return current_user.isAdmin
        || current_user.properties.isAdmin
    },
    load_more_possible(){
      return !this.articles_loading
        && !this.articles_all_loaded
        && !this.loading_error
    }

  }



}
</script>


<style scoped>



.articles_container > *+* {
  margin-top: 1em;
}



.load_more_wrapper {
  padding: 1em;
  text-align: center;
}

.query_tools {
  padding-bottom: 0.5em;
  margin-bottom: 1em;
  border-bottom: 1px solid #dddddd;
}

.query_tools > *+* {
  margin-top: .5em;
}
.query_tools_row {

}

.query_tools_row {
  display: flex;
  flex-direction: row;
}

</style>
