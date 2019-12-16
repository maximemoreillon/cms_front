<template>

  <div class="article_editor_view">


    <input type="text" v-model="article_data.title" placeholder="Title">
    <input type="text" v-model="article_data.summary" placeholder="Summary">
    <label for="">Public</label> <input type="checkbox">
    <input type="search" placeholder="Category">

    <!-- action buttons -->
    <IconButton icon="mdi-content-save" v-on:buttonClicked="submit_article()"/>
    <IconButton icon="mdi-delete" v-on:buttonClicked="delete_article()"/>

    <!-- edit for the content of the article -->
    <quill-editor
      ref="myQuillEditor"
      v-model="article_data.content"
      v-bind:options="editorOption"/>


  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  components: {
    IconButton,
  },
  data () {
    return {

      // Default values for an article, overwritten if loaded with axios
      article_data: {
        // default set to undefined for MongoDB
        _id: undefined,

        title: '',
        summary: '',

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
            [{ 'direction': 'rtl' }],                         // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['image', 'video'],

            ['clean']
          ],


        }

      }
    }
  },

  methods: {
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
    edit_article(_id){
      this.$router.push({ path: 'article_editor', query: { _id: _id } })
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






</style>
