<template>

  <div class="article_editor_view">


    <input type="text" v-model="article_data.title" placeholder="Title">

    <input type="text" v-model="article_data.summary" placeholder="Summary">

    <input type="search" placeholder="Category">

    <IconButton icon="mdi-content-save" v-on:buttonClicked="submit()"/>

    <!-- edit for the content of the article -->
    <quill-editor
      ref="myQuillEditor"
      v-model="article_data.content"
      v-bind:options="editorOption"/>

    <div class="submit_button_container">



    </div>

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

        category: '',

        // Content edited in quill
        content: '',
      },

      editorOption: {

      }
    }
  },

  methods: {
    submit(){
      this.axios.post('https://cms.maximemoreillon.com/edit_article', this.article_data)
      .then(response => {
        this.$router.push({ path: '/article', query: { _id: response.data._id } })
      })
      .catch(error => alert(error))
    }
  },
  computed: {
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
      })
      .catch(error => alert(error))
    }
  }

}
</script>


<style>






</style>
