<template>
  <div class="container" >

    <!-- Toolbar, currently just for edit button -->
    <Toolbar v-if="article">

      <div class="dates_container">
        <div class="" v-if="article.properties.creation_date">Created: {{format_date(article.properties.creation_date)}}</div>
        <div class="" v-if="article.properties.edition_date">Edited: {{format_date(article.properties.edition_date)}}</div>
      </div>

      <!-- publish indicator -->
      <div
        class="published_indicator"
        v-if="article.properties.published && $store.state.logged_in">
        <earth-icon class="publishing_status"/>
        <span>Published</span>
      </div>

      <!-- Tags -->
      <!-- TODO: pass the complete record/node as prop -->
      <div class="tags_wrapper">
        <span>Tags: </span>
        <Tag
          v-for="tag in tags"
          v-bind:key="tag.identity.low"
          v-bind:tag="tag"/>
      </div>


      <div class="growing_spacer"/>

      <IconButton
        v-on:click="$router.push({ name: 'article_list' })">
        <arrow-left-icon />
      </IconButton>

      <IconButton
        v-on:click="download_as_html_file()"
        v-if="$store.state.logged_in">
        <download-icon />
      </IconButton>

      <IconButton
        v-on:click="$router.push({ path: 'article_editor', query: { id: article.identity.low } })"
        v-if="$store.state.logged_in && $route.query.id">
        <pencil-icon />
      </IconButton>

    </Toolbar>


    <!-- the article content -->
    <article
      v-if="article"
      ref="article_content"
      v-html="article.properties.content"/>

    <!-- messages when no content -->
    <Loader v-else-if="loading"/>
    <div v-else>Article not found</div>

    <!-- modal for images -->
    <!-- TODO: use the npm package -->
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
//import {parseArticleRecord} from '@/mixins/parseArticleRecord.js'

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
  mixins: [
    formatDate,
    //parseArticleRecord,
  ],
  data () {
    return {
      article: null,
      tags: [],
      loading: false,

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
      if('id' in this.$route.query){
        this.loading = true;


        this.axios.post(process.env.VUE_APP_API_URL + '/get_article_neo4j', {id: this.$route.query.id})
        .then(response => {

          this.loading = false;

          // parsing the article
          this.article = response.data[0]._fields[response.data[0]._fieldLookup['article']]

          setTimeout(this.add_event_listeners_for_image_modals,100);

          // Code highlight
          setTimeout(() => {
            document.querySelectorAll('pre code').forEach((block) => {
              highlight.highlightBlock(block);
            })
          },10);


          // parsing the tags
          response.data.forEach( record => {
            let tag = record._fields[record._fieldLookup['tag']]
            if(tag) this.tags.push(tag)

          });


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
