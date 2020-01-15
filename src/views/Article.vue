<template>
  <div class="container" >

    <!-- Toolbar, currently just for edit button -->
    <Toolbar v-if="article_data">

      <div class="dates_container" v-if="article_data">
        <div class="" v-if="article_data.creation_date">Created: {{format_date(article_data.creation_date)}}</div>
        <div class="" v-if="article_data.edit_date">Last edited: {{format_date(article_data.edit_date)}}</div>
      </div>

      <!-- publish indicator -->
      <span
        class="mdi mdi-earth published_indicator"
        v-if="article_data.published && $store.state.user">
        Published
      </span>

      <div class="growing_spacer"/>

      <IconButton
        class="right_aligned"
        icon="mdi-arrow-left"
        v-on:buttonClicked="$router.push({ path: 'article_list' })"/>

      <IconButton
        icon="mdi-download"
        v-on:buttonClicked="download_as_html_file()"
        v-if="$store.state.user"/>

      <IconButton
        icon="mdi-pencil"
        v-on:buttonClicked="edit_article(article_data._id)"
        v-if="$store.state.user"/>

    </Toolbar>






    <!-- the article content -->
    <article
      v-if="article_data"
      ref="article_content"
      v-html="article_data.content"/>

    <!-- messages when no content -->
    <Loader v-else-if="article_loading"/>
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
import Toolbar from '@/components/Toolbar.vue'
import Loader from '@/components/vue_loader/Loader.vue'

import {formatDate} from '@/mixins/formatDate.js'

export default {
  components: {
    IconButton,
    Modal,
    Toolbar,
    Loader
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
    download_as_html_file(){
      var a = window.document.createElement('a');
      a.href = window.URL.createObjectURL(new Blob([this.article_data.content], {type: 'text/html'}));
      a.download = 'test.html';

      // Append anchor to body.
      document.body.appendChild(a);
      a.click();

      // Remove anchor from body
      document.body.removeChild(a);
    }
  }

}
</script>


<style>


article {
}

article iframe {
  display: block;
  margin-left: auto;
  margin-right: auto;
}

article img {
  /* test CSS for images */


  display: block;
  margin-left: auto;
  margin-right: auto;

  /*
  float: right;
  width: 200px;
  margin: 0 10px;
  */
  cursor: pointer !important;
}


article pre {
  /* white-space: pre-wrap; */
  overflow-x: auto;

  background-color: #222222;
  color: white;
  padding: 15px;
}

article a {
  font-weight: bold;
  text-decoration: none;
  color: #c00000;
}

.modal_image {
  width: 60vw;
  margin: 10px;
}

.published_indicator{
  border: 1px solid #444444;
  border-radius: 5px;
  padding: 5px;
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
