<template>

  <div class="article_editor_view">

    <template v-if="$store.state.current_user && !article_loading">

      <Toolbar>

        <div class="growing_spacer"/>

        <div class="tool_cluster tools">
          <IconButton
            v-if="$route.query.id"
            v-on:click="$router.push({ name: 'article', params: { article_id: $route.query.id } })">
            <arrow-left-icon />
          </IconButton>

          <IconButton
            v-else
            v-on:click="$router.push({ name: 'article_list' })">
            <arrow-left-icon />
          </IconButton>

          <IconButton
            v-if="false"
            v-bind:active="editable"
            v-on:click="editable = !editable">
            <pencil-icon/>
          </IconButton>

          <IconButton
            v-on:click="submit_article()">
            <content-save-icon />
          </IconButton>

          <IconButton
            v-if="article.identity"
            v-on:click="delete_article()">
            <delete-icon />
          </IconButton>

          <IconButton
            v-on:click="toggle_published()"
            v-bind:active="article.properties.published">
            <earth-icon/>
          </IconButton>
        </div>

      </Toolbar>

      <!-- Tags -->
      <div class="tags_wrapper">

        <label>Tags:</label>

        <Tag
          v-for="(tag, index) in tags"
          v-bind:key="tag.identity"
          v-bind:tag="tag"
          removable
          v-on:remove="delete_tag(index)"/>

        <input
          id="tag_search"
          type="search"
          ref="tag_input"
          list="existing_tag_list"
          placeholder="New tag"
          v-on:keyup.enter="create_tag()">

        <datalist id="existing_tag_list">
          <option
            v-for="existing_tag in existing_tags"
            v-bind:value="existing_tag.properties.name"
            v-bind:key="existing_tag.identity"/>
        </datalist>

      </div>


      <!-- editor for the content of the article -->
      <editor-menu-bar
        :editor="editor"
        v-slot="{ commands, isActive, getMarkAttrs }">

        <div class="menubar">

          <IconButton
            v-bind:active="isActive.bold()"
            @click="commands.bold">
            <format-bold-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.italic()"
            @click="commands.italic">
            <format-italic-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.strike()"
            @click="commands.strike">
            <format-strikethrough-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.underline()"
            @click="commands.underline">
            <format-underline-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.code()"
            @click="commands.code">
            <code-tags-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.paragraph()"
            @click="commands.paragraph">
            <format-paragraph-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.heading({ level: 1 })"
            @click="commands.heading({ level: 1 })">
            <format-header-1-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.heading({ level: 2 })"
            @click="commands.heading({ level: 2 })">
            <format-header-2-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.heading({ level: 3 })"
            @click="commands.heading({ level: 3 })">
            <format-header-3-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.bullet_list()"
            @click="commands.bullet_list">
            <format-list-bulleted-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.ordered_list()"
            @click="commands.ordered_list">
            <format-list-numbered-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.blockquote()"
            @click="commands.blockquote">
            <format-quote-close-icon />
          </IconButton>

          <IconButton
            v-bind:active="isActive.code_block()"
            @click="commands.code_block">
            <code-tags-icon />
          </IconButton>


          <IconButton
            @click="commands.undo">
            <undo-icon />
          </IconButton>

          <IconButton
            @click="commands.redo">
            <redo-icon />
          </IconButton>

          <IconButton
            v-on:click="showImagePrompt(commands.image)">
            <image-icon />
          </IconButton>

          <IconButton
            v-on:click="showVideoPromt(commands.iframe)">
            <youtube-icon />
          </IconButton>

          <IconButton
            v-bind:class="{ 'is-active': isActive.link() }"
            v-on:click="prompt_for_url(commands.link)">
            <link-icon />
          </IconButton>

        </div>
      </editor-menu-bar>

      <!-- the article being written comes here -->
      <editor-content
        class="editor_content article"
        v-bind:editor="editor"/>

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


    <!-- modal for images -->
    <Modal
      v-bind:open="image_upload_modal.open"
      v-on:close="image_upload_modal.open = false">

      <h2>Image upload</h2>
      <form
        class=""
        v-on:submit.prevent="image_upload()">
        <input type="file" ref="image_input" name="image">
        <input type="submit" name="">
      </form>

    </Modal>

  </div>


</template>

<script>

import Loader from '@moreillon/vue_loader'

import {formatDate} from '@/mixins/formatDate.js'

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import Toolbar from '@/components/Toolbar.vue'
import Tag from '@/components/Tag.vue'

import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  TodoItem,
  TodoList,
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

import Iframe from '@/components/Iframe.js'
import Modal from '@moreillon/vue_modal'


// Icons
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue'
import DeleteIcon from 'vue-material-design-icons/Delete.vue'
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue'
import EarthIcon from 'vue-material-design-icons/Earth.vue'
import CodeTagsIcon from 'vue-material-design-icons/CodeTags.vue'
import FormatHeader1Icon from 'vue-material-design-icons/FormatHeader1.vue'
import FormatHeader2Icon from 'vue-material-design-icons/FormatHeader2.vue'
import FormatHeader3Icon from 'vue-material-design-icons/FormatHeader3.vue'
import FormatParagraphIcon from 'vue-material-design-icons/FormatParagraph.vue'
import FormatBoldIcon from 'vue-material-design-icons/FormatBold.vue'
import FormatItalicIcon from 'vue-material-design-icons/FormatItalic.vue'
import FormatStrikethroughIcon from 'vue-material-design-icons/FormatStrikethrough.vue'
import FormatUnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue'
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue'
import FormatListNumberedIcon from 'vue-material-design-icons/FormatListNumbered.vue'
import FormatQuoteCloseIcon from 'vue-material-design-icons/FormatQuoteClose.vue'
import UndoIcon from 'vue-material-design-icons/Undo.vue'
import RedoIcon from 'vue-material-design-icons/Redo.vue'
import LinkIcon from 'vue-material-design-icons/Link.vue'
import PencilIcon from 'vue-material-design-icons/Pencil.vue'
import ImageIcon from 'vue-material-design-icons/Image.vue'
import YoutubeIcon from 'vue-material-design-icons/Youtube.vue'

export default {
  name: 'ArticleEditor',
  components: {

    Modal,

    Toolbar,
    Loader,
    Tag,
    IconButton,

    // editor
    EditorContent,
    EditorMenuBar,

    // Icons
    ArrowLeftIcon,
    DeleteIcon,
    ContentSaveIcon,
    //LockIcon,
    EarthIcon,
    CodeTagsIcon,
    FormatHeader1Icon,
    FormatHeader2Icon,
    FormatHeader3Icon,
    FormatBoldIcon,
    FormatItalicIcon,
    FormatStrikethroughIcon,
    FormatUnderlineIcon,
    FormatParagraphIcon,
    FormatListBulletedIcon,
    FormatListNumberedIcon,
    FormatQuoteCloseIcon,
    UndoIcon,
    RedoIcon,
    LinkIcon,
    //PlusIcon,
    PencilIcon,
    //PencilOffIcon,
    ImageIcon,
    YoutubeIcon,


  },
  mixins: [
    formatDate,
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
          new TodoItem(),
          new TodoList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Image(),

          new Placeholder({
            emptyEditorClass: 'is-editor-empty',
            emptyNodeClass: 'is-empty',
            emptyNodeText: 'Write something …',
            showOnlyWhenEditable: true,
            showOnlyCurrent: true,
          }),

          new Iframe(), // For Youtube videos
        ],
        disablePasteRules:true,
        editable: true,
        content: "",


      }), // end of new Editor ()



      // Default values for an article, overwritten if loaded with axios
      // This gets sent to the DB
      article: {

        identity: undefined,

        properties: {
          content: null,
          published: false,

          // Article metadata (generated when inputing data)
          title: '',
          summary: '',
          thumbnail_src: '',
        }
      },

      authorship: null,

      tags: [],

      editable: true,

      article_loading: true, // set to true because otherwise tiptap errors
      article_error: null,

      // The list of all tags used by any article
      existing_tags: [],

      image_upload_modal: {
        open: false,
      },


    }
  },
  watch: {
    // used for readonly mode
    editable() {
      this.editor.setOptions({
        editable: this.editable,
      })
    },
  },
  mounted(){
    this.get_article_if_exists()
    this.get_existing_tags()
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy()
  },

  methods: {
    get_article_if_exists(){
      // If ID is present in query, get the article corresponding to that ID
      let article_id = this.$route.query.id
        || this.$route.query.article_id
        || this.$route.params.id
        || this.$route.params.article_id

      if(!article_id || article_id === 'new') {
        this.article_loading = false
        return
      }

      // this gets titptap to throw errors
      //this.article_loading = true

      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/articles/${article_id}/`)
      .then(response => {

        let record = response.data[0]

        // parsing neo4j record for article
        this.article = record._fields[record._fieldLookup['article']]
        this.authorship = record._fields[record._fieldLookup['authorship']]
        this.tags = record._fields[record._fieldLookup['tags']]

        // Applying to content of editor
        this.editor.setContent(this.article.properties.content)

        // setting the document title
        document.title = `${this.article.properties.title} - Maxime MOREILLON`

      })
      .catch(error => {
        alert(error.response.data)
      })
      .finally( () => {
        // unflag loading
        this.article_loading = false
      })

    },

    toggle_published(){
      this.article.properties.published = !this.article.properties.published
    },
    submit_article(){

      // Show loader to prevent user from re-submitting
      this.article_loading = true;

      // Parse the article to find metadata
      this.article.properties.content = this.editor.getHTML()
      this.set_article_title()
      this.set_article_summary()
      this.set_article_thumbnail_src()

      // if the article has an ID, UPDATE
      if(this.article.identity) this.update_article()

      // If the article does not have an ID, CREATE
      else this.create_article()

    },
    create_article(){
      this.axios.post(`${process.env.VUE_APP_CMS_API_URL}/articles`, {
        article: this.article,
        tag_ids: this.tags.map(tag => tag.identity),
      })
      .then(response => {
        // redirect to article
        const article = response.data[0]._fields[response.data[0]._fieldLookup['article']]
        const article_id = article.identity
        this.$router.push({ name: 'article', params: { article_id: article_id } })
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
      this.axios.put(`${process.env.VUE_APP_CMS_API_URL}/articles/${this.article.identity}`, {
        properties: {
          content: this.article.properties.content,
          published: this.article.properties.published,
          title: this.article.properties.title,
          summary: this.article.properties.summary,
          thumbnail_src: this.article.properties.thumbnail_src,
        },
        tag_ids: this.tags.map(tag => tag.identity),
      })
      .then(response => {
        // redirect to article
        const article_id = response.data[0]._fields[response.data[0]._fieldLookup['article']].identity
        this.$router.push({ name: 'article', params: { article_id: article_id } })
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
      if(confirm('Delete article?')){
        this.article_loading = true
        this.axios.delete(`${process.env.VUE_APP_CMS_API_URL}/articles/${this.article.identity}`)
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
      }

    },


    create_tag(){
      if(this.$refs.tag_input.value.length > 0){
        this.axios.post(`${process.env.VUE_APP_CMS_API_URL}/tags`, {
          tag_name: this.$refs.tag_input.value
        })
        .then(response => {
          let tag = response.data[0]._fields[response.data[0]._fieldLookup['tag']]
          this.tags.push(tag)

        })
        .catch(error => {
          alert(error.response.data)
        })
      }

      this.$refs.tag_input.value = ""
    },
    delete_tag(index){
      this.tags.splice(index,1)
    },
    get_existing_tags(){


      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/tags/`)
      .then(response => {

        // Recreate list of tags
        this.existing_tags.splice(0,this.existing_tags.length)

        response.data.forEach( record => {
          let tag = record._fields[record._fieldLookup['tag']]
          this.existing_tags.push(tag)
        })
      })
      .catch(error => alert(error))
    },

    set_article_title(){
      // get article title from content (first h1 tag of the content)
      let virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.properties.content
      var first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1) this.article.properties.title = first_h1.innerHTML
      else this.article.properties.title = null
    },
    set_article_summary(){
      // get article summary from content (first p tag of the content)
      let virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.properties.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) this.article.properties.summary = first_p.innerHTML
      else this.article.properties.summary = null
      console.log()
    },
    set_article_thumbnail_src(){
      // get article thumbnail from content (first img tag of the content)
      let virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.properties.content
      var first_img = virtual_container.getElementsByTagName('img')[0]
      if(first_img) this.article.properties.thumbnail_src = first_img.src
      else this.article.properties.thumbnail_src = null
    },


    prompt_for_url(command){
      let url = prompt('URL:')
      if(url) command({ href: url })

    },

    showVideoPromt(command){
      const src = prompt('Enter the ID of your video here')
      if (src) command({ src })
    },

    showImagePrompt(command) {
      if(!process.env.VUE_APP_IMAGE_MANAGER_API_URL) {
        const src = prompt('Enter the url of your image here')
        if (src) command({ src })
        return
      }
      this.image_upload_modal.open = true

    },

    image_upload(){


      let formData = new FormData();
      formData.append('image', this.$refs.image_input.files[0])
      const url = `${process.env.VUE_APP_IMAGE_MANAGER_API_URL}/image`
      const options = {
        headers: {'Content-Type': 'multipart/form-data' }
      }
      this.axios.post(url, formData, options)
      .then(response => {
        const image_id = response.data._id
        const src = `${process.env.VUE_APP_IMAGE_MANAGER_API_URL}/images/${image_id}`
        this.editor.commands.image({src})
        this.image_upload_modal.open = false

      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    }




  },


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




/* TAGS */
.tags_wrapper {
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




</style>
