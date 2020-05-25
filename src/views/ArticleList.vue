<template>

  <div class="article_list_view" ref="view">

    <!-- Selected author -->
    <!-- TODO: Use something else than a toolbar -->
    <Toolbar v-if="author.properties">
        Showing articles written by <Author v-bind:author="author"/>

        <!-- remove author filter -->
        <IconButton
          v-on:click="$router.push({ name: 'article_list' })">
          <close-icon/>
        </IconButton>
    </Toolbar >
    <Toolbar v-else-if="author.loading">
      <Loader />
    </Toolbar >





    <!-- Selected tag -->
    <!-- TODO: Use something else than a toolbar -->
    <Toolbar v-if="tag && !tag_loading">
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

    </Toolbar >

    <Toolbar v-else-if="tag_loading">
      <Loader />
    </Toolbar >

    <Toolbar >


      <!-- Sorting and ordering -->
      <div class="tool_cluster">
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
          v-bind:active="order === 'DESC'"
          v-on:click="sort_order_descending()">
          <sort-descending-icon/>
        </IconButton>

        <IconButton
          v-bind:active="order === 'ASC'"
          v-on:click="sort_order_ascending()">
          <sort-ascending-icon/>
        </IconButton>
      </div>



      <!-- article counter -->
      <!-- Maybe not necessary -->
      <span class="article_counter">
        <file-document-outline-icon />x{{article_count}}
      </span>

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

      <div class="growing_spacer"/>

      <IconButton
        v-if="$store.state.logged_in"
        v-on:buttonClicked="$router.push({ path: 'article_editor' })">
        <plus-icon/>
      </IconButton>

    </Toolbar>


    <div class="articles_container" v-if="articles.length > 0">


      <ArticlePreview
        v-for="(article, i) in articles"
        v-bind:key="i"
        v-bind:article="article"/>



    </div>

    <!-- loader -->
    <div class="loader_container" v-if="articles_loading">
      <Loader />
    </div>

    <!-- No articles indicator -->
    <div class="" v-if="articles.length === 0 && !articles_loading">No articles</div>

    <button
      v-if="!articles_loading && !articles_all_loaded"
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
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import CalendarIcon from 'vue-material-design-icons/Calendar.vue';
import AlphabeticalIcon from 'vue-material-design-icons/Alphabetical.vue';
import SortDescendingIcon from 'vue-material-design-icons/SortDescending.vue';
import SortAscendingIcon from 'vue-material-design-icons/SortAscending.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import PinIcon from 'vue-material-design-icons/Pin.vue';
import FileDocumentOutlineIcon from 'vue-material-design-icons/FileDocumentOutline.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import MagnifyIcon from 'vue-material-design-icons/Magnify.vue';
import CloseIcon from 'vue-material-design-icons/Close.vue';


//import DotsHorizontalIcon from 'vue-material-design-icons/DotsHorizontal.vue';

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
    FileDocumentOutlineIcon,
    PlusIcon,
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
      articles: [],
      article_count: 0,
      articles_loading: false,
      articles_all_loaded: false,

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
    // Does not get called when staying in the same route!
    this.load_more_when_scroll_to_bottom()

    this.get_tag(this.$route.query.tag_id)
    this.get_author(this.$route.query.author_id)

    this.delete_all_articles()
    this.get_articles()

  },
  beforeRouteUpdate (to, from, next) {

    this.get_tag(to.query.tag_id)
    this.get_author(to.query.author_id)

    // Dirty but no idea how to solve
    setTimeout(() => {
      this.delete_all_articles()
      this.get_articles()
    },100)

    next();

  },

  methods: {
    delete_all_articles(){
      // Usuallz, articles are not deleted because of the "load more" system
      this.articles.splice(0,this.articles.length)
      this.articles_all_loaded = false
    },


    get_articles(){

      this.articles_loading = true

      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/articles`, {
        params: {
          sort : this.sort,
          order : this.order,
          start_index : this.articles.length,
          search : this.search_string,
          batch_size : this.batch_size,
          tag_id: this.$route.query.tag_id,
          author_id: this.$route.query.author_id
        }
      })
      .then(response => {

        console.log(response.data)

        // Do not do anything if there is no article
        if(response.data < 1) return this.articles_all_loaded = true

        // Every record contains the total article count
        // Take the total article count from the first record
        let first_record = response.data[0]
        this.article_count = first_record._fields[first_record._fieldLookup['article_count']].low


        response.data.forEach( (record, index) => {
          let article = record._fields[record._fieldLookup['article']]
          let author = record._fields[record._fieldLookup['author']]
          let relationship = record._fields[record._fieldLookup['relationship']]
          this.$set(article,'author',author)
          this.$set(article,'relationship',relationship)
          // prevent pushing all articles at once, because it crashes the system
          setTimeout(() => this.articles.push(article), index*10)

        });


        // Check if all articles loaded (less than batch size)
        if(response.data.length < this.batch_size) {
          this.articles_all_loaded = true
        }



      })
      .catch(error => {
        if(error.response) alert(error.response.data)
        else alert(error)
      })
      .finally(() => { this.articles_loading = false })

    },

    get_tag(tag_id){
      this.tag = null

      if(tag_id){
        this.tag_loading = true;
        this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/tag`, {
          params: {tag_id: tag_id},
        })
        .then(response => { this.tag = response.data })
        .catch(error => {
          if(error.response) alert(error.response.data)
          else alert(error)
        })
        .finally( () => {this.tag_loading = false;})
      }
    },

    get_author(author_id){
      this.author = {}

      if(author_id){
        this.$set(this.author,'loading',true)
        this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/author`, {
          params: {author_id: author_id},
        })
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

      this.axios.post(process.env.VUE_APP_CMS_API_URL + '/update_tag', {
        tag: this.tag
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

        this.axios.post(process.env.VUE_APP_CMS_API_URL + '/delete_tag', {
          tag_id: this.tag.identity.low
        })
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
            if(!this.articles_loading && this.articles.length > 0 && !this.articles_all_loaded) {
              this.get_articles();
            }
          }

        }
      }
    },

    search(){
      if(this.search_bar_open){
        this.delete_all_articles()
        this.get_articles()
        // Todo: this would be done inside the search bar component
        if(this.search_string === '') this.search_bar_open = false
      }
      else {
        this.search_bar_open = true
        setTimeout(() => this.$refs.search.focus(),50)
      }

    }

  },
  computed: {
    user_is_admin(){
      if(!this.$store.state.user) return false
      return this.$store.state.user.properties.isAdmin
    }
  }



}
</script>


<style scoped>

.articles_container {

  /* Normal behavior */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
  grid-gap: 15px;
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
