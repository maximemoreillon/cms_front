<template>
  <!-- Wrapping in a div so that modal is not affected by CSS -->
  <div class="article_wrapper">
    <!-- Using schema.org for SEO -->
    <article
      v-if="article"
      itemscope
      itemtype="http://schema.org/Article"
    >
      <!-- Meta tags for SEO -->
      <meta itemprop="publisher" content="Maxime Moreillon">
      <meta itemprop="image" content="/logo.png">
      <meta
        itemprop="datePublished"
        :content="format_neo4j_date(article.authorship.creation_date, '-')"
      >
      <meta
        itemprop="dateModified"
        :content="format_neo4j_date(article.authorship.edition_date, '-')"
      >

      <!-- Article title -->
      <h1
        itemprop="name headline"
        :content="article.title"
      >
        {{ article.title || 'Untitled article' }}
      </h1>

      <ArticleMetadata
        :article="article"
      />

      <!-- the article content -->
      <div
        ref="article_content"
        class="article_content"
        v-html="article.content"
      ></div>
    </article>

    <div
      v-if="error"
      class="error">
      An error occured while loading the article
    </div>


    <!-- modal for images -->
    <Modal
      v-if="article"
      :open="modal.open"
      @close="modal.open = false"
    >
      <img
        class="modal_image"
        :src="modal.image_src"
        :alt="article.title"
      >
    </Modal>
  </div>
</template>

<script>


import ArticleMetadata from '@/components/ArticleMetadata.vue'
import Modal from '@/components/Modal.vue'

import dateUtils from '@/mixins/dateUtils'


export default {
  name: 'Article',
  modules: [
    '@nuxtjs/axios',
  ],
  auth: false,
  components: {
    Modal,
    ArticleMetadata,
  },
  mixins: [
    dateUtils
  ],

  async asyncData({ $axios, params, $config } ){
    // Loading article server-side
    
    try {
      const url = `${$config.apiUrl}/articles/${params.id}`
      const article = await $axios.$get(url)
      return { article }
    } catch (error) {
      console.error(error)
      return { error }
    }
    
    
  },

  data () {
    return {

      // article is queried server-side
      article: null,
      error: null,

      modal: {
        open: false,
        image_src: "",
      }

    }
  },

  

  head(){
    return {
      title: this.article?.title,

      meta: [
        { hid: 'description', name: 'description', content: this.article?.summary },
        
        // Twitter
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary' },
        { hid: 'twitter:site', name: 'twitter:site', content: '@m_moreillon' },
        { hid: 'twitter:title', name: 'twitter:title', content: this.article?.title },
        { hid: 'twitter:description', name: 'twitter:description', content: this.article?.summary },
        { hid: 'twitter:image', name: 'twitter:image', content: 'https://articles.maximemoreillon.com/logo.png' },
        { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: 'Maxime Moreillon logo' },

        // OpenGraph
        { hid: 'og:title', name: 'og:title', content: this.article?.title },
        { hid: 'og:description', name: 'og:description', content: this.article?.summary },
        { hid: 'og:image', name: 'og:image', content: 'https://articles.maximemoreillon.com/logo.png' },
        { hid: 'og:url', name: 'og:url', content: 'https://articles.maximemoreillon.com' }, // might need a review
        { hid: 'og:type', name: 'og:type', content: 'article' },
        { hid: 'og:locale', name: 'og:locale', content: 'en_US' },

      ]

    }
  },
  computed: {
    article_id(){
      return this.$route.params.id
    },
    editable(){

      // If there is no article ID, then nothing to edit
      if(!this.article_id) return false

      // If the user is not logged in, then unable to edit
      if (!this.$auth.user) return false

      // Admins can edit anything
      if (this.$auth.user.isAdmin) return true

      // If article does not have no author, then nothing to edit
      if(!this.article.author) return false


      return this.article.author._id === this.$auth.user._id
    }
  },
  mounted(){
    this.add_event_listeners_for_image_modals()
  },


  methods: {


    add_event_listeners_for_image_modals(){
      // Attaching modals to images
      const {article_content} = this.$refs
      if (!article_content) return

      article_content
        .querySelectorAll('img')
        .forEach(img => {
          img.addEventListener("click", event => {
            this.modal.open = true
            this.modal.image_src = event.target.src
          }, false)
        })
    },

  }

}
</script>


<style>
/* CSS for articles is shared with editor, hence in ~/assets/article.css, loaded fron nuxt.config.js */


.modal_image {
  max-width: calc(100vw - 8em);
  max-height: calc(100vh - 8em);
  margin: 1em;
  object-fit: contain;
}

</style>
