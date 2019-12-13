<template>

  <div class="article_editor_view">

    <input type="text" v-model="article_data.title" placeholder="Title">

    <quill-editor
      ref="myQuillEditor"
      v-model="article_data.content"
      v-bind:options="editorOption"/>

    <div class="submit_button_container">
      <button type="button" v-on:click="submit()">submit</button>

    </div>

  </div>


</template>

<script>



//Quill.register('modules/imageResize', ImageResize);

export default {
  data () {
    return {

      article_data: {
        // default set to undefined
        _id: undefined,
        title: "",
        summary: "",
        content: 'test',
      },

      editorOption: {

      }
    }
  },

  methods: {
    submit(){
      this.axios.post('https://cms.maximemoreillon.com/edit_article', this.article_data)
      .then(response => {
        console.log(response.data)
        this.$router.push('/article_list')
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
