<template>

  <div class="article_editor_view">

    <!-- wrapper for authentication detection -->
    <div
      class="authentication_wrapper"
      v-if="$store.state.logged_in && !article_loading">

      <Toolbar>

        <div class="dates_container">
          <div class="" v-if="article_data.creation_date">Created on {{format_date(article_data.creation_date)}}</div>
          <div class="" v-if="article_data.edit_date">Last edited on {{format_date(article_data.edit_date)}}</div>
        </div>

        <!-- Allow loading of HTML file -->
        <div class="" v-if="false">
          <input type="file" ref="html_file_input" v-on:change="parse_file($event)">
        </div>


        <div class="growing_spacer"/>

        <IconButton
          v-if="$route.query._id"
          v-on:click="view_article()">
          <arrow-left-icon />
        </IconButton>

        <IconButton
          v-bind:active="editable"
          v-on:click="editable = !editable">
          <pencil-icon/>
        </IconButton>



        <IconButton
          v-on:click="submit_article()">
          <content-save-icon />
        </IconButton>

        <IconButton
          v-on:click="delete_article()">
          <delete-icon />
        </IconButton>


        <IconButton
          v-on:click="toggle_published()"
          v-bind:active="article_data.published">
          <earth-icon/>
        </IconButton>

      </Toolbar>

      <!-- Tags and category -->
      <div class="metadata_wrapper">
        <!-- Category -->
        <div class="category_container">
          <label for="category_search">Category: </label>
          <input
            id="category_search"
            type="search"
            list="category_list"
            v-model="article_data.category"/>

          <datalist id="category_list">
            <option
              v-for="(category, i) in $store.state.categories"
              v-bind:value="category"
              v-bind:key="i"/>
          </datalist>
        </div>

        <!-- Tags -->
        <div class="tags_wrapper">

          <label for="tag_search">Tags: </label>

          <Tag
            v-for="(tag, index) in article_data.tags"
            v-bind:key="index"
            v-bind:label="tag"
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
              v-for="(existing_tag, i) in existing_tags"
              v-bind:value="existing_tag"
              v-bind:key="i"/>
          </datalist>


        </div>

      </div>


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
              @click="showImagePrompt(commands.image)">
              <image-icon />
            </IconButton>


            <!-- Input form for the links -->
            <form
              v-if="linkMenuIsActive"
              v-on:submit.prevent="setLinkUrl(commands.link, linkUrl)">
              <input
                type="text" v-model="linkUrl"
                placeholder="https://"
                ref="linkInput"
                v-on:keydown.esc="hideLinkMenu"/>
              <IconButton class="menubar_button" v-on:click="setLinkUrl(commands.link, null)" type="button">
                <delete-icon />
              </IconButton>
            </form>

            <IconButton v-else
              class="menubar_button"
              v-bind:class="{ 'is-active': isActive.link() }"
              v-on:click="showLinkMenu(getMarkAttrs('link'))">
              <link-icon />
            </IconButton>

          </div>
        </editor-menu-bar>

        <!-- The content of the editor -->
        <div class="editor">

          <editor-content
            class="editor_content"
            :editor="editor"/>
            
        </div>

      </div>
    </div>

    <Loader v-if="$store.state.logged_in && article_loading"/>

    <div class="" v-if="!$store.state.logged_in">
      Articles cannot be edited by unauthenticated user
    </div>

    <!-- Todo: Add case for article not found -->

  </div>


</template>

<script>


import {formatDate} from '@/mixins/formatDate.js'
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


  },
  mixins: [formatDate],
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

          new Iframe(),
        ],

        editable: true,
        content: "",

        onUpdate: ({ getHTML }) => {

          this.article_data.content = getHTML()

          // Parse the article to find metadata
          this.set_article_title();
          this.set_article_summary();
          this.set_article_thumbnail_src();

        },
      }), // end of new Editor ()



      // Default values for an article, overwritten if loaded with axios
      // This gets sent to the DB
      article_data: {
        // default set to undefined for MongoDB
        _id: undefined,

        published: false,

        creation_date: new Date(),
        edit_date: new Date(),

        content: null,

        // Article metadata (generated when inputing data)
        category: '',
        tags: [],
        title: '',
        summary: '',
        thumbnail_src: '',

      },

      // stuff for links
      linkUrl: null,
      linkMenuIsActive: false,

      editable: true,

      article_loading: true,
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
      if('_id' in this.$route.query){
        // this gets titptap to throw errors
        this.article_loading = true;

        this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
        .then(response => {

          this.article_data = response.data;
          this.editor.setContent(this.article_data.content);

          // Unflag as loading
          this.article_loading = false;
        })
        .catch(error => alert(error))
      }
      else {

        this.article_loading = false;
      }
    },
    toggle_published(){
      this.article_data.published = !this.article_data.published;
    },
    submit_article(){

      // Show loader to prevent user from re-submitting
      this.article_loading = true;

      // Add the date of edition
      this.article_data.edit_date = new Date();

      this.axios.post('https://cms.maximemoreillon.com/edit_article', this.article_data)
      .then(response => {
        this.article_loading = false;
        this.$store.commit('update_categories')
        this.$router.push({ path: '/article', query: { _id: response.data._id } })
      })
      .catch(error => alert(error))
    },
    delete_article(){
      if(confirm('Delete article?')){
        this.article_loading = true;
        this.axios.post('https://cms.maximemoreillon.com/delete_article', {_id: this.article_data._id})
        .then( () => {
          this.article_loading = false;
          this.$store.commit('update_categories')
          this.$router.push({ path: '/article_list' })
        })
        .catch(error => alert(error))
      }

    },

    view_article(){
      this.$router.push({ path: 'article', query: { _id: this.$route.query._id } })
    },

    add_tag(){
      if(!('tags' in this.article_data)) this.$set(this.article_data,'tags',[])
      this.article_data.tags.push(this.$refs.tag_input.value);
      this.$refs.tag_input.value = ""
    },
    delete_tag(index){
      this.article_data.tags.splice(index,1)
    },
    delete_last_Tag(){
      this.article_data.tags.pop();
    },
    get_existing_tags(){
      this.axios.post('https://cms.maximemoreillon.com/get_tags')
      .then(response => {
        this.existing_tags.splice(0,this.existing_tags.length)
        for (let tag of response.data) {
          this.existing_tags.push(tag)
        }

      })
      .catch(error => alert(error))
    },
    parse_file(event){
      // Load text files and turn them into article content
      let file = event.srcElement.files[0]
      const reader = new FileReader()
      reader.onload = event => this.article_data.content = event.target.result
      reader.onerror = error => console.log(error)
      reader.readAsText(file) // you could also read images and other binaries
    },
    set_article_title(){
      // get article title from content (first h1 tag of the content)
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1) this.article_data.title = first_h1.innerHTML
    },
    set_article_summary(){
      // get article summary from content (first p tag of the content)
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) this.article_data.summary = first_p.innerHTML
    },
    set_article_thumbnail_src(){
      // get article thumbnail from content (first img tag of the content)
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_img = virtual_container.getElementsByTagName('img')[0]
      if(first_img) this.article_data.thumbnail_src = first_img.src
    },

    // used by tiptap for links
    showLinkMenu(attrs) {
      this.linkUrl = attrs.href
      this.linkMenuIsActive = true
      this.$nextTick(() => {
        this.$refs.linkInput.focus()
      })
    },
    hideLinkMenu() {
      this.linkUrl = null
      this.linkMenuIsActive = false
    },
    setLinkUrl(command, url) {
      command({ href: url })
      this.hideLinkMenu()
    },

    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },

  },


}
</script>


<!-- not scoped so as to affect embedded components -->
<style >
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





</style>
