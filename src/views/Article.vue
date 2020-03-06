<template>
  <div class="container" >

    <!-- Toolbar, currently just for edit button -->
    <Toolbar v-if="article">

      <div class="dates_container">
        <div class="" v-if="article.properties.creation_date">Created: {{format_date(article.properties.creation_date)}}</div>
        <div class="" v-if="article.properties.edition_date">Edited: {{format_date(article.properties.edition_date)}}</div>
      </div>

      <!-- publish indicator -->
      <earth-icon
          v-if="article.properties.published && $store.state.logged_in"/>

      <!-- Author -->
      <div class="" v-if="author">Author: {{author.properties.username}}</div>


      <!-- Tags -->
      <div class="tags_wrapper" v-if="tags.length > 0 && !tags_loading">
        <Tag
          v-for="tag in tags"
          v-bind:key="tag.identity.low"
          v-bind:tag="tag"/>
      </div>
      <Loader class="" v-else-if="tags_loading"/>




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

      <!-- edit button -->
      <IconButton
        v-on:click="$router.push({ path: 'article_editor', query: { id: article.identity.low } })"
        v-if="editable">
        <pencil-icon />
      </IconButton>

      <IconButton
        v-if="$store.state.logged_in"
        v-on:buttonClicked="$router.push({ path: 'article_editor' })">
        <plus-icon/>
      </IconButton>

    </Toolbar>


    <!-- the article content -->
    <article
      v-if="article && !article_loading"
      ref="article_content"
      v-html="article.properties.content"/>

    <!-- messages when no content -->
    <Loader v-else-if="article_loading"/>
    <div v-else>Article not found</div>

    <!-- Comments, not implemented yet -->

    <div
      class="new_comment_wrapper"
      v-if="article && !article_loading">
      <div class="">
        Write a comment:
      </div>
      <div class="">
        <input
          type="text"
          v-model="comment.properties.author"
          placeholder="Name">
      </div>
      <div class="">
        <textarea
          v-model="comment.properties.content"
          placeholder="Comment"/>
      </div>
      <div class="">
        <button type="button" v-on:click="create_comment()">SEND</button>
      </div>



    </div>

    <div
      class="comments_wrapper"
      v-if="comments.length > 0 && !comments_loading">

      <div
        class="comment"
        v-for="comment in comments"
        v-bind:key="comment.identity.low">
        <div class="author">
          {{comment.properties.author}}
        </div>
        <div class="content">
          {{comment.properties.content}}
        </div>
        <div class="">
          <IconButton
            v-if="editable"
            v-on:buttonClicked="delete_comment(comment)">
            <delete-icon/>
          </IconButton>
        </div>
      </div>

    </div>

    <Loader v-else-if="comments_loading"/>
    <div v-else>No comments yet</div>





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
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';



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
    DownloadIcon,
    PlusIcon,
    DeleteIcon
  },
  mixins: [
    formatDate,
    //parseArticleRecord,
  ],
  data () {
    return {
      article: null,

      article_loading: false,

      tags: [],
      tags_loading: false,

      comments: [],
      comments_loading: false,

      comment: {
        properties: {
          author: '',
          content: '',
        },
      },

      author: null,


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
        this.article_loading = true;


        this.axios.post(process.env.VUE_APP_API_URL + '/get_article', {
          article_id: this.$route.query.id
        })
        .then(response => {

          this.article_loading = false;

          // parsing the article
          this.article = response.data[0]._fields[response.data[0]._fieldLookup['article']]

          // Make the images clickable to expand
          setTimeout(this.add_event_listeners_for_image_modals,100);

          // Code highlight
          setTimeout(() => {
            document.querySelectorAll('pre code').forEach((block) => {
              highlight.highlightBlock(block);
            })
          },10);


          this.get_tags_of_article()
          this.get_comments_of_article()
          this.get_author_of_article()


        })
        .catch(error => {
          this.article_loading = false;
          alert(error.response.data)
        })
      }
    },
    get_tags_of_article(){

      this.tags_loading = true
      this.tags.splice(0,this.tags.length)
      this.axios.post(process.env.VUE_APP_API_URL + '/get_tags_of_article', {
        article_id: this.article.identity.low
      })
      .then(response => {

        this.tags_loading = false

        // parsing the tags
        response.data.forEach( record => {
          let tag = record._fields[record._fieldLookup['tag']]
          if(tag) this.tags.push(tag)

        });
      })
      .catch(error => {
        this.tags_loading = false
        alert(error.response.data)
      } )

    },

    get_comments_of_article(){

      this.comments_loading = true
      this.comments.splice(0,this.comments.length)

      this.axios.post(process.env.VUE_APP_API_URL + '/get_comments_of_article', {
        article_id: this.article.identity.low
      })
      .then(response => {

        this.comments_loading = false

        // parsing the tags
        response.data.forEach( record => {
          let comment = record._fields[record._fieldLookup['comment']]
          if(comment) this.comments.push(comment)

        });
      })
      .catch(error => {
        this.comments_loading = false
        alert(error.response.data)
      } )

    },

    get_author_of_article(){

      this.axios.post(process.env.VUE_APP_API_URL + '/get_author_of_article', {
        article_id: this.article.identity.low
      })
      .then(response => {
        this.author = response.data[0]._fields[response.data[0]._fieldLookup['author']]
      })
      .catch(error => alert(error.response.data))

    },

    create_comment(){
      this.axios.post(process.env.VUE_APP_API_URL + '/create_comment', {
        article_id: this.article.identity.low,
        comment: this.comment,
      })
      .then( () => {
        this.comment.author = ''
        this.comment.content = ''

        this.get_comments_of_article()

      })
      .catch(error => alert(error.response.data))

    },

    delete_comment(comment){
      if(confirm('Delete comment?')){
        this.axios.post(process.env.VUE_APP_API_URL + '/delete_comment', {
          comment_id: comment.identity.low,
        })
        .then( () => {
          this.get_comments_of_article()
        })
        .catch(error => alert(error.response.data))
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
  },
  computed: {
    editable(){
      let user_is_author = false
      if(this.author) user_is_author = (this.author.properties.username === this.$store.state.username)
      return this.$store.state.logged_in && this.$route.query.id && user_is_author
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

.comment {
  margin: 10px 0;
  padding: 5px;
  border: 1px solid #dddddd;

  display: flex;
}

.comment .content {
  flex-grow: 1;
}

.comment .author {
  flex-basis: 200px;
}

</style>
