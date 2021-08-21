<template>
  <div class="container" >
    <template v-if="article">

      <router-link
        class="button edit_button"
        v-if="editable"
        :to="{ name: 'article_editor', query: { id: article.identity } }">
        <pencil-icon />
        <span>Edit</span>
      </router-link>

      <h1>{{article.properties.title || 'Untitled article'}}</h1>


      <ArticleMetadata :article="article"/>


      <!-- Tags -->
      <div class="tags_container">
        <label>Tags:</label>
        <template v-if="article.tags.length > 0">
          <Tag
            v-for="(tag) in article.tags"
            v-bind:key="tag.identity"
            v-bind:tag="tag"/>
        </template>
        <span v-else>None</span>
      </div>

      <!-- the article itself -->
      <article
        class="article"
        v-if="article && !article_loading"
        ref="article_content"
        v-html="article.properties.content"/>

      <!-- Comments -->
      <!---
      <div
        class="comment_area_wrapper"
        v-if="false">

        <div class="new_comment_wrapper" >

          <h2 class="">
            Leave a comment
          </h2>
          <div class="">
            <label>Name: </label>
            <input
              type="text"
              v-model="comment.properties.author"
              placeholder="Name">
          </div>
          <textarea
            v-model="comment.properties.content"
            placeholder="Comment"/>
          <div class="create_comment_button_wrapper">
            <IconButton
              v-on:buttonClicked="create_comment()">
              <send-icon/>
            </IconButton>
          </div>

        </div>

        <div class="comments_wrapper">

          <template v-if="comments.length > 0 && !comments_loading">
            <Comment
              class="comment"
              v-for="comment in comments"
              v-bind:comment="comment"
              v-bind:deletable="editable"
              v-on:deleted="get_comments_of_article()"
              v-bind:key="comment.identity"/>
          </template>
          <Loader v-else-if="comments_loading"/>
          <div v-else>No comments yet</div>


        </div>

      </div>
      -->

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
  ],
  data () {
    return {
      sending: false,

      article: null,
      article_loading: false,
      error: null,

      tags: [],

      comments: [],
      comments_loading: false,

      comment: {
        properties: {
          author: '',
          content: '',
        },
      },

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
    document.title = `CMS - Maxime MOREILLON`
  },
  methods: {

    get_article(){


      if(!this.article_id) return

      this.article_loading = true;


      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/v2/articles/${this.article_id}`)
      .then( ({data}) => {
        this.article = data
        document.title = `${this.article.properties.title} - CMS - Maxime MOREILLON`
        setTimeout(this.add_event_listeners_for_image_modals,100)
      })
      .catch(error => {

        this.error = true
        if(error.response) console.error(error.response.data)
        else console.error(error)

      })
      .finally( () => { this.article_loading = false })
    },

    /*
    create_comment(){
      this.axios.post(`${process.env.VUE_APP_CMS_API_URL}/comments`, {
        article_id: this.article.identity,
        comment: this.comment,
      })
      .then( () => {

        // clear inputs
        this.comment.properties.author = ''
        this.comment.properties.content = ''

        this.get_comments_of_article()

      })
      .catch(error => alert(error.response.data))

    },
    */



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
      let article_id = this.$route.params.article_id
        || this.$route.params.id
        || this.$route.query.article_id
        || this.$route.query.id

      // If there is no article ID, then nothing to edit
      if(!article_id) return false

      const current_user = this.$store.state.current_user

      // If the user is not logged in, then unable to edit
      if(!current_user) return false

      if(current_user.properties.isAdmin) return true

      const current_user_id = current_user.identity.low || current_user.identity // new version has no .low

      // If article does not have no author, then nothing to edit
      if(!this.article.author) return false

      return (this.article.author.identity === current_user_id)
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
  align-items: baseline;
}




.tags_container > * {
  margin-top: 0.5em;
}

.tags_container label {
  margin-right: 0.5em;
}



.modal_image {
  width: 80vw;
  height: 80vh;
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
