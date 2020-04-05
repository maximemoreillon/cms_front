<template>

  <div class="article_editor_view">

    <!-- wrapper for authentication detection -->
    <div
      class="authentication_wrapper"
      v-if="$store.state.logged_in && !article_loading">

      <Toolbar>

        <div class="dates_container">
          <div class="" v-if="article.properties.creation_date">Created on {{format_date(article.properties.creation_date)}}</div>
          <div class="" v-if="article.properties.edition_date">Last edited on {{format_date(article.properties.edition_date)}}</div>
        </div>

        <!-- Allow loading of HTML file -->
        <!--
        <div class="">
          <input type="file" ref="html_file_input" v-on:change="parse_file($event)">
        </div>
        -->

        <!-- Tags -->
        <div class="tags_wrapper">

          <tag-icon class="tag_icon"/>

          <Tag
            v-for="(tag, index) in tags"
            v-bind:key="tag.identity.low"
            v-bind:tag="tag"
            removable
            v-on:remove="delete_tag(index)"/>

          <input
            id="tag_search"
            type="search"
            ref="tag_input"
            list="existing_tag_list"
            v-on:keyup.enter="add_tag()"
            v-on:keyup.delete="delete_last_Tag()">

          <datalist id="existing_tag_list">
            <option
              v-for="existing_tag in existing_tags"
              v-bind:value="existing_tag.properties.name"
              v-bind:key="existing_tag.identity.low"/>
          </datalist>

        </div>


        <div class="growing_spacer"/>

        <div class="tool_cluster">
          <IconButton
            v-if="$route.query.id"
            v-on:click="$router.push({ name: 'article', query: { id: $route.query.id } })">
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
            v-if="article.identity.low"
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







      <!-- editor for the content of the article -->
      <div class="editor_wrapper">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
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
              class="menubar_button"
              v-bind:class="{ 'is-active': isActive.link() }"
              v-on:click="prompt_for_url(commands.link)">
              <link-icon />
            </IconButton>

          </div>
        </editor-menu-bar>

        <!-- The content of the editor -->
        <article class="editor">

          <editor-content
            class="editor_content"
            v-bind:editor="editor"/>

        </article>

      </div>
    </div>

    <Loader v-if="$store.state.logged_in && article_loading"/>

    <div class="" v-if="!$store.state.logged_in">
      Articles cannot be edited by unauthenticated user
    </div>

    <!-- TODO: Add case for article not found -->

  </div>


</template>

<script>


import {formatDate} from '@/mixins/formatDate.js'
//import {parseArticleRecord} from '@/mixins/parseArticleRecord.js'

import IconButton from '@/components/vue_icon_button/IconButton.vue'
import Toolbar from '@/components/Toolbar.vue'
import Loader from '@/components/vue_loader/Loader.vue'
import Tag from '@/components/Tag.vue'

import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  CodeBlockHighlight,
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

// HLJS languages
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import bash from 'highlight.js/lib/languages/bash'
import python from 'highlight.js/lib/languages/python'
import shell from 'highlight.js/lib/languages/shell'
import dockerfile from 'highlight.js/lib/languages/dockerfile'
import cpp from 'highlight.js/lib/languages/cpp'
import xml from 'highlight.js/lib/languages/xml'


// Icons
import ArrowLeftIcon from 'vue-material-design-icons/ArrowLeft.vue';
import DeleteIcon from 'vue-material-design-icons/Delete.vue';
import ContentSaveIcon from 'vue-material-design-icons/ContentSave.vue';
//import LockIcon from 'vue-material-design-icons/Lock.vue';
import EarthIcon from 'vue-material-design-icons/Earth.vue';
import CodeTagsIcon from 'vue-material-design-icons/CodeTags.vue';
import FormatHeader1Icon from 'vue-material-design-icons/FormatHeader1.vue';
import FormatHeader2Icon from 'vue-material-design-icons/FormatHeader2.vue';
import FormatHeader3Icon from 'vue-material-design-icons/FormatHeader3.vue';
import FormatParagraphIcon from 'vue-material-design-icons/FormatParagraph.vue';
import FormatBoldIcon from 'vue-material-design-icons/FormatBold.vue';
import FormatItalicIcon from 'vue-material-design-icons/FormatItalic.vue';
import FormatStrikethroughIcon from 'vue-material-design-icons/FormatStrikethrough.vue';
import FormatUnderlineIcon from 'vue-material-design-icons/FormatUnderline.vue';
import FormatListBulletedIcon from 'vue-material-design-icons/FormatListBulleted.vue';
import FormatListNumberedIcon from 'vue-material-design-icons/FormatListNumbered.vue';
import FormatQuoteCloseIcon from 'vue-material-design-icons/FormatQuoteClose.vue';
import UndoIcon from 'vue-material-design-icons/Undo.vue';
import RedoIcon from 'vue-material-design-icons/Redo.vue';
import LinkIcon from 'vue-material-design-icons/Link.vue';
//import PlusIcon from 'vue-material-design-icons/Plus.vue';
import PencilIcon from 'vue-material-design-icons/Pencil.vue';
//import PencilOffIcon from 'vue-material-design-icons/PencilOff.vue';
import ImageIcon from 'vue-material-design-icons/Image.vue';
import TagIcon from 'vue-material-design-icons/Tag.vue';
import YoutubeIcon from 'vue-material-design-icons/Youtube.vue';

export default {
  components: {

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
    TagIcon,
    YoutubeIcon,


  },
  mixins: [
    formatDate,
    //parseArticleRecord,
  ],
  data () {
    return {

      // The tiptap editor, is actually created in mounted
      //editor: null,
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

          new CodeBlockHighlight({
            languages: {
              javascript,
              css,
              shell,
              python,
              bash,
              dockerfile,
              cpp,
              xml,
            },
          }),

          new Iframe(), // For Youtube videos
        ],

        editable: true,
        content: "",

        onUpdate: ({ getHTML }) => {

          this.article.properties.content = getHTML()

          // Parse the article to find metadata
          this.set_article_title();
          this.set_article_summary();
          this.set_article_thumbnail_src();

        },
      }), // end of new Editor ()



      // Default values for an article, overwritten if loaded with axios
      // This gets sent to the DB
      article: {

        identity: {
          low: undefined
        },

        properties: {
          content: null,
          published: false,

          // Article metadata (generated when inputing data)
          title: '',
          summary: '',
          thumbnail_src: '',
        }
      },

      tags: [],
      tags_loading: false,

      editable: true,

      article_loading: true,

      // The list of all tags used by any article
      existing_tags: [],


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
    this.get_article_if_exists();
    this.get_existing_tags();
  },
  beforeDestroy() {
    // Always destroy your editor instance when it's no longer needed
    this.editor.destroy();
  },

  methods: {
    get_article_if_exists(){
      // If ID is present in query, get the article corresponding to that ID
      if('id' in this.$route.query){
        // this gets titptap to throw errors
        this.article_loading = true;

        this.axios.get(`${process.env.VUE_APP_API_URL}/article?id=${this.$route.query.id}`)
        .then(response => {

          // parsing neo4j record for article
          this.article = response.data[0]._fields[response.data[0]._fieldLookup['article']]

          // Applying to content of editor
          this.editor.setContent(this.article.properties.content);

          // unflag loading
          this.article_loading = false;

          // dealing with tags
          this.get_tags_of_article();

        })
        .catch(error => alert(error.response.data))

      }
      else this.article_loading = false;
    },
    get_tags_of_article(){

      this.tags_loading = true
      this.axios.get(`${process.env.VUE_APP_API_URL}/tags_of_article?id=${this.article.identity.low}`)
      .then(response => {

        this.tags_loading = false

        // parsing the tags
        response.data.forEach( record => {
          let tag = record._fields[record._fieldLookup['tag']]
          if(tag) this.tags.push(tag)

        });
      })
      .catch(error => alert(error.response.data))

    },
    toggle_published(){
      this.article.properties.published = !this.article.properties.published;
    },
    submit_article(){

      // Show loader to prevent user from re-submitting
      this.article_loading = true;

      if(this.article.identity.low){
        // if the article has an ID, UPDATE
        this.axios.post(process.env.VUE_APP_API_URL + '/update_article', {
          article: this.article,
          tag_ids: this.tags.map(tag => tag.identity.low),
        })
        .then(response => {
          this.article_loading = false;

          // redirect to article
          let identity = response.data[0]._fields[response.data[0]._fieldLookup['article']].identity.low
          this.$router.push({ name: 'article', query: { id: identity } })
        })
        .catch(error => {
          this.article_loading = false;
          alert(error.response.data)
        })

      }
      else {
        // If the article does not have an ID, CREATE
        this.axios.post(process.env.VUE_APP_API_URL + '/create_article', {
          article: this.article,
          tag_ids: this.tags.map(tag => tag.identity.low),
        })
        .then(response => {
          this.article_loading = false;

          // redirect to article
          let identity = response.data[0]._fields[response.data[0]._fieldLookup['article']].identity.low
          this.$router.push({ name: 'article', query: { id: identity } })
        })
        .catch(error => {
          this.article_loading = false;
          alert(error.response.data)
        })
      }

    },
    delete_article(){
      if(confirm('Delete article?')){
        this.article_loading = true;
        this.axios.post(process.env.VUE_APP_API_URL + '/delete_article', {
          article_id: this.article.identity.low
        })
        .then( () => {
          this.article_loading = false;
          this.$router.push({ name: 'article_list' })
        })
        .catch(error => {
          alert(error.response.data)
        })
      }

    },


    add_tag(){
      if(this.$refs.tag_input.value.length > 0){
        this.axios.post(process.env.VUE_APP_API_URL + '/create_tag', {
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
    delete_last_Tag(){
      // NOT WORKING YET
      //if(this.$refs.tag_input.value === "") this.tags.pop();
    },
    get_existing_tags(){


      this.axios.post(process.env.VUE_APP_API_URL + '/get_tag_list', {})
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
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article.properties.content
      var first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1) this.article.properties.title = first_h1.innerHTML
      else this.article.properties.title = null
    },
    set_article_summary(){
      // get article summary from content (first p tag of the content)
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article.properties.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) this.article.properties.summary = first_p.innerHTML
      else this.article.properties.summary = null
    },
    set_article_thumbnail_src(){
      // get article thumbnail from content (first img tag of the content)
      var virtual_container = document.createElement('div');
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
      const src = prompt('Enter the url of your image here')
      if (src) command({ src })
    },

    parse_file(event){
      // Load text files and turn them into article content
      let file = event.srcElement.files[0]
      const reader = new FileReader()
      reader.onload = event => this.article.content = event.target.result
      reader.onerror = error => alert(error)
      reader.readAsText(file) // you could also read images and other binaries
    },

  },


}
</script>


<!-- not scoped so as to affect embedded components -->
<style>

.article_editor_view{
  height: 100%;
}

.authentication_wrapper{
  height: 100%;
  display: flex;
  flex-direction: column;
}


.metadata_wrapper{
  margin: 5px;

  display: flex;
}

.metadata_wrapper > div:not(:first-child) {
  margin-left: 10px;
  display: flex;
  flex-wrap: wrap;
}




/* Dangerous because unscoped */
input[type="search"]{
  border: none;
  border-bottom: 1px solid #444444;
}

.menubar_button{
  cursor: pointer;
  background-color: white;
  border: none;
  font-size: 150%;
}

.menubar_button.is-active{
  color: #c00000;
}

.menubar{
  border-bottom: 1px solid #dddddd;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.editor_wrapper {
  margin-top: 10px;
  border: 1px solid #dddddd;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
}


.editor {
  flex-grow: 1;
  position: relative;
}

.editor_content{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow-y: auto;
}

/* Used for the placeholder */
.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

pre code {
  /* manually applying style because tiptap doesn't apply the hljs class to code */
  display: block;
  overflow-x: auto;
  padding: 0.5em;
  background: #282b2e;
  color: #e0e2e4;
}

.tags_wrapper {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}
.tags_wrapper > * {
  margin: 5px;

}

.tag_icon {
  color: #444444;
}

.tool_cluster {
  display: flex;
  flex-wrap: wrap;
}




</style>
