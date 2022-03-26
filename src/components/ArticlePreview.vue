<template>
  <!-- The whole preview is a link to the article -->
  <router-link
    class="article_preview"
    :to="{ name: 'article', params: {article_id: get_id_of_item(article)} }">


    <!-- Article title, consists of first h1 of the content -->
    <div class="preview_header">
      <div class="article_title">
        {{article.title || 'Untitled article'}}
      </div>

      <div class="article_metadata">
        <!-- date -->
        <div v-if="article.authorship.creation_date">
          <calendar-icon/>
          <span class="article_date" >
            {{format_date(article.authorship.creation_date)}}
          </span>
        </div>

        <!-- Author -->
        <div v-if="author">
          <account-icon/>
          <span class="article_author">
            {{author.display_name || 'Unnnamed'}}
          </span>
        </div>

        <!-- Publishing status and views only visible to users logged in -->
        <template >
          <div v-if="article.views">
            <eye-icon/>
            <span>
              {{article.views}}
            </span>
          </div>

          <div>
            <earth-icon v-if="article.published"/>
            <lock-icon v-else />
          </div>
        </template>

      </div>

    </div>


    <!-- alt set to empty string to display nothing if no thumbnail -->
    <div class="article_preview_body">
      <img
        class="article_thumbnail"
        v-if="article.thumbnail_src"
        :src="article.thumbnail_src"
        alt="">

      <!-- Summary -->
      <article
        class="article_summary"
        v-html="article.summary || 'No summary available'"/>

    </div>


    <div
      class="tags_container"
      v-if="tags">

      <tag-icon />
      <Tag
        :clickable="false"
        v-for="(tag, index) in tags"
        v-bind:key="`tag_${index}`"
        v-bind:tag="tag"/>

    </div>


  </router-link>

</template>

<script>

import {formatDate} from '@/mixins/formatDate.js'
import IdUtils from '@/mixins/IdUtils'

import Tag from '@/components/Tag.vue'


export default {
  name: 'ArticlePreview',
  props: {
    article: Object
  },
  mixins: [
    formatDate,
    IdUtils,
  ],
  components: {
    Tag,
  },

  computed: {
    author(){
      return this.article.author
    },
    tags(){
      return this.article.tags
    },
    authorship(){
      return this.article.author.authoriship
    },
  }

}
</script>

<style scoped>

.article_preview {
  position: relative;
  text-decoration: none;

  color: currentColor;
  font-weight: normal;

  cursor: pointer;

  /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
  border: 1px solid #dddddd;
  transition: border-color 0.25s;


  margin-bottom: 2em;
}


.article_preview > * {
  margin: 1em 1.5em;
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

.article_metadata > div {
  margin-right: 1em;
  display: flex;
  align-items: center;
}

.article_metadata > div > * {
  margin-right: 0.25em;
}


.article_preview_body {
  display: flex;
  align-items: top;
}


.article_summary {
  overflow: hidden;
  max-height: 10.5em;

  /* Padding so that short summaries don't get clipped */
  padding-bottom: 0.5em;

  position: relative;
}

/* Shadow to show there is more content available */
.article_summary::before {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  z-index: 5;

  background-image: linear-gradient(to top, white, transparent);
  background-position: 100% 0;
  background-size: 100% 100%;
}


.article_thumbnail {
  max-width: 8em;
  max-height: 8em;
  object-fit: contain;
  margin-right: 1.5em;
}


.tags_container {
  position: relative;
  display: flex;
  overflow-x: hidden;
}

.tags_container > *{
  margin-top: 0.25em;
  //margin: 0.25em 0;
  color: #666666;

}

.tags_container > *:not(:last-child) {
  margin-right: 5px;
}

.tags_container > *:first-child {
  margin-left: 0;
}

/* Fading last tags when too many */
.tags_container::before {
  content: '';
  position: absolute;
  bottom: 0;
  right: 0;
  top: 0;
  width: 50px;
  z-index: 5;

  background-image: linear-gradient(to left, white, transparent);
  background-position: 0 100%;
  background-size: 100% 100%;
}





</style>
