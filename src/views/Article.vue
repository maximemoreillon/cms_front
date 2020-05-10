<template>
  <div class="container" >

    <!-- Toolbar, currently just for edit button -->
    <Toolbar v-if="article">

      <div class="dates_container">
        <div class="" v-if="relationship.properties.creation_date">
          Created: {{format_date(relationship.properties.creation_date)}}
        </div>
        <div class="" v-if="relationship.properties.edition_date">
          Edited: {{format_date(relationship.properties.edition_date)}}
        </div>
      </div>

      <!-- publish indicator -->
      <earth-icon
          v-if="article.properties.published && $store.state.logged_in"/>

      <!-- Author -->
      Author: <Author v-bind:author="author"/>


      <!-- Tags -->
      <div
        class="tags_wrapper"
        v-if="tags.length > 0 && !tags_loading">
        <Tag
          v-for="tag in tags"
          v-bind:key="tag.identity.low"
          v-bind:tag="tag"/>
      </div>

      <Loader v-else-if="tags_loading"/>

      <div class="growing_spacer"/>

      <div class="tool_cluster">
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
      </div>



    </Toolbar>


    <!-- the article content -->
    <article
      v-if="article && !article_loading"
      ref="article_content"
      v-html="article.properties.content"/>

    <!-- messages when no content -->
    <Loader v-else-if="article_loading"/>
    <div v-else>Article not found</div>

    <!-- Comments -->
    <div
      class="comment_area_wrapper"
      v-if="article && !article_loading && false">

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
            v-bind:key="comment.identity.low"/>
        </template>
        <Loader v-else-if="comments_loading"/>
        <div v-else>No comments yet</div>


      </div>

    </div>









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

import Loader from '@moreillon/vue_loader'
import Modal from '@moreillon/vue_modal'

import IconButton from '@/components/vue_icon_button/IconButton.vue'
//import Modal from '@/components/vue_modal/Modal.vue'
import Toolbar from '@/components/Toolbar.vue'

import Tag from '@/components/Tag.vue'
import Author from '@/components/Author.vue'

import Comment from '@/components/Comment.vue'

import {formatDate} from '@/mixins/formatDate.js'
//import {parseArticleRecord} from '@/mixins/parseArticleRecord.js'

import highlight from 'highlight.js'


import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';
import EarthIcon from 'vue-material-design-icons/Earth.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
import DownloadIcon from 'vue-material-design-icons/Download.vue';
import PlusIcon from 'vue-material-design-icons/Plus.vue';
import SendIcon from 'vue-material-design-icons/Send.vue';



export default {
  components: {
    IconButton,
    Modal,
    Toolbar,
    Loader,
    Tag,
    Author,
    Comment,

    // Icons
    EarthIcon,
    ArrowLeftIcon,
    PencilIcon,
    DownloadIcon,
    PlusIcon,
    SendIcon
  },
  mixins: [
    formatDate,
    //parseArticleRecord,
  ],
  data () {
    return {
      sending: false,

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
      relationship: null,


      modal: {
        open: false,
        image_src: "",
      }
    }
  },

  mounted() {
    this.get_article();

  },
  methods: {

    get_article(){
      if('id' in this.$route.query){
        this.article_loading = true;


        this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/article?id=${this.$route.query.id}`)
        .then(response => {

          this.article_loading = false;

          let record = response.data[0]

          // parsing the article
          this.article = record._fields[record._fieldLookup['article']]
          this.author = record._fields[record._fieldLookup['author']]
          this.relationship = record._fields[record._fieldLookup['relationship']]

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
      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/tags_of_article?id=${this.$route.query.id}`)
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

      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/comments_of_article?id=${this.$route.query.id}`)
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



    create_comment(){
      this.axios.post(process.env.VUE_APP_CMS_API_URL + '/create_comment', {
        article_id: this.article.identity.low,
        comment: this.comment,
      })
      .then( () => {
        this.comment.properties.author = ''
        this.comment.properties.content = ''

        this.get_comments_of_article()

      })
      .catch(error => alert(error.response.data))

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


<style scoped>

.modal_image {
  width: 80vw;
  height: 80vh;
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

.tags_wrapper {
  display: flex;
  flex-wrap: wrap;
}

.tags_wrapper > * {

}


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

.tool_cluster {
  display: flex;
  flex-wrap: wrap;
}


textarea {
  width: 100%;
  resize:vertical;
}




</style>
VUE_APP_CMS_API_URL
