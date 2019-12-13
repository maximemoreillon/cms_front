<template>
  <div class="container" >

    <!-- the article -->
    <article
      v-if="article_data"
      class="article_content"
      ref="article_content"
      v-html="article_data.content"/>

      <!-- Not founnd message -->
    <div class="icon_button" v-else>Article not found</div>

    <IconButton icon="mdi-pencil" v-on:buttonClicked="edit_article(article_data._id)"/>

  </div>


</template>

<script>

import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  components: {
    IconButton
  },
  data () {
    return {
      article_data: null,

      modal_image_src: "",
    }
  },

  mounted() {
    this.get_content();
  },
  methods: {
    get_content(){
      if('_id' in this.$route.query){
        this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
        .then(response => {
          this.article_data = response.data
        })
        .catch(error => alert(error))
      }
    },
    add_event_listeners_for_image_modals(){
      this.$refs.article_content.querySelectorAll('img').forEach(img => {
        img.addEventListener("click", event => {
          console.log("alright")
          this.modal_image_src = event.target.src
        }, false)
      })
    },
    edit_article(_id){
      if('_id' in this.$route.query){
        this.$router.push({ path: 'article_editor', query: { _id: _id } })
      }
    },
  }

}
</script>


<style>


.article_content img {
  /* test CSS for images */
  outline: 1px solid red;
  display: block;
  margin-left: auto;
  margin-right: auto;
  max-width: 100px;
}



</style>
