<template>
  <router-link
    class="article_preview"
    :to="{ name: 'article', params: {article_id: article.identity.low} }">

    <!-- indictor for published -->
    <earth-icon
      class="publishing_status"
      v-if="article.properties.published && $store.state.logged_in"/>

    <!-- Article title, consists of first h1 of the content -->
    <div class="preview_header">
      <div class="article_title">{{article.properties.title}}</div>

      <div class="article_metadata">

        <!-- date -->
        <span
          class="article_date"
          v-if="relationship.properties.creation_date">
          {{format_date(relationship.properties.creation_date)}}
        </span>

        <!-- Author -->
        <span
          class="article_author"
          v-if="author.properties.username">
          {{author.properties.username}}
        </span>
      </div>


    </div>


    <!-- alt set to empty string to display nothing if no thumbnail -->
    <div class="article_preview_body">
      <img
        class="article_thumbnail"
        v-if="article.properties.thumbnail_src"
        v-bind:src="article.properties.thumbnail_src"
        alt="">

      <!-- Summary -->
      <div
        class="article_summary"
        v-if="article.properties.summary"
        v-html="article.properties.summary"/>

    </div>


    <div
      class="tags_container"
      v-if="tags">

      <Tag
        v-for="tag in tags"
        v-bind:key="tag.identity.low"
        v-bind:tag="tag"/>

    </div>


  </router-link>







</template>

<script>

import {formatDate} from '@/mixins/formatDate.js'
//import dot from 'vue-text-dot' // not working well

import Tag from '@/components/Tag.vue'
import EarthIcon from 'vue-material-design-icons/Earth.vue';


export default {
  name: 'ArticlePreview',
  props: {
    article_record: Object
  },
  data() {
    return {

    }
  },
  mixins: [
    formatDate,
    //parseArticleRecord
  ],
  components: {
    Tag,

    // Icons
    EarthIcon
  },
  mounted() {

  },
  methods: {

  },
  computed: {
    article(){
      return this.article_record._fields[this.article_record._fieldLookup['article']]
    },
    author(){
      return this.article_record._fields[this.article_record._fieldLookup['author']]
    },
    tags(){
      return this.article_record._fields[this.article_record._fieldLookup['tags']]
    },
    relationship(){
      return this.article_record._fields[this.article_record._fieldLookup['relationship']]
    },
  }

}
</script>

<style scoped>

.article_preview {
  position: relative;

  color: currentColor;
  font-weight: normal;

  cursor: pointer;

  /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
  border: 1px solid #dddddd;
  transition: border-color 0.25s;
}

.article_preview > * {
  margin: 1em
}

.article_preview:hover {
  border-color: #c00000;
}



.article_title {
  font-weight: bold;
  font-size: 120%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}


.article_metadata {
  margin-top: 0.25em;
  display: flex;
  align-items: center;
  font-size: 75%;
  color: #666666;
}

.article_metadata > *:not(:last-child) {
  margin-right: 0.25em;
}

.publishing_status {
  /* not too happy with float */
  float: right;
}

.article_preview_body {
  display: flex;
  align-items: center;
}


.article_summary {
  overflow: hidden;
  line-height: 1em;
  max-height: 5.5em;
  position: relative;
}

.article_summary::before {
  content: '';
  position: absolute;
  top: 4em;
  left: 0;
  right: 0;
  height: 1.5em;
  z-index: 10;

  background-image: linear-gradient(to top, white, transparent);
  background-position: 100% 0;
  background-size: 100% 100%;
}

p {
  outline: 1px solid blue;
}


.article_thumbnail {
  max-width: 5em;
  max-height: 5em;
  object-fit: contain;
  margin-right: 1em;
}


.tags_container {
  position: relative;
  display: flex;
  overflow-x: hidden;
}

.tags_container > *{
  margin-top: 0.25em;
  //margin: 0.25em 0;

}

.tags_container > *:not(:last-child) {
  margin-right: 5px;

}


.tags_container::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 50px;
  z-index: 10;

  background-image: linear-gradient(to left, white, transparent);
  background-position: 0 100%;
  background-size: 100% 100%;
}





</style>
