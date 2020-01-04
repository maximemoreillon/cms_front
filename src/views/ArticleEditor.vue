<template>

  <div class="article_editor_view">

    <!-- wrapper for authentication detection -->
    <div
      class="authentication_wrapper"
      v-if="$store.state.user && !article_loading">

      <Toolbar>

        <div class="dates_container">
          <div class="" v-if="article_data.creation_date">Published on {{format_date(article_data.creation_date)}}</div>
          <div class="" v-if="article_data.edit_date">Last edited on {{format_date(article_data.edit_date)}}</div>
        </div>

        <div class="growing_spacer"/>

        <IconButton
          v-if="article_data._id"
          class="right_aligned"
          icon="mdi-arrow-left"
          v-on:buttonClicked="view_article()"/>
        <IconButton
          v-bind:class="{right_aligned: !article_data._id}"
          icon="mdi-content-save"
          v-on:buttonClicked="submit_article()"/>
        <IconButton
          icon="mdi-delete"
          v-on:buttonClicked="delete_article()"/>
        <IconButton
          v-bind:icon="article_data.published ? 'mdi-lock' : 'mdi-earth'"
          v-on:buttonClicked="toggle_published()"/>

      </Toolbar>

      <div class="metadata_wrapper">

        <div class="category_container">
          <label for="category_search">Category: </label>
          <input
            id="category_search"
            type="search"
            list="category_list"
            v-model="article_data.category"/>

            <datalist id="category_list">
              <option
                v-for="(category, i) in $store.state.categories"
                v-bind:value="category"
                v-bind:key="i"/>
            </datalist>

        </div>

        <div class="tags_wrapper">
          <label for="category_search">Tags: </label>
          <span class="tag" v-for="(tag, index) in article_data.tags" v-bind:key="index">
            <span>{{tag}}</span>
            <IconButton
              icon="mdi-close"
              size="100%"
              v-on:buttonClicked="delete_tag(index)"/>
          </span>
          <input type="search" ref="tag_input" v-on:keyup.enter="add_tag()">
          <IconButton
            icon="mdi-plus"
            v-on:buttonClicked="add_tag()"/>




        </div>

      </div>


      <!-- editor for the content of the article -->
      <div class="quill_wrapper">
        <quill-editor
          v-model="article_data.content"
          v-bind:options="editorOption"/>
      </div>


    </div>

    <Loader v-if="$store.state.user && article_loading"/>

    <div class="" v-if="!$store.state.user">
      Article cannot be edited by unauthenticated user
    </div>

    <!-- Todo: Add case for article not found -->

  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import {formatDate} from '@/mixins/formatDate.js'
import Toolbar from '@/components/Toolbar.vue'
import Loader from '@/components/vue_loader/Loader.vue'

export default {
  components: {
    IconButton,
    Toolbar,
    Loader,
  },
  mixins: [formatDate],
  data () {
    return {

      article_loading: false,

      // Default values for an article, overwritten if loaded with axios
      article_data: {
        // default set to undefined for MongoDB
        _id: undefined,

        published: false,

        creation_date: new Date(),

        // Content edited in quill
        content: '',

        // Article metadata
        category: '',
        tags: [],

      },

      editorOption: {
        scrollingContainer: '#main', // prevents jumping back to top of editor when pasting
        theme: 'snow',
        bounds: '#main', // Preventing bubble from rendering behind nav
        modules: {

          imageDrop: true,

          imageResize: {
            modules: [ 'Resize', 'DisplaySize'  ]
          },

          clipboard: {
            matchVisual: false
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'indent': '-1'}, { 'indent': '+1' }],
            //[{ 'direction': 'rtl' }],

            [{ 'size': ['small', false, 'large', 'huge'] }],
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],
            //[{ 'font': [] }],
            [{ 'align': [] }],

            ['link','image', 'video'],

            ['clean']
          ],


        }

      }
    }
  },

  methods: {
    get_article_if_exists(){
      // If ID is present in query, get the article corresponding to that ID
      if('_id' in this.$route.query){
        this.article_loading = true;
        this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
        .then(response => {

          if(response.data){
            this.article_data = response.data
            // Add the date of edition
            this.article_data.edit_date = new Date();
          }
          this.article_loading = false;

        })
        .catch(error => alert(error))
      }
    },
    toggle_published(){
      this.article_data.published = !this.article_data.published;
    },
    submit_article(){

      // Show loader to prevent user from re-submitting
      this.article_loading = true;

      // adding computed data
      this.article_data.title = this.article_title
      this.article_data.summary = this.article_summary
      this.article_data.thumbnail_src = this.article_thumbnail_src

      this.axios.post('https://cms.maximemoreillon.com/edit_article', this.article_data)
      .then(response => {
        this.article_loading = false;
        this.$store.commit('update_categories')
        this.$router.push({ path: '/article', query: { _id: response.data._id } })
      })
      .catch(error => alert(error))
    },
    delete_article(){
      if(confirm('Delete article?')){
        this.article_loading = true;
        this.axios.post('https://cms.maximemoreillon.com/delete_article', {_id: this.article_data._id})
        .then( () => {
          this.article_loading = false;
          this.$store.commit('update_categories')
          this.$router.push({ path: '/article_list' })
        })
        .catch(error => alert(error))
      }

    },
    view_article(){
      this.$router.push({ path: 'article', query: { _id: this.article_data._id } })
    },
    add_tag(){
      this.article_data.tags.push(this.$refs.tag_input.value);
      this.$refs.tag_input.value = ""
    },
    delete_tag(index){
        this.article_data.tags.splice(index,1)
    }
  },
  computed: {
    article_title(){
      // get article title from content
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1)return first_h1.innerHTML
      else return "Untitled"
    },
    article_summary(){
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) return first_p.innerHTML
      else return ""
    },
    article_thumbnail_src(){
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_img = virtual_container.getElementsByTagName('img')[0]
      if(first_img) return first_img.src
      else return ""
    }

  },
  mounted(){
    this.get_article_if_exists();
  }

}
</script>


<style>

.article_editor_view{
  height: 100%;
}

.authentication_wrapper{
  height: 100%;

  display: flex;
  flex-direction: column;




}


.quill_wrapper {
  /* take all vertical space */
  flex-grow: 1;
  position: relative;
}


.quill-editor{
  /* Must match dimensions of wrapper */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;

  height: 100%; /* should be set to 100% */

  display: flex;
  flex-direction: column;

}

.ql-container {
  /* area below the toolbar */

  /* MEMO
  ql-container is height 100%. Which means it will have the same size as .quill editor
  Consequently, with the toolbar, ql-container will overflow
  */



  flex-grow: 1;
  height: auto !important;
  overflow-y: auto;


}

.ql-toolbar {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.metadata_wrapper{
  margin: 5px;
}

.tags_wrapper {

}
.tags_container {
  display: flex;
}

.tag {
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}
.tag:first-child {
  margin-left: 0;
}

input[type="search"]{
  border: none;
  border-bottom: 1px solid #444444;
}



</style>
