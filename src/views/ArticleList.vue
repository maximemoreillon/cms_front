<template>

  <div class="article_list_view" ref="view">

    <!-- Toolbar for sorting and new article -->
    <Toolbar >

      <!-- Tag -->
      <template v-if="tag">
        <span>Articles tagged with</span>

        <Tag v-bind:tag="tag"/>

        <IconButton
          v-on:click="$router.push({ name: 'article_list' })">
          <close-icon/>
        </IconButton>

        <template v-if="user_is_admin">

          <IconButton
            v-on:click="prompt_for_rename()">
            <pencil-icon/>
          </IconButton>

          <IconButton
            v-on:click="delete_tag()">
            <delete-icon />
          </IconButton>

          <IconButton
            v-bind:active="tag.properties.navigation_item"
            v-on:click="pin_to_navbar()">
            <pin-icon />
          </IconButton>
      </template>


      </template>

      <!-- Author -->
      <template v-if="author.properties">
        <span>Articles written by</span>
        <Author v-bind:author="author"/>

        <!-- remove author filter -->
        <IconButton
          v-on:click="$router.push({ name: 'article_list' })">
          <close-icon/>
        </IconButton>

      </template>


      <div class="growing_spacer"/>

      <div class="">

        <!-- article counter -->
        <!-- Maybe not necessary -->
        <span class="article_counter">
          {{article_count}} Articles
        </span>

        <IconButton
          v-bind:active="sort === 'article.edition_date'"
          v-on:click="sort_by_date()">
          <calendar-icon/>
        </IconButton>

        <IconButton
          v-bind:active="sort === 'article.title'"
          v-on:click="sort_by_title()">
          <alphabetical-icon/>
        </IconButton>

        <IconButton
          v-bind:active="sort === 'article.views'"
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



        <!-- search -->
        <div class="search_wrapper">
          <input
            type="search"
            class="search_bar"
            ref="search"
            v-bind:class="{search_bar_open: search_bar_open}"
            v-model="search_string"
            v-on:keyup.enter="search()">

          <IconButton
            v-on:click="search()">
            <magnify-icon/>
          </IconButton>

        </div>
      </div>

    </Toolbar>










    <div
      class="articles_container"
      v-if="!loading_error && article_records.length > 0">


      <ArticlePreview
        v-for="(record, i) in article_records"
        v-bind:key="`article_${i}`"
        v-bind:article_record="record"/>



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
      v-if="article_records.length === 0 && !articles_loading && !loading_error">
      No articles
    </div>

    <!-- Error loading -->
    <div class="error" v-if="loading_error">
      Error loading articles
    </div>

    <!-- Load more -->
    <button
      v-if="!articles_loading && !articles_all_loaded && !loading_error"
      class="load_more_button"
      type="button"
      v-on:click="get_articles()">
      <span>Load more</span>
    </button>



  </div>
</template>

<script>

import Loader from '@moreillon/vue_loader'

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Toolbar from '@/components/Toolbar.vue'
import Tag from '@/components/Tag.vue'
import Author from '@/components/Author.vue'

// icons
import CalendarIcon from 'vue-material-design-icons/Calendar.vue';
import AlphabeticalIcon from 'vue-material-design-icons/Alphabetical.vue';
import SortDescendingIcon from 'vue-material-design-icons/SortDescending.vue';
import SortAscendingIcon from 'vue-material-design-icons/SortAscending.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import PinIcon from 'vue-material-design-icons/Pin.vue';
//import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';


export default {
  components: {
    IconButton,
    ArticlePreview,
    Toolbar,
    Loader,
    Tag,
    Author,

    // icons
    PencilIcon,
    PinIcon,
    //FileDocumentOutlineIcon,
    DeleteIcon,
    CalendarIcon,
    AlphabeticalIcon,
    SortDescendingIcon,
    SortAscendingIcon,
    //DotsHorizontalIcon,
    MagnifyIcon,
    CloseIcon,
  },
  data () {
    return {
      article_records: [],
      article_count: 0,
      articles_loading: false,
      articles_all_loaded: false,
      loading_error: null,

      tag: null,
      tag_loading: false,

      author: {},

      // Default sorting and ordering
      sort: 'article.edition_date',
      order: 'DESC',


      search_string: '',
      search_bar_open: false,
      batch_size: 10,

    }
  },

  mounted() {

    // setting the document title
    document.title = `CMS - Maxime MOREILLON`;
    // Does not get called when staying in the same route!
    this.load_more_when_scroll_to_bottom()

    this.get_tag()
    this.get_author()
    this.delete_all_articles()
    this.get_articles()

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
      this.article_records.splice(0,this.article_records.length)
      this.articles_all_loaded = false
    },


    get_articles(){

      this.articles_loading = true

      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/articles`, {
        params: {
          sort : this.sort,
          order : this.order,
          start_index : this.article_records.length,
          search : this.search_string,
          batch_size : this.batch_size,
          tag_id: this.$route.query.tag_id,
          author_id: this.$route.query.author_id
        }
      })
      .then(response => {

        // Do not do anything if there is no article
        if(response.data < 1) return this.articles_all_loaded = true

        // Every record contains the total article count
        // Take the total article count from the first record
        let first_record = response.data[0]
        this.article_count = first_record._fields[first_record._fieldLookup['article_count']].low


        response.data.forEach( (record) => {
          this.article_records.push(record)
        })


        // Check if all articles loaded (less than batch size)
        if(response.data.length < this.batch_size) {
          this.articles_all_loaded = true
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

      if(tag_id){
        this.tag_loading = true;
        this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/tags/${tag_id}`)
        .then(response => { this.tag = response.data })
        .catch(error => {
          if(error.response) alert(error.response.data)
          else alert(error)
        })
        .finally( () => {this.tag_loading = false;})
      }
    },

    get_author(){
      this.author = {}

      let author_id = this.$route.query.author_id

      if(author_id){
        this.$set(this.author,'loading',true)
        this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/authors/${author_id}`)
        .then(response => { this.author = response.data })
        .catch(error => {
          this.$set(this.author,'error', 'Error getting author')
          if(error.response) alert(error.response.data)
          else alert(error)
        })
      }

    },

    sort_by_date(){
      this.sort = 'article.edition_date'
      this.delete_all_articles()
      this.get_articles()
    },
    sort_by_title(){
      this.sort = 'article.title'
      this.delete_all_articles()
      this.get_articles()
    },
    sort_by_views(){
      this.sort = 'article.views'
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

      this.tag_loading = true;

      this.axios.put(`${process.env.VUE_APP_CMS_API_URL}/tags/${this.tag.identity.low}`, {
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

        this.axios.delete(`${process.env.VUE_APP_CMS_API_URL}/tags/${this.tag.identity.low}`)
        .then( () => {
          this.$router.push({ name: 'article_list' })
        })
        .catch(error => alert(error))
      }
    },
    load_more_when_scroll_to_bottom(){
      // THIS IS HIGHLY TEMPLATE DEPENDANT!

      let current_view = this.$refs.view
      let main_and_footer_wrapper = current_view.parentNode.parentNode


      main_and_footer_wrapper.onscroll = () => {

        // only apply to article_list route
        if(this.$route.name === 'article_list'){

          let main = current_view.parentNode
          let footer = main_and_footer_wrapper.getElementsByTagName('footer')[0]

          let content_height = main.offsetHeight + footer.offsetHeight

          let content_view_bottom = main_and_footer_wrapper.offsetHeight + main_and_footer_wrapper.scrollTop

          let delta = Math.abs(content_height - content_view_bottom)


          if( delta < 5){
            if(!this.articles_loading && this.article_records.length > 0 && !this.articles_all_loaded) {
              this.get_articles();
            }
          }

        }
      }
    },

    search(){
      if(this.search_bar_open){
        // if the search bar is open, search or close
        if(this.search_string === '') this.search_bar_open = false
        else {
          this.delete_all_articles()
          this.get_articles()
        }

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
    }
  }



}
</script>


<style scoped>

.articles_container {

  /* Normal behavior */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-gap: 1em;
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
