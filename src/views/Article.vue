<template>
  <div class="container" >
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
        :article="article"
        :author="author"
        :authorship="authorship"/>


      <!-- Tags -->
      <div class="tags_container">
        <label>
          <tag-icon />
        </label>
        <template v-if="tags.length">
          <Tag
            class="tag"
            v-for="(tag, index) in tags"
            v-bind:key="`tag_${index}`"
            v-bind:tag="tag"/>
        </template>
        <span v-else>None</span>
      </div>

      <!-- the article itself -->
      <article
        class="article"
        v-if="article && !article_loading"
        ref="article_content"
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

  </div>


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

      tags: [],
      author: null,
      authorship: null,


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


      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/v3/articles/${this.article_id}`)
      .then( ({data: article}) => {

        this.article = article

        // a bit of a dirty trick
        this.tags = article.tags
        this.author = article.author
        this.authorship = article.authorship

        // this.tags = tags
        // this.author = author
        // this.authorship = authorship

        document.title = `${this.article.title} - CMS - Maxime MOREILLON`
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
      if(!this.author) return false

      const author_id = this.get_id_of_item(this.author)

      return (author_id === current_user_id)
    }
  }

}
</script>


<style scoped>

.edit_button{
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
  width: 80vw;
  height: 70vh;
  margin: 10px;
  object-fit: contain;
}

/* COMMENTS */
.comment_area_wrapper {
  border-top: 1px solid #dddddd;
  padding-top: 10px;
}

.new_comment_wrapper {
  border: 1px solid #dddddd;
  padding: 5px;
}
.new_comment_wrapper > * {
  margin: 5px 0;
}

.create_comment_button_wrapper {
  text-align: right;
}

.comments_wrapper {
  padding: 5px;
}

textarea {

  width: 100%;
  resize:vertical;
}

</style>
