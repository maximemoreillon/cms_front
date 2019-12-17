<template>

  <div class="article_editor_view">



    <!-- wrapper for authentication detection -->
    <div class="authentication_wrapper" v-if="$store.state.user">

      <Toolbar v-if="article_data">

        <div class="dates_container">
          <div class="" v-if="article_data.creation_date">Published on {{format_date(article_data.creation_date)}}</div>
          <div class="" v-if="article_data.edit_date">Last edited on {{format_date(article_data.edit_date)}}</div>
        </div>

        <div class="category_container">
          <label for="category_search">Category: </label>
          <input
            id="category_search"
            type="search"
            list="category_list"
            v-model="article_data.category"/>
        </div>

        <div class="growing_spacer"/>


        <datalist id="category_list">
          <option
            v-for="(category, i) in $store.state.categories"
            v-bind:value="category"
            v-bind:key="i"/>
        </datalist>

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


      <!-- editor for the content of the article -->
      <quill-editor
        class="editor"
        v-model="article_data.content"
        v-bind:options="editorOption"/>

    </div>
    <div class="" v-else>Article cannot be edited by unauthenticated user</div>



  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import {formatDate} from '@/mixins/formatDate.js'
import Toolbar from '@/components/Toolbar.vue'

export default {
  components: {
    IconButton,
    Toolbar
  },
  mixins: [formatDate],
  data () {
    return {
      // Default values for an article, overwritten if loaded with axios
      article_data: {
        // default set to undefined for MongoDB
        _id: undefined,

        published: false,
        category: "",

        creation_date: new Date(),

        // Content edited in quill
        content: '',
      },

      editorOption: {
        scrollingContainer: '#main', // prevents jumping back to top of editor when pasting
        theme: 'snow',
        bounds: '#main', // Preventing bubble from rendering behind nav
        modules: {

          imageDrop: true,
          /*
          imageResize: {
            modules: [ 'Resize', 'DisplaySize'  ]
          },
          */
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

            ['image', 'video'],

            ['clean']
          ],


        }

      }
    }
  },

  methods: {
    toggle_published(){
      this.article_data.published = !this.article_data.published;
    },
    submit_article(){
      this.axios.post('https://cms.maximemoreillon.com/edit_article', this.article_data)
      .then(response => {
        this.$router.push({ path: '/article', query: { _id: response.data._id } })
      })
      .catch(error => alert(error))
    },
    delete_article(){
      if(confirm('Delete article?')){
        this.axios.post('https://cms.maximemoreillon.com/delete_article', {_id: this.article_data._id})
        .then( () =>  this.$router.push({ path: '/article_list' }))
        .catch(error => alert(error))
      }

    },
    view_article(){
      this.$router.push({ path: 'article', query: { _id: this.article_data._id } })
    },
  },
  computed: {

  },
  mounted(){

    // If ID is present in query, get the article corresponding to that ID
    if('_id' in this.$route.query){
      this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
      .then(response => {

        if(response.data){
          this.article_data = response.data
          // Add the date of edition
          this.article_data.edit_date = new Date();
        }

      })
      .catch(error => alert(error))
    }

  }

}
</script>


<style>


.editor{
  margin-top: 15px;
  /* SUPER DIRTY */
  height: 75vh;
}





</style>
