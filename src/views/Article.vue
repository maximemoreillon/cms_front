<template>
  <!-- Wrapping in a div so that modal is not affected by CSS -->
  <div class="article_wrapper">
    <!-- Using schema.org -->
    <article
      v-if="article && !article_loading"
      itemscope
      itemtype="http://schema.org/Article">

      <!-- Meta tags for SEO -->
      <meta itemprop="publisher" content="Maxime Moreillon">
      <meta itemprop="image" content="/logo.png">
      <meta
        itemprop="datePublished"
        :content="format_date_for_meta(article.authorship.creation_date)">
      <meta
        itemprop="dateModified"
        :content="format_date_for_meta(article.authorship.edition_date)">

      <h1
        itemprop="name headline"
        :content="article.title">
        {{article.title || 'Untitled article'}}
      </h1>

      <ArticleMetadata :article="article" />

      <!-- the article content -->
      <div
        ref="article_content"
        class="article_content"
        v-html="article.content"/>

    </article>

    <!-- Loaders and error messages -->
    <div
      class="loader_container"
      v-else-if="article_loading">
      <Loader />
    </div>

    <div
      class="error"
      v-if="error">
      An error occured while loading articles
    </div>

    <div
      class="error"
      v-if="!article_loading && !error && !article">
      Article {{article_id}} not found
    </div>

    <!-- modal for images -->
    <Modal
      v-if="article"
      v-bind:open="modal.open"
      v-on:close="modal.open = false">

      <img
        class="modal_image"
        v-bind:src="modal.image_src"
        :alt="article.title"/>

    </Modal>

  </div>

</template>

<script>

import Loader from '@moreillon/vue_loader'
import Modal from '@moreillon/vue_modal'

import ArticleMetadata from '@/components/ArticleMetadata.vue'


import {formatDate} from '@/mixins/formatDate.js'
import IdUtils from '@/mixins/IdUtils'

import {set_article_seo} from '@/seo.js'



export default {
  name: 'Article',
  components: {
    ArticleMetadata,
    Modal,
    Loader,
  },
  mixins: [
    formatDate,
    IdUtils,
  ],
  data () {
    return {

      article: null,
      article_loading: false,
      error: null,


      modal: {
        open: false,
        image_src: "",
      }

    }
  },

  mounted() {
    this.get_article()
  },
  beforeDestroy() {
    //document.title = `CMS - Maxime MOREILLON`
  },
  methods: {

    get_article(){


      if(!this.article_id) return

      this.article_loading = true;


      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/v1/articles/${this.article_id}`)
      .then( ({data: article}) => {

        this.article = article

        setTimeout(this.add_event_listeners_for_image_modals,100)

        // SEO config
        set_article_seo(this.article)


      })
      .catch(error => {

        this.error = true
        if(error.response) console.error(error.response.data)
        else console.error(error)

      })
      .finally( () => { this.article_loading = false })
    },

    add_event_listeners_for_image_modals(){
      this.$refs.article_content
        .querySelectorAll('img')
        .forEach(img => {
          img.addEventListener("click", event => {
            this.modal.open = true;
            this.modal.image_src = event.target.src;
          }, false)
        })
    },

    format_date_for_meta({day,month,year}){
      // TODO: Move with date utils mixin
      return [
        year,
        month.toString().padStart(2,'0'),
        day.toString().padStart(2,'0'),
      ].join('-');

    }
  },
  computed: {
    article_id(){
      // Accounting for legacy routes
      return this.$route.params.article_id
        || this.$route.params.id
        || this.$route.query.article_id
        || this.$route.query.id
    },
    editable(){
      const article_id = this.$route.params.article_id
        || this.$route.params.id
        || this.$route.query.article_id
        || this.$route.query.id

      // If there is no article ID, then nothing to edit
      if(!article_id) return false

      const current_user = this.$store.state.current_user

      // If the user is not logged in, then unable to edit
      if(!current_user) return false

      if(current_user.isAdmin) return true

      const current_user_id = this.get_id_of_item(current_user)

      // If article does not have no author, then nothing to edit
      if(!this.article.author) return false

      const author_id = this.get_id_of_item(this.article.author)

      return (author_id === current_user_id)
    }
  }

}
</script>


<style scoped>

.modal_image {
  max-width: calc(100vw - 8em);
  max-height: calc(100vh - 8em);
  margin: 1em;
  object-fit: contain;
}

</style>
