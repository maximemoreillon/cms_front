<template>
  <div class="container" >

    <IconButton icon="mdi-pencil" v-on:buttonClicked="edit_article(article_data._id)"/>

    <!-- the article -->
    <article
      v-if="article_data"
      ref="article_content"
      v-html="article_data.content"/>

      <!-- Not founnd message -->
    <div class="icon_button" v-else>Article not found</div>



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

          setTimeout(this.add_event_listeners_for_image_modals,100);

        })
        .catch(error => alert(error))
      }
    },
    add_event_listeners_for_image_modals(){
      this.$refs.article_content.querySelectorAll('img').forEach(img => {
        img.addEventListener("click", event => {
          console.log(event.target.src)
          //this.modal_image_src = event.target.src
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

article {
  margin: 25px;
}


article img {
  /* test CSS for images */

  /*
  display: block;
  margin-left: auto;
  margin-right: auto;
  */
  float: right;
  width: 200px;
  margin: 0 10px;
}


article pre {
  background-color: #222222;
  color: white;
  padding: 15px;
}

@media only screen and (max-width: 600px) {
  article img {
    /* test CSS for images */

    float: none;
    width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

</style>
