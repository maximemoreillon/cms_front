<template>
  <div class="container" >

    <!-- Toolbar, currently just for edit button -->
    <!-- TODO: Wrap everything in v-if="article_data" -->
    <div class="toolbar" v-if="article_data">

      <div class="dates_container">
        <div class="" v-if="article_data.creation_date">Published on {{format_date(article_data.creation_date)}}</div>
        <div class="" v-if="article_data.edit_date">Last edited on {{format_date(article_data.edit_date)}}</div>
      </div>

      <IconButton
        class="right_aligned"
        icon="mdi-arrow-left"
        v-on:buttonClicked="$router.push({ path: 'article_list' })"/>

      <IconButton
        icon="mdi-pencil"
        v-on:buttonClicked="edit_article(article_data._id)"
        v-if="$store.state.user"/>

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
        alt=""/>
    </Modal>

  </div>


</template>

<script>

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import Modal from '@/components/vue_modal/Modal.vue'
import {formatDate} from '@/mixins/formatDate.js'

export default {
  components: {
    IconButton,
    Modal
  },
  mixins: [formatDate],
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

article {
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
