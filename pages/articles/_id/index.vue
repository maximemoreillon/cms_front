<template>
  <!-- Wrapping in a div so that modal is not affected by CSS -->
  <div class="article_wrapper">

    <!-- Using schema.org for SEO -->
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

      <ArticleMetadata
        :article="article" />

      <!-- the article content -->
      <div
        ref="article_content"
        class="article_content"
        v-html="article.content"/>

    </article>

    <!-- Loaders and error messages -->
    <!-- <div
      class="loader_container"
      v-else-if="article_loading">
      <Loader />
    </div> -->

    <div
      class="error"
      v-if="error">
      An error occured while loading articles
    </div>

    <!-- <div
      class="error"
      v-if="!article_loading && !error && !article">
      Article {{article_id}} not found
    </div> -->


    <!-- modal for images -->
    <Modal
      v-if="article"
      :open="modal.open"
      @close="modal.open = false">

      <img
        class="modal_image"
        :src="modal.image_src"
        :alt="article.title">

    </Modal>

  </div>

</template>

<script>


import ArticleMetadata from '@/components/ArticleMetadata.vue'

// import Loader from '@moreillon/vue_loader'
import Modal from '@/components/Modal.vue'





export default {
  name: 'Article',
  modules: [
    '@nuxtjs/axios',
  ],
  components: {
    // Loader,
    Modal,
    ArticleMetadata,
  },

  async asyncData ( {$axios, params, $config: { apiUrl }} ){
    // Loading article server-side
    console.log('Getting article sever-side')
    const url = `${apiUrl}/v1/articles/${params.id}`
    const {data: article} = await $axios.get(url)
    return { article }
  },

  data () {
    return {

      // article is queried server-side

      article_loading: false,
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

      ]

    }
  },
  mounted(){
    //this.add_event_listeners_for_image_modals()
  },


  methods: {


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
      return [
        year,
        month.toString().padStart(2,'0'),
        day.toString().padStart(2,'0'),
      ].join('-');

    }
  },
  computed: {
    article_id(){
      return this.$route.params.id
    },
    editable(){
      const article_id = this.$route.params.article_id
        || this.$route.params.id
        || this.$route.query.article_id
        || this.$route.query.id

      // If there is no article ID, then nothing to edit
      if(!article_id) return false

      const current_user = this.$auth.user

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
