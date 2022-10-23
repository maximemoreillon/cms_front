<template>
  <div>

    <h1>Articles</h1>

    <!-- Wrappeing in client-only because following content handled client-side -->
    <client-only>

      <!-- Could have this in its own component -->
      <div class="query_tools">

        <!-- Show tag if specified in query -->
        <div v-if="tag" class="filter">
          <MaterialIconTag />
          <Tag :tag="tag" :clickable="false" removable @remove="remove_query('tag_id')"/>
          <TagManagement v-if=" user_is_admin" v-model="tag"/>
        </div>

        <!-- Show author if specified in the query -->
        <div v-if="author" class="filter">
          <MaterialIconAccount class="metadata_icon" />
          <span>{{ author.display_name }}</span>
          <button class="remove_button" @click="remove_query('author_id')">
            <MaterialIconClose />
          </button>
        </div>

        <ArticleSearch />

        <div class="query_tools_row">
          <div class="counter">
            <MaterialIconFileDocumentOutline />
            <span>{{ article_count }}</span>
          </div>
          <div class="spacer" />
          <ArticleSorting />
        </div>

      </div>
      <!-- End of query tools -->
    
    <!-- List of articles -->
      <div v-if="!loading_error && articles.length" ref="articles_container" class="articles_container">
        <ArticlePreview v-for="(article, index) in articles" :key="`article_${index}`" :article="article" />
      </div>

      <!-- loader -->
      <div v-if="articles_loading" class="loader_container">
        <Loader />
      </div>

      <!-- No articles indicator -->
      <div v-if="!articles.length && !articles_loading && !loading_error">
        No articles
      </div>

      <!-- Error loading -->
      <div v-if="loading_error" class="error">
        Error loading articles
      </div>

      <!-- Load more button -->
      <div class="load_more_wrapper" :style="{display: load_more_possible ? 'block' : 'none'}">
        <button ref="load_more" class="outlined" @click="get_articles()">
          <span>Load more</span>
        </button>
      </div>
    </client-only>
  </div>
</template>

<script>

import Loader from '@/components/Loader.vue'

import ArticleSorting from '@/components/article_list/ArticleSorting.vue'
import ArticleSearch from '@/components/article_list/ArticleSearch.vue'
import ArticlePreview from '@/components/article_list/ArticlePreview.vue'

// import TagManagement from '@/components/TagManagement.vue'
import Tag from '~/components/Tag.vue'


export default {
  name: 'Articles',
  modules: [
    '@nuxtjs/axios',
  ],
  components: {
    Loader,
    // TagManagement,
    ArticlePreview,
    ArticleSorting,
    ArticleSearch,
    Tag,
    //Author,
  },
  auth: false,
  data() {
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
      author_loading: false,

      load_more_observer: null,

    }
  },
  head() {
    return {
      title: 'Articles | Maxime Moreillon',

      meta: [
        { hid: 'description', name: 'description', content: 'An article management system' },

        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@m_moreillon' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'Articles | Maxime Moreillon' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'An article management system' },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://articles.maximemoreillon.com/logo.png' },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Maxime Moreillon logo' },

        // OpenGraph
        { hid: 'og:title', name: 'og:title', content: 'summary' },
        { hid: 'og:description', name: 'og:description', content: 'An article management system' },
        { hid: 'og:image', name: 'og:image', content: 'https://articles.maximemoreillon.com/logo.png' },
        { hid: 'og:url', name: 'og:url', content: 'https://articles.maximemoreillon.com' },
        { hid: 'og:type', name: 'og:type', content: 'article' },
        { hid: 'og:locale', name: 'og:locale', content: 'en_US' },

      ]

    }
  },
  computed: {
    user_is_admin() {
      const { user } = this.$auth
      if (!user) return false
      return user.isAdmin
    },
    load_more_possible() {
      return !this.articles_loading
        && !this.articles_all_loaded
        && !this.loading_error
    },
    query() {
      return this.$route.query
    }


  },
  watch: {
    query(){
      this.delete_all_and_get_articles()
    }
  },
  
  mounted() {
    this.delete_all_and_get_articles()
  },

  methods: {
    delete_all_and_get_articles(){
      this.articles = []
      this.articles_all_loaded = false
      this.get_tag()
      this.get_author()
      this.get_articles()
    },

    async get_articles(){

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

      try {

        const { article_count, articles } = await this.$axios.$get('/articles', { params })

        this.article_count = article_count

        // Add batch of articles to existing list
        articles.forEach( (article) => { this.articles.push(article) })

        // Check if all articles loaded (less than batch size)
        if(this.articles.length >= this.article_count) this.articles_all_loaded = true

        // Configure "load more" observer
        if(!this.load_more_observer) setTimeout(this.load_more_when_scroll_to_bottom,200)
      } 
      catch (error) {
        this.loading_error = true
        if(error.response) console.error(error.response.data)
        else console.error(error)
      }
      finally {
        this.articles_loading = false
      }

      

    },

    async get_tag(){

      this.tag = null
      const {tag_id} = this.$route.query

      if(!tag_id) return
      this.tag_loading = true

      try {
        this.tag = await this.$axios.$get(`/tags/${tag_id}`)
      }
      catch (error) {
        console.error(error)
        if (error.response) alert(error.response.data)
        else alert(error)
      }
      finally {
        this.tag_loading = false
      }
      

    },

    async get_author(){

      this.author = null
      const {author_id} = this.$route.query
      if(!author_id) return
      this.author_loading = true
      try {
        const url = `${this.$config.apiUrl}/v1/authors/${author_id}`
        this.author = await this.$axios.$get(url)
        
      }
      catch (error) {
        console.error(error)
        if (error.response) alert(error.response.data)
        else alert(error)
      }
      finally {
        this.author_loading = false
      }


    },

    remove_query(item){
      // Making a copy so as to reassign it
      const query = {...this.$route.query}
      delete query[item]
      this.$router.push({ name: 'index', query })
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
  /* Could have been grid */
  margin-top: -0.5em;
  margin-bottom: 1em;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 0.5em;
}


.query_tools_row {
  display: flex;
  flex-direction: row;
}

.filter {
  gap: 0.5em;
  display: flex;
  align-items: center;
}

</style>
