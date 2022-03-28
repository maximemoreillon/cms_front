<template>
  <!-- The whole preview is a link to the article -->
  <router-link
    class="article_preview"
    :class="{article_with_thumbnail: !!article.thumbnail_src}"
    :to="{ name: 'article', params: {article_id: get_id_of_item(article)} }">

    <h2>{{article.title || 'Untitled article'}}</h2>

    <div class="metadata">
      <!-- date -->
      <div
        class="metadata_item"
        v-if="article.authorship.creation_date">
        <calendar-icon/>
        <span class="article_date" >
          {{format_date(article.authorship.creation_date)}}
        </span>
      </div>

      <!-- Author -->
      <div
        class="metadata_item"
        v-if="author">
        <account-icon/>
        <span class="author">
          {{author.display_name || 'Unnnamed'}}
        </span>
      </div>

      <!-- Publishing status and views only visible to users logged in -->
      <template >
        <div
          class="metadata_item"
          v-if="article.views">
          <eye-icon/>
          <span>
            {{article.views}}
          </span>
        </div>

        <div
          class="metadata_item" >
          <earth-icon v-if="article.published"/>
          <lock-icon v-else />
        </div>
      </template>

    </div>


    <img
      class="thumbnail"
      v-if="article.thumbnail_src"
      :src="article.thumbnail_src"
      alt="">


    <!-- Summary -->
    <div
      class="summary"
      v-html="article.summary || 'No summary available'"/>


    <div
      class="tags"
      v-if="tags && tags.length">

      <tag-icon />
      <Tag
        :clickable="false"
        v-for="(tag, index) in tags.slice(0,3)"
        v-bind:key="`tag_${index}`"
        v-bind:tag="tag"/>

      <span v-if="tags.length > 3">
        +{{tags.length -3}}
      </span>

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

  border: 1px solid #dddddd;
  transition: border-color 0.25s;

  display: grid;

  grid-template-areas:
    'title'
    'metadata'
    'summary'
    'tags';

  align-items: start;

  padding: 1em;

  grid-gap: 0.5em;


}

.article_with_thumbnail {
  grid-template-areas:
    'title thumbnail'
    'metadata thumbnail'
    'summary thumbnail'
    'tags thumbnail';

  grid-template-columns: 5fr 2fr;

}



.article_preview:hover {
  border-color: #c00000;
}


h2 {
  grid-area: title;
  margin: 0;
}

.metadata {
  grid-area: metadata;
  margin-top: 0.25em;
  display: flex;
  align-items: center;
  font-size: 75%;
  color: #666666;
}

.metadata > div {
  margin-right: 1em;
  display: flex;
  align-items: center;
}

.metadata > div > * {
  margin-right: 0.25em;
}

.thumbnail {
  grid-area: thumbnail;
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.summary {
  outline: 1px solid red;
  grid-area: summary;
  overflow: hidden;
  /* max-height: 10em; */
  max-height: 100%;

  /* Padding so that short summaries don't get clipped */
  padding-bottom: 0.5em;

  position: relative;
}

/* Shadow to show there is more content available */
.summary::before {
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


.tags {
  grid-area: tags;
  display: flex;
  align-items: center;
}


.tags > *{
  margin-top: 0.25em;
  //margin: 0.25em 0;
  color: #666666;

}

.tags > *:not(:last-child) {
  margin-right: 5px;
}

.tags > *:first-child {
  margin-left: 0;
}

















</style>
