<template>

  <div class="article_editor_view">

    <template v-if="$store.state.current_user && !article_loading">

      <Toolbar>


        <IconButton
          v-on:click="$router.push({ name: 'article', params: { article_id } })">
          <arrow-left-icon />
          <span>Return</span>
        </IconButton>


        <div class="growing_spacer"/>


        <IconButton
          v-on:click="submit_article()">
          <content-save-icon />
          <span>Save</span>
        </IconButton>

        <IconButton
          v-if="article_id"
          v-on:click="delete_article()">
          <delete-icon />
          <span>Delete</span>
        </IconButton>


      </Toolbar>

      <div class="tags_and_visibility_wrapper">
        <!-- Tags -->
        <div class="tags_wrapper">

          <label>
            <tag-icon />
          </label>

          <Tag
            v-for="(tag, index) in article.tags"
            v-bind:key="`tag_${index}`"
            v-bind:tag="tag"
            removable
            v-on:remove="delete_tag(index)"/>

            <!-- Why ID? -->
          <input
            id="tag_search"
            type="search"
            ref="tag_input"
            list="existing_tag_list"
            placeholder="New tag"
            v-on:keyup.enter="create_tag()">

          <datalist id="existing_tag_list">
            <option
              v-for="(existing_tag, index) in existing_tags"
              v-bind:value="existing_tag.name"
              v-bind:key="`existing_tag_${index}`"/>
          </datalist>

        </div>

        <!-- Visibility -->
        <div class="visibility_wrapper">
          <div>
            <input
              type="radio"
              id="private"
              :value="false"
              v-model="article.published">
            <label for="private">
              <lock-icon/>
              <span>Private</span>
            </label>
          </div>
          <div>
            <input
              type="radio" id="public"
              :value="true"
              v-model="article.published">
            <label for="public">
              <earth-icon/>
              <span>Public</span>
            </label>
          </div>
        </div>
      </div>




      <!-- editor for the content of the article -->
      <EditorToolBar
        :editor="editor" />

      <!-- the article being written comes here -->
      <editor-content
        class="editor_content article_content"
        :editor="editor"/>

    </template>

    <!-- loader -->
    <div
      class="loader_container"
      v-if="$store.state.current_user && article_loading">
      <Loader />
    </div>

    <div class="" v-if="!$store.state.current_user">
      Articles cannot be edited by unauthenticated user
    </div>

    <!-- TODO: Add case for article not found -->




  </div>


</template>

<script>

import Loader from '@moreillon/vue_loader'

import {formatDate} from '@/mixins/formatDate.js'

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import EditorToolBar from '@/components/EditorToolBar.vue'
import Toolbar from '@/components/Toolbar.vue'
import Tag from '@/components/Tag.vue'

import { Editor, EditorContent } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  //TodoItem,
  //TodoList,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Placeholder,
  Image,
} from 'tiptap-extensions'

import Iframe from '@/misc/Iframe.js'
import IdUtils from '@/mixins/IdUtils'


export default {
  name: 'ArticleEditor',
  components: {
    Toolbar,
    Loader,
    Tag,
    IconButton,
    EditorToolBar,
    EditorContent,
  },
  mixins: [
    formatDate,
    IdUtils,
  ],
  data () {
    return {

      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          //new TodoItem(),
          //new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),
          new Iframe(), // For Youtube videos
          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),
        ],

        disablePasteRules:true, // disable Markdown when pasting
        disableInputRules:true, // disable Markdown when typing

        content: "", // The actual content of the editor



      }),

      // Default values for an article, overwritten if loaded with axios
      // This gets sent to the DB
      article: {

        content: null,
        published: false,

        // Article metadata (generated when inputing data)
        title: '',
        summary: '',
        thumbnail_src: '',

        tags: [],

      },


      article_loading: true, // set to true because otherwise tiptap errors
      article_error: null,

      // The list of all tags used by any article
      existing_tags: [],




    }
  },

  mounted(){
    this.get_article_if_exists()
    this.get_existing_tags()
    document.addEventListener("keydown", this.handle_keydown)
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
    document.removeEventListener("keydown", this.handle_keydown)
  },

  methods: {
    get_article_if_exists(){
      // If ID is present in query, get the article corresponding to that ID
      const article_id = this.$route.params.id || this.$route.params.article_id

      if(!article_id || article_id === 'new') {
        this.article_loading = false
        return
      }


      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/v1/articles/${article_id}/`)
      .then( ({data: article}) => {

        this.article = article

        this.editor.setContent(this.article.content)

        if(this.article.title) document.title = `${this.article.title} - Maxime MOREILLON`


      })
      .catch(error => {
        console.error(error)
        alert(error.response.data)
      })
      .finally( () => {
        // unflag loading
        this.article_loading = false
      })

    },

    toggle_published(){
      this.article.published = !this.article.published
    },
    submit_article(){

      // Show loader to prevent user from re-submitting
      this.article_loading = true;

      // Parse the article to find metadata
      this.article.content = this.editor.getHTML()
      this.set_article_title()
      this.set_article_summary()
      this.set_article_thumbnail_src()

      // if the article has an ID, UPDATE
      if(this.article.identity || this.article._id) this.update_article()

      // If the article does not have an ID, CREATE
      else this.create_article()

    },
    create_article(){

      const url = `${process.env.VUE_APP_CMS_API_URL}/v1/articles`
      const body = {
        ...this.article,
        tag_ids: this.article.tags.map(tag => this.get_id_of_item(tag)),
      }

      this.axios.post(url, body )
      .then(({data:article}) => {
        const article_id = this.get_id_of_item(article)
        this.$router.push({ name: 'article', params: { article_id } })
      })
      .catch(error => {
        this.article_loading = false
        console.error(error)
        alert(`Error while creating the article`)
      })
      .finally(() => {
        this.article_loading = false
      })
    },
    update_article(){
      const article_id = this.get_id_of_item(this.article)
      const url = `${process.env.VUE_APP_CMS_API_URL}/v1/articles/${article_id}`


      const body = {
        ...this.article,
        tag_ids: this.article.tags.map(tag => this.get_id_of_item(tag)),
      }

      this.axios.put(url, body)
      .then( ({data: article}) => {
        // redirect to article
        const article_id = this.get_id_of_item(article)
        this.$router.push({ name: 'article', params: { article_id } })
      })
      .catch(error => {
        console.error(error)
        alert(`Error while updating the article`)
      })
      .finally(() => {
        this.article_loading = false
      })
    },
    delete_article(){
      if(!confirm('Delete article?')) return

      this.article_loading = true
      const article_id = this.get_id_of_item(this.article)
      this.axios.delete(`${process.env.VUE_APP_CMS_API_URL}/v1/articles/${article_id}`)
      .then( () => {
        this.$router.push({ name: 'article_list' })
      })
      .catch(error => {
        console.error(error)
        alert(`Error while deleting the article`)
      })
      .finally(() => {
        this.article_loading = false
      })

    },
    create_tag(){
      if(!this.$refs.tag_input.value.length) return
      const url = `${process.env.VUE_APP_CMS_API_URL}/v1/tags`
      const body = { name: this.$refs.tag_input.value }
      this.axios.post(url, body)
      .then(({data: tag}) => {
        this.article.tags.push(tag)
        this.$refs.tag_input.value = ""
      })
      .catch(error => {
        alert(error.response.data)
      })
    },
    delete_tag(index){
      this.tags.splice(index,1)
    },
    get_existing_tags(){

      const url = `${process.env.VUE_APP_CMS_API_URL}/v1/tags/`
      this.axios.get(url)
      .then(({data: tags}) => { this.existing_tags = tags })
      .catch(error => alert(error))
    },

    set_article_title(){
      // get article title from content (first h1 tag of the content)
      const virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.content
      const first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1) this.article.title = first_h1.innerHTML
      else this.article.title = null
    },
    set_article_summary(){
      // get article summary from content (first p tag of the content)
      const virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) this.article.summary = first_p.innerHTML
      else this.article.summary = null
    },
    set_article_thumbnail_src(){
      // get article thumbnail from content (first img tag of the content)
      const virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.content
      const first_img = virtual_container.getElementsByTagName('img')[0]
      if(first_img) this.article.thumbnail_src = first_img.src
      else this.article.thumbnail_src = null
    },
    handle_keydown(e){
      // Keyboard events

      // CTRL S
      if (e.key === 's' && e.ctrlKey) {
        e.preventDefault()
        this.submit_article()
      }

    },
  },
  computed: {
    current_user(){
      return this.$store.state.current_user
    },
    article_id(){
      return this.get_id_of_item(this.article)
    }
  }


}
</script>


<!-- not scoped so as to affect embedded components -->
<style>

.menubar, .editor_content {
  margin-top: 0.5em;
}
.menubar{
  position: sticky;
  border: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  font-size: 150%;
}

.editor_content{
  border: 1px solid #dddddd;

  /* 80vh should give confortable writing space and still keep the menubar visible */
  max-height: 80vh;

  overflow-y: auto;
  //padding: 0.5em;
}

.ProseMirror {
  padding: 0.5em;
}


/* Used for the placeholder */
.editor_content p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}



.tags_and_visibility_wrapper {
  display: flex;
}

/* TAGS */
.tags_wrapper {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.tags_wrapper > * {
  margin: 5px;
}

#tag_search{
  border: none;
  border-bottom: 1px solid #444444;
}

.visibility_wrapper > * {
  display: flex;
}
.visibility_wrapper label{
  white-space: nowrap;
}



</style>
