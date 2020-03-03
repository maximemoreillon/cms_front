<template>
  <div class="container" >

    <!-- Toolbar, currently just for edit button -->
    <Toolbar v-if="article">

      <div class="dates_container" v-if="article">
        <div class="" v-if="article.creation_date">Created: {{format_date(article.creation_date)}}</div>
        <div class="" v-if="article.edit_date">Last edited: {{format_date(article.edit_date)}}</div>
      </div>

      <!-- publish indicator -->
      <div
        class="published_indicator"
        v-if="article.published && $store.state.logged_in">
        <earth-icon class="publishing_status"/>
        <span>Published</span>
      </div>

      <div class="category_wrapper">
        <span class="article_category" v-if="! ('category' in $route.query) && article.category">
          Category: {{article.category}}
        </span>

        <span class="article_category" v-else-if="! ('category' in $route.query)">Uncategorized</span>
      </div>




      <!-- Tags -->
      <div class="tags_wrapper">
        <span>Tags: </span>
        <Tag
          v-for="(tag, tag_index) in article.tags"
          v-bind:key="tag_index"
          v-bind:label="tag"
          searchable/>
      </div>


      <div class="growing_spacer"/>

      <IconButton
        v-if="$route.query._id"
        v-on:buttonClicked="$router.push({ name: 'article_list' })">
        <arrow-left-icon />
      </IconButton>

      <IconButton
        v-on:buttonClicked="download_as_html_file()"
        v-if="$store.state.logged_in">
        <download-icon />
      </IconButton>

      <IconButton
        v-on:buttonClicked="edit_article(article._id)"
        v-if="$store.state.logged_in">
        <pencil-icon />
      </IconButton>

    </Toolbar>






    <!-- the article content -->
    <article
      v-if="article"
      ref="article_content"
      v-html="article.content"/>

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

import Tag from '@/components/Tag.vue'

import {formatDate} from '@/mixins/formatDate.js'

import highlight from 'highlight.js'


import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';
import EarthIcon from 'vue-material-design-icons/Earth.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import DownloadIcon from 'vue-material-design-icons/Download.vue';



export default {
  components: {
    IconButton,
    Modal,
    Toolbar,
    Loader,
    Tag,

    // Icons
    EarthIcon,
    ArrowLeftIcon,
    PencilIcon,
    DownloadIcon
  },
  mixins: [formatDate],
  data () {
    return {
      article: null,
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
          this.article = response.data

          setTimeout(this.add_event_listeners_for_image_modals,100);


          setTimeout(() => {
            document.querySelectorAll('pre code').forEach((block) => {
              highlight.highlightBlock(block);
            })
          },10);




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
      a.href = window.URL.createObjectURL(new Blob([this.article.content], {type: 'text/html'}));
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
}



.modal_image {
  width: 60vw;
  height: 60vh;
  margin: 10px;
  object-fit: contain;
}

.published_indicator{
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 2px;
  display: flex;
  align-items: center;
}

.published_indicator > * {
  margin: 0 5px;
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
