<template>

  <div class="article_editor_view">

    <!-- wrapper for authentication detection -->
    <div
      class="authentication_wrapper"
      v-if="$store.state.user && !article_loading">

      <Toolbar>

        <div class="dates_container">
          <div class="" v-if="article_data.creation_date">Published on {{format_date(article_data.creation_date)}}</div>
          <div class="" v-if="article_data.edit_date">Last edited on {{format_date(article_data.edit_date)}}</div>
        </div>

        <input type="file" ref="html_file_input" v-on:change="parse_file($event)">

        <div class="growing_spacer"/>

        <IconButton
          v-if="$route.query._id"
          class="right_aligned"
          icon="mdi-arrow-left"
          v-on:buttonClicked="view_article()"/>
        <IconButton
          v-bind:class="{right_aligned: !article_data._id}"
          icon="mdi-content-save"
          v-on:buttonClicked="submit_article()"/>
        <IconButton
          icon="mdi-delete"
          v-on:buttonClicked="delete_article()"/>
        <IconButton
          v-bind:icon="article_data.published ? 'mdi-lock' : 'mdi-earth'"
          v-on:buttonClicked="toggle_published()"/>

      </Toolbar>

      <div class="metadata_wrapper">

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

        <div class="tags_wrapper">
          <label for="category_search">Tags: </label>
          <span class="tag" v-for="(tag, index) in article_data.tags" v-bind:key="index">
            <span>{{tag}}</span>
            <IconButton
              icon="mdi-close"
              size="100%"
              v-on:buttonClicked="delete_tag(index)"/>
          </span>
          <input
            type="search"
            ref="tag_input"
            list="existing_tag_list"
            v-on:keyup.enter="add_tag()">

          <datalist id="existing_tag_list">
            <option
              v-for="(existing_tag, i) in existing_tags"
              v-bind:value="existing_tag"
              v-bind:key="i"/>
          </datalist>

          <IconButton
            icon="mdi-plus"
            v-on:buttonClicked="add_tag()"/>




        </div>

      </div>


      <!-- editor for the content of the article -->
      <div class="editor_wrapper">
        <editor-menu-bar :editor="editor" v-slot="{ commands, isActive, getMarkAttrs }">
          <div class="menubar">
            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bold() }"
              @click="commands.bold">
              <span class="mdi mdi-format-bold" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.italic() }"
              @click="commands.italic">
              <span class="mdi mdi-format-italic" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.strike() }"
              @click="commands.strike">
              <span class="mdi mdi-format-strikethrough" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.underline() }"
              @click="commands.underline">
              <span class="mdi mdi-format-underline" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.code() }"
              @click="commands.code">
              <span class="mdi mdi-code-tags" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.paragraph() }"
              @click="commands.paragraph">
              <span class="mdi mdi-format-paragraph" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 1 }) }"
              @click="commands.heading({ level: 1 })">
              <span class="mdi mdi-format-header-1" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 2 }) }"
              @click="commands.heading({ level: 2 })">
              <span class="mdi mdi-format-header-2" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.heading({ level: 3 }) }"
              @click="commands.heading({ level: 3 })">
              <span class="mdi mdi-format-header-3" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.bullet_list() }"
              @click="commands.bullet_list">
              <span class="mdi mdi-format-list-bulleted" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.ordered_list() }"
              @click="commands.ordered_list">
              <span class="mdi mdi-format-list-numbered" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.blockquote() }"
              @click="commands.blockquote">
              <span class="mdi mdi-format-quote-close" />
            </button>

            <button
              class="menubar__button"
              :class="{ 'is-active': isActive.code_block() }"
              @click="commands.code_block">
              <span class="mdi mdi-code-tags" />
            </button>

            <button
              class="menubar__button"
              @click="commands.horizontal_rule">
              <span class="mdi mdi-minus" />
            </button>

            <button
              class="menubar__button"
              @click="commands.undo">
              <span class="mdi mdi-undo" />
            </button>

            <button
              class="menubar__button"
              @click="commands.redo">
              <span class="mdi mdi-redo" />
            </button>



            <form class="menububble__form" v-if="linkMenuIsActive" @submit.prevent="setLinkUrl(commands.link, linkUrl)">
              <input class="menububble__input" type="text" v-model="linkUrl" placeholder="https://" ref="linkInput" @keydown.esc="hideLinkMenu"/>
              <button class="menubar__button" @click="setLinkUrl(commands.link, null)" type="button">
                <span class="mdi mdi-delete" />
              </button>
            </form>

            <button v-else
              class="menubar__button"
              :class="{ 'is-active': isActive.link() }"
              @click="showLinkMenu(getMarkAttrs('link'))">
              <span class="mdi mdi-link" />
            </button>

          </div>
        </editor-menu-bar>

        <div class="editor">
          <editor-content class="editor__content" :editor="editor" />
        </div>
      </div>




    </div>

    <Loader v-if="$store.state.user && article_loading"/>

    <div class="" v-if="!$store.state.user">
      Articles cannot be edited by unauthenticated user
    </div>

    <!-- Todo: Add case for article not found -->

  </div>


</template>

<script>


import IconButton from '@/components/vue_icon_button/IconButton.vue'
import {formatDate} from '@/mixins/formatDate.js'

import Toolbar from '@/components/Toolbar.vue'
import Loader from '@/components/vue_loader/Loader.vue'

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

import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'



export default {
  components: {
    IconButton,
    Toolbar,
    Loader,

    // editor
    EditorContent,
    EditorMenuBar,
  },
  mixins: [formatDate],
  data () {
    return {



      editor: null,

      // stuff for links
      linkUrl: null,
      linkMenuIsActive: false,

      article_loading: true,
      existing_tags: [],

      // Default values for an article, overwritten if loaded with axios
      article_data: {
        // default set to undefined for MongoDB
        _id: undefined,

        published: false,

        creation_date: new Date(),

        // Content edited in quill
        content: null,

        // Article metadata
        category: '',
        tags: [],
        title: '',
        summary: '',
        thumbnail_src: '',

      },


    }
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
    create_editor(){
      this.editor = new Editor({
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
            },
          }),
        ],
        content: "",
        onUpdate: ({ getHTML }) => {
          this.article_data.content = getHTML();
          this.set_article_title();
          this.set_article_summary();
          this.set_article_thumbnail_src();
        },
      })
    },

    editor_updated({ getHTML }){
      this.article_data.content = getHTML;
    },
    get_article_if_exists(){
      // If ID is present in query, get the article corresponding to that ID
      if('_id' in this.$route.query){
        // this gets titptap to throw errors
        this.article_loading = true;

        this.axios.post('https://cms.maximemoreillon.com/get_article', {_id: this.$route.query._id})
        .then(response => {

          this.article_data = response.data
          this.create_editor();
          this.editor.setContent(this.article_data.content);


          // Add the date of edition
          this.article_data.edit_date = new Date();

          // Unflag as loading
          this.article_loading = false;


        })
        .catch(error => alert(error))
      }
      else {
        this.article_loading = false;
        this.create_editor();
      }
    },
    toggle_published(){
      this.article_data.published = !this.article_data.published;
    },
    submit_article(){

      // Show loader to prevent user from re-submitting
      this.article_loading = true;

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
      // Load text files into article content
      let file = event.srcElement.files[0]
      const reader = new FileReader()
      reader.onload = event => this.article_data.content = event.target.result
      reader.onerror = error => console.log(error)
      reader.readAsText(file) // you could also read images and other binaries
    },
    set_article_title(){
      // get article title from content
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1) this.article_data.title = first_h1.innerHTML
    },
    set_article_summary(){
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article_data.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) this.article_data.summary = first_p.innerHTML
    },
    set_article_thumbnail_src(){
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

  },


}
</script>


<style>

/* not exactly super nice */
@import url("//cdn.jsdelivr.net/gh/highlightjs/cdn-release@9.18.0/build/styles/obsidian.min.css");

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
}

.tags_wrapper {

}
.tags_container {
  display: flex;
}


.tag {
  border: 1px solid #dddddd;
  border-radius: 5px;
  margin: 5px;
  padding: 5px;
}

.tag:first-child {
  margin-left: 0;
}

input[type="search"]{
  border: none;
  border-bottom: 1px solid #444444;
}

.menubar__button{
  cursor: pointer;
  background-color: white;
  border: none;
  font-size: 150%;
}

.menubar__button.is-active{
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

.editor__content{
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 100%;

  overflow-y: auto;
}

.editor p.is-editor-empty:first-child::before {
  content: attr(data-empty-text);
  float: left;
  color: #aaa;
  pointer-events: none;
  height: 0;
  font-style: italic;
}

pre{
  background-color: #282b2e;
  padding: 10px;
  color: #ffffff;
}


</style>
