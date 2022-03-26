<template>
  <article class="container" >
    <template v-if="article">

      <router-link
        class="button edit_button"
        v-if="editable"
        :to="{ name: 'article_editor', params: { id: get_id_of_item(article) } }">
        <pencil-icon />
        <span>Edit</span>
      </router-link>

      <h1>{{article.title || 'Untitled article'}}</h1>


      <ArticleMetadata
        :article="article" />


      <!-- Tags -->
      <!-- Could be part of metadata -->
      <div class="tags_container">
        <label>
          <tag-icon />
        </label>
        <template v-if="article.tags.length">
          <Tag
            class="tag"
            v-for="(tag, index) in article.tags"
            v-bind:key="`tag_${index}`"
            v-bind:tag="tag"/>
        </template>
        <span v-else>None</span>
      </div>

      <!-- the article itself -->
      <div
        ref="article_content"
        class="article_content"
        v-if="article && !article_loading"
        v-html="article.content"/>

    </template>

    <!-- messages when no content -->
    <div class="loader_container" v-else-if="article_loading">
      <Loader />
    </div>

    <div class="error" v-if="error">
      Error loading article
    </div>


    <div
      class="error"
      v-if="!article_loading && !error && !article">
      Article not found
    </div>


    <!-- modal for images -->
    <Modal
      v-bind:open="modal.open"
      v-on:close="modal.open = false">

      <img
        class="modal_image"
        v-bind:src="modal.image_src"
        alt=""/>

    </Modal>

  </article>
</template>

<script>

import Loader from '@moreillon/vue_loader'
import Modal from '@moreillon/vue_modal'

//import IconButton from '@/components/vue_icon_button/IconButton.vue'

import Tag from '@/components/Tag.vue'
import ArticleMetadata from '@/components/ArticleMetadata.vue'

//import Comment from '@/components/Comment.vue'

import {formatDate} from '@/mixins/formatDate.js'
import IdUtils from '@/mixins/IdUtils'

// Not using Highlight JS anymore due to poor consistency
//import highlight from 'highlight.js'



export default {
  components: {
    //IconButton,
    ArticleMetadata,
    Modal,
    Loader,
    Tag,
    // Author,
    //Comment,

  },
  mixins: [
    formatDate,
    IdUtils,
  ],
  data () {
    return {
      sending: false,

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

        document.title = `${this.article.title} - Maxime MOREILLON`
        setTimeout(this.add_event_listeners_for_image_modals,100)
      })
      .catch(error => {

        this.error = true
        if(error.response) console.error(error.response.data)
        else console.error(error)

      })
      .finally( () => { this.article_loading = false })
    },

    add_event_listeners_for_image_modals(){
      this.$refs.article_content.querySelectorAll('img').forEach(img => {
        img.addEventListener("click", event => {
          this.modal.open = true;
          this.modal.image_src = event.target.src;
        }, false)
      })
    },
  },
  computed: {
    article_id(){
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



.edit_button{
  /* Button should be somewhere else */
  float: right;
  margin-top: 0.25em;
}

.tags_container {
  font-size: 85%;
  color: #666666;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}


.tags_container > * {
  /* Margin top for when tags occupy two rows */
  margin-top: 0.5em;
  margin-right: 0.5em;
}



.modal_image {
  max-width: 70vw;
  max-height: 70vh;
  margin: 1em;
  object-fit: contain;
  filter: drop-shadow(2.5px 2.5px 5px #44444444); /* Using filter because of object fit contain */
}



</style>
