<template>

  <div class="article_editor_view">

    <div class="toolbar" v-if="article_data">

      <div class="dates_container">
        <div class="" v-if="article_data.creation_date">Published on {{format_date(article_data.creation_date)}}</div>
        <div class="" v-if="article_data.edit_date">Last edited on {{format_date(article_data.edit_date)}}</div>
      </div>

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
        v-bind:icon="article_data.published ? 'mdi-earth' : 'mdi-lock'"
        v-on:buttonClicked="toggle_published()"/>
    </div>

    <!-- wrapper for authentication detection -->
    <div class="" v-if="$store.state.user">
      <div class="toolbar">
        <!-- action buttons -->

      </div>

      <!-- editor for the content of the article -->
      <quill-editor
        ref="myQuillEditor"
        v-model="article_data.content"
        v-bind:options="editorOption"/>
    </div>
    <div class="" v-else>Article cannot be edited by unauthenticated user</div>



  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import {formatDate} from '@/mixins/formatDate.js'

export default {
  components: {
    IconButton,
  },
  mixins: [formatDate],
  data () {
    return {

      // Default values for an article, overwritten if loaded with axios
      article_data: {
        // default set to undefined for MongoDB
        _id: undefined,

        published: false,

        creation_date: new Date(),

        // Content edited in quill
        content: '',
      },

      editorOption: {
        modules: {
          clipboard: {
            matchVisual: false
          },
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'list': 'ordered'}, { 'list': 'bullet' }],
            [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
            [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
            //[{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
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
    // What is this used for?
    editor() {
      return this.$refs.myQuillEditor.quill
    }
  },
  mounted(){
    // If ID is prewsent in query, get the article corresponding to that ID
    if('_id' in this.$route.query){
      this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
      .then(response => {
        this.article_data = response.data
        // Add the date of edition
        this.article_data.edit_date = new Date();
      })
      .catch(error => alert(error))
    }
  }

}
</script>


<style>

.toolbar {
  margin: 10px 0;
  display: flex;
}
.right_aligned {
  margin-left: auto;
}
.dates_container{
  font-size: 80%;
  color: #444444;
}




</style>
