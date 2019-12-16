<template>
  <div class="container" >

    <div class="toolbar">
      <IconButton icon="mdi-pencil" v-on:buttonClicked="edit_article(article_data._id)"/>
    </div>

    <div class="article_metadata" v-if="article_data">

      <div class="" v-if="article_data.creation_date">Published on: {{article_data.creation_date}}</div>
      <div class="" v-if="article_data.edit_date">Last edited on: {{article_data.edit_date}}</div>

    </div>



    <!-- the article content -->
    <article
      v-if="article_data"
      ref="article_content"
      v-html="article_data.content"/>


    <div class="" v-else-if="article_loading">Loading...</div>
    <div class="" v-else>Article not found</div>

    <!-- modal for images -->
    <Modal
      v-bind:open="modal.open"
      v-on:close="modal.open = false">
      <img
        class="modal_image"
        v-bind:src="modal.image_src"
        alt="">
    </Modal>



  </div>


</template>

<script>

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import Modal from '@/components/vue_modal/Modal.vue'

export default {
  components: {
    IconButton,
    Modal
  },
  data () {
    return {
      article_data: null,
      article_loading: false,

      modal: {
        open: false,
        image_src: "",
      }
    }
  },

  mounted() {
    this.get_content();

  },
  methods: {
    get_content(){
      if('_id' in this.$route.query){
        this.article_loading = true;
        this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
        .then(response => {
          this.article_loading = false;
          this.article_data = response.data

          setTimeout(this.add_event_listeners_for_image_modals,100);

        })
        .catch(error => alert(error))
      }
    },
    add_event_listeners_for_image_modals(){
      this.$refs.article_content.querySelectorAll('img').forEach(img => {
        img.addEventListener("click", event => {
          this.modal.open = true;
          this.modal.image_src = event.target.src;
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

.modal_image {
  width: 60vw;
  margin: 10px;
}

@media only screen and (max-width: 600px) {
  article img {
    /* test CSS for images */

    float: none;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
}

</style>
