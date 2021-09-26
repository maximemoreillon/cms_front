<template>
  <div class="article_list_view" ref="view">

    <template v-if="tag">
      <h1>Articles tagged with "{{tag.properties.name}}"</h1>
      <div class="tags_buttons_wrapper" v-if="user_is_admin">

        <button
          type="button"
          class="button"
          @click="prompt_for_rename()">
          <pencil-icon/>
          <span>Rename tag</span>
        </button>

        <button
          type="button"
          class="button"
          @click="delete_tag()">
          <delete-icon/>
          <span>Delete tag</span>
        </button>

        <button
          type="button"
          class="button"
          :class="{active:tag.properties.navigation_item}"
          @click="pin_to_navbar()">
          <pin-icon/>
          <span>Pin to nav</span>
        </button>

      </div>
    </template>

    <template v-else-if="author">
      <h1>Articles written by {{author.properties.username}}</h1>
    </template>

    <template v-else>
      <h1>All articles</h1>
    </template>


    <!-- Toolbar for sorting and new article -->
    <Toolbar >

        <!-- article counter -->
        <!-- Maybe not necessary -->
        <span class="article_counter">
          {{article_count}} Articles
        </span>

        <IconButton
          v-bind:active="sort === 'date'"
          v-on:click="sort_by_date()">
          <calendar-icon/>
        </IconButton>

        <IconButton
          v-bind:active="sort === 'title'"
          v-on:click="sort_by_title()">
          <alphabetical-icon/>
        </IconButton>

        <IconButton
          v-bind:active="sort === 'views'"
          v-on:click="sort_by_views()">
          <eye-icon/>
        </IconButton>

        <IconButton
          v-bind:active="order === 'DESC'"
          v-on:click="sort_order_descending()">
          <sort-descending-icon/>
        </IconButton>


        <IconButton
          v-bind:active="order === 'ASC'"
          v-on:click="sort_order_ascending()">
          <sort-ascending-icon/>
        </IconButton>

        <div class="growing_spacer"/>



        <!-- search -->
        <form class="search_wrapper" @submit.prevent="search()">
          <input
            type="search"
            class="search_bar"
            ref="search"
            v-bind:class="{search_bar_open: search_bar_open}"
            v-model="search_string">

          <input type="submit" style="display:none;">

          <IconButton
            v-on:click="search()">
            <magnify-icon/>
          </IconButton>

        </form>

    </Toolbar>










    <div
      class="articles_container"
      ref="articles_container"
      v-if="!loading_error && articles.length > 0">


      <ArticlePreview
        v-for="(article) in articles"
        :key="`article_${article.identity}`"
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
      v-if="articles.length === 0 && !articles_loading && !loading_error">
      No articles
    </div>

    <!-- Error loading -->
    <div class="error" v-if="loading_error">
      Error loading articles
    </div>

    <!-- Load more -->
    <div
      class="load_more_wrapper"
      ref="load_more"
      :style="{display: load_more_possible ? 'block' : 'none'}"
      >
      <button
        class="load_more_button"
        type="button"
        v-on:click="get_articles()">
        <span>Load more</span>
      </button>
    </div>




  </div>
</template>

<script>

import Loader from '@moreillon/vue_loader'

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Toolbar from '@/components/Toolbar.vue'
//import Tag from '@/components/Tag.vue'
//import Author from '@/components/Author.vue'

// icons
import AlphabeticalIcon from 'vue-material-design-icons/Alphabetical.vue';
import SortDescendingIcon from 'vue-material-design-icons/SortDescending.vue';
import SortAscendingIcon from 'vue-material-design-icons/SortAscending.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import PinIcon from 'vue-material-design-icons/Pin.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';


export default {
  components: {
    IconButton,
    ArticlePreview,
    Toolbar,
    Loader,
    //Tag,
    //Author,

    // icons
    PencilIcon,
    PinIcon,
    //FileDocumentOutlineIcon,
    AlphabeticalIcon,
    SortDescendingIcon,
    SortAscendingIcon,
    //DotsHorizontalIcon,
    MagnifyIcon,
    //CloseIcon,
  },
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



      // Default sorting and ordering

      search_string: '',
      sort: 'date',
      order: 'DESC',



      search_bar_open: false,
      batch_size: 10,

      load_more_observer: null,

    }
  },

  mounted() {

    // Does not get called when staying in the same route!

    //this.load_more_when_scroll_to_bottom()

    this.get_tag()
    this.get_author()
    this.delete_all_articles()
    this.get_articles()

    if(this.$route.query.search) {
      this.search_bar_open = true
      this.search_string = this.$route.query.search
    }

  },
  beforeRouteUpdate (to, from, next) {
    next()

    this.$nextTick().then( () => {
      this.get_tag()
      this.get_author()
      this.delete_all_articles()
      this.get_articles()
    })

  },

  methods: {
    delete_all_articles(){
      // Turned into its own method to work with the "load more" feature
      this.articles.splice(0,this.articles.length)
      this.articles_all_loaded = false
    },


    get_articles(){

      this.articles_loading = true

      const {search, author_id, tag_id} = this.$route.query

      const params = {
        sort : this.sort,
        order : this.order,
        start_index : this.articles.length,
        batch_size : this.batch_size,
        search,
        tag_id,
        author_id,
      }

      const url = `${process.env.VUE_APP_CMS_API_URL}/v2/articles`

      this.axios.get(url, { params })
      .then( ({data}) => {

        // Do not do anything if there is no article
        // if(data.length < 1) return this.articles_all_loaded = true

        this.article_count = data.article_count
        data.articles.forEach(a => {this.articles.push(a)})


        // Check if all articles loaded (less than batch size)
        if(data.articles < this.batch_size) {
          this.articles_all_loaded = true
        }

        if(!this.load_more_observer){
          setTimeout(this.load_more_when_scroll_to_bottom,200)
        }



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

      let tag_id = this.$route.query.tag_id

      if(!tag_id) return
      this.tag_loading = true;
      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/tags/${tag_id}`)
      .then(response => { this.tag = response.data })
      .catch(error => {
        if(error.response) alert(error.response.data)
        else alert(error)
      })
      .finally( () => {this.tag_loading = false})
    },

    get_author(){

      const author_id = this.$route.query.author_id

      if(!author_id) {
        this.author = null
        return
      }

      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/authors/${author_id}`)
      .then(response => { this.author = response.data })
      .catch(error => {
        this.$set(this.author,'error', 'Error getting author')
        if(error.response) alert(error.response.data)
        else alert(error)
      })


    },

    sort_by_date(){
      this.sort = 'date'
      this.delete_all_articles()
      this.get_articles()
    },
    sort_by_title(){
      this.sort = 'title'
      this.delete_all_articles()
      this.get_articles()
    },
    sort_by_views(){
      this.sort = 'views'
      this.delete_all_articles()
      this.get_articles()
    },
    sort_order_ascending(){
      this.order = 'ASC'
      this.delete_all_articles()
      this.get_articles()
    },
    sort_order_descending(){
      this.order = 'DESC'
      this.delete_all_articles()
      this.get_articles()
    },

    update_tag(){
      // Used for admins to edit tags

      this.tag_loading = true;

      this.axios.put(`${process.env.VUE_APP_CMS_API_URL}/tags/${this.tag.identity}`, {
        properties: this.tag.properties
      })
      .then( response => {

        if(response.data.length > 0){
          let record = response.data[0]
          this.tag = record._fields[record._fieldLookup['tag']]
        }

        this.$store.commit('update_categories')

        this.delete_all_articles()
        this.get_articles()

        this.tag_loading = false
      })
      .catch(error => alert(error))

    },

    prompt_for_rename(){
      let new_name = prompt("New tag name", this.tag.properties.name)
      if(new_name){
        this.tag.properties.name = new_name
        this.update_tag()
      }
    },

    pin_to_navbar(){
      this.tag.properties.navigation_item = !this.tag.properties.navigation_item
      this.update_tag()
    },

    delete_tag(){
      if(confirm('Delete tag?')){
        this.article_loading = true;

        this.axios.delete(`${process.env.VUE_APP_CMS_API_URL}/tags/${this.tag.identity}`)
        .then( () => {
          this.$router.push({ name: 'article_list' })
        })
        .catch(error => alert(error))
      }
    },

    load_more_when_scroll_to_bottom(){
      // THIS IS HIGHLY TEMPLATE DEPENDANT!

      const container = this.$refs.view.parentNode.parentNode
      const target = this.$refs.load_more

      const options = {
        root: container,
        rootMargin: '0px',
        threshold: 1.0
      }

      const callback = (entries) => {
        const {isIntersecting} = entries.find(e => e.target === target)
        if(isIntersecting && this.load_more_possible) {
          this.get_articles()
        }
      }

      this.observer = new IntersectionObserver(callback, options);

      this.observer.observe(target)

    },

    search(){
      if(this.search_bar_open){
        // if the search bar is open, search or close

        if(this.search_string === this.$route.query.search) return

        const query = {...this.$route.query, search: this.search_string}

        if(this.search_string === '') {
          this.search_bar_open = false
          delete query.search
        }

        this.$router.push({name: 'article_list', query})

        // this.delete_all_articles()
        // this.get_articles()

      }
      else {
        // If the search bar is closed, open it
        this.search_bar_open = true
        setTimeout(() => this.$refs.search.focus(),50)
      }

    }

  },
  computed: {
    user_is_admin(){
      if(!this.$store.state.current_user) return false
      return this.$store.state.current_user.properties.isAdmin
    },
    load_more_possible(){
      return !this.articles_loading && !this.articles_all_loaded && !this.loading_error
    }

  }



}
</script>


<style scoped>

.articles_container {

  /* Normal behavior */

  /* display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-gap: 1em; */
  display: flex;
  flex-direction: column;
  align-items: stretch;

}



.tags_buttons_wrapper > *:not(:last-child) {
  margin-right: 1em;
}

.tags_buttons_wrapper {
  margin: 1em 0;
}
.load_more_button {
  display: flex;
  align-items: center;
  margin: 25px auto;
  padding: 10px;
  outline: none;
  border: 1px solid #dddddd;
  border-radius: 5px;
  background-color: transparent;
  cursor: pointer;

  transition: color 0.25s, border-color 0.25s;
}

.load_more_button:hover {
  border-color: #c00000;
  color: #c00000;
}

.article_counter{
  display: flex;
  align-items: center;
  color: #444444;
}

.tool_cluster {
  display: flex;
  flex-wrap: wrap;
}

.search_bar {
  transition: 0.25s;
  width: 0;
  visibility: hidden;
}

.search_bar.search_bar_open {
  width: 20vw;
  visibility: visible;
}

.search_wrapper {
  display: flex;
  align-items: stretch;
}



</style>
