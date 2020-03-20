<template>

  <div class="article_list_view" ref="view">

    <!-- TODO: Use something else than a toolbar -->
    <Toolbar v-if="tag && !tag_loading">


        <Tag v-bind:tag="tag"/>

        <IconButton
          v-on:click="$router.push({ name: 'article_list' })">
          <close-icon/>
        </IconButton>

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


    </Toolbar >

    <Loader
      v-else-if="tag_loading"
      size="25"/>

    <Toolbar >


      <!--<file-document-outline-icon class="article_counter"/>x{{articles.length}}-->


      <input
        type="search"
        v-model="search_string"
        v-on:keyup.enter="search()">
      <IconButton
        v-on:click="search()">
        <magnify-icon/>
      </IconButton>

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
    <Loader v-if="articles_loading"/>
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

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'
import Toolbar from '@/components/Toolbar.vue'
import Loader from '@/components/vue_loader/Loader.vue'
import Tag from '@/components/Tag.vue'

// icons
import PlusIcon from 'vue-material-design-icons/Plus.vue';
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


//import DotsHorizontalIcon from 'vue-material-design-icons/DotsHorizontal.vue';

export default {
  components: {
    IconButton,
    ArticlePreview,
    Toolbar,
    Loader,
    Tag,

    // icons
    PencilIcon,
    PinIcon,
    //FileDocumentOutlineIcon,
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
      articles_loading: false,
      articles_all_loaded: false,

      tag: null,
      tag_loading: false,

      // Default sorting and ordering
      sort: 'article.edition_date',
      order: 'DESC',


      search_string: '',
      batch_size: 10,

    }
  },
  methods: {
    delete_all_articles(){
      this.articles.splice(0,this.articles.length)
      this.articles_all_loaded = false
    },


    get_articles(){

      this.articles_loading = true

      let body = {}

      body.sort = this.sort
      body.order = this.order
      body.start_index = this.articles.length
      body.search = this.search_string
      body.batch_size = this.batch_size

      // That's a bit flimy
      if(this.tag) body.tag_id = this.tag.identity.low


      this.axios.post(process.env.VUE_APP_API_URL + '/get_articles', body)
      .then(response => {

        response.data.forEach( record => {
          let article = record._fields[record._fieldLookup['article']]
          this.articles.push(article)
        });

        // Check if all articles loaded (less than 10)
        if(response.data.length < this.batch_size) this.articles_all_loaded = true;

        this.articles_loading = false;
      })
      .catch(error => {
        this.articles_loading = false;
        if(error.response) alert(error.response.data)
        else alert(error)
      })

    },

    get_tag(tag_id){
      this.tag = null

      if(tag_id){
        this.tag_loading = true;

        // Delete the list of related articles
        this.articles.splice(0,this.articles.length)

        this.axios.post(process.env.VUE_APP_API_URL + '/get_tag', {
          tag_id: tag_id,
        })
        .then(response => {

          this.tag_loading = false;

          if(response.data.length > 0){
            let record = response.data[0]
            this.tag = record._fields[record._fieldLookup['tag']]
          }

          this.delete_all_articles()
          this.get_articles()


        })
        .catch(error => {
          this.articles_loading = false;
          if(error.response) alert(error.response.data)
          else alert(error)
        })
      }
      else {
        this.delete_all_articles()
        this.get_articles()
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

      this.axios.post(process.env.VUE_APP_API_URL + '/update_tag', {
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

    toggle_navigation_item(){
      this.tag.properties.navigation_item = !this.tag.properties.navigation_item
      this.update_tag()
    },

    delete_tag(){
      if(confirm('Delete tag?')){
        this.article_loading = true;

        this.axios.post(process.env.VUE_APP_API_URL + '/delete_tag', {
          tag_id: this.tag.identity.low
        })
        .then( () => {
          this.$router.push({ name: 'article_list' })
        })
        .catch(error => alert(error))
      }
    },
    load_more_when_scroll_to_bottom(){
      this.$refs.view.parentNode.onscroll = () => {

        if(this.$route.name === 'article_list'){
          // THIS IS HIGHLY TEMPLATE DEPENDANT!
          let router_view = this.$refs.view
          let main = router_view.parentNode
          let footer = main.getElementsByTagName('footer')[0]

          let content_height = router_view.offsetHeight + footer.offsetHeight
          let content_view_bottom = main.scrollTop + main.offsetHeight

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
      this.delete_all_articles()
      this.get_articles()
    }

  },


  mounted() {
    //this.get_articles()
    this.get_tag(this.$route.query.tag_id)
    this.load_more_when_scroll_to_bottom()

  },
  beforeRouteUpdate (to, from, next) {
    this.get_tag(to.query.tag_id)
    next();
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

</style>
