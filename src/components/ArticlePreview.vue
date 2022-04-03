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

        <div
          class="metadata_item"
          v-if="article.views">
          <eye-icon/>
          <span>
            {{article.views}}
          </span>
        </div>

      <template v-if="$store.state.current_user">
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


    <div class="tags">

      <template v-if="tags && tags.length">
        <tag-icon />

        <Tag
          :clickable="false"
          v-for="(tag, index) in tags.slice(0,max_tags)"
          v-bind:key="`tag_${index}`"
          v-bind:tag="tag"/>

        <span v-if="tags.length > max_tags">
          +{{tags.length - max_tags}}
        </span>
      </template>

      <tag-off-icon v-else/>



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
  data(){
    return {
      max_tags: 5,
    }
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
  padding: 1em;


  display: grid;
  grid-template-areas:
    'title'
    'metadata'
    'summary'
    'tags';

  /* align-items: start; */

  /* WARNING: Missing tags will create a gap */

  grid-template-rows: repeat(auto,4);
  grid-gap: 1em;

}

.article_with_thumbnail {
  /* Special layout if the article has a thumbnail */
  grid-template-columns: 2fr 5fr;
  grid-template-areas:
    'title title'
    'metadata metadata'
    'thumbnail summary'
    'tags tags';

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
  /* Bring metadata closer to title */
  margin-top: -0.75em;
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 75%;
  color: #666666;
}

.metadata > div {
  display: flex;
  align-items: center;
  gap: 0.25em;
}


.thumbnail {
  grid-area: thumbnail;

  /* Span the whole available surface */
  /* NOTE: Does not work with max-width and max-height */
  width: 100%;
  height: 100%;
  max-height: 10em;
  object-fit: cover;
}


.summary {
  grid-area: summary;

  /* Height is set using grid so height 100% here allows working overflows */
  max-height: 10em;
  overflow-y: hidden;


  line-height: var(--line-height);



  /* Position relative for shadow below */
  position: relative;

}

.summary::before {
  /* Shadow to show there is more content available */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  z-index: 1;

  /* PROBLEM: What if background is not white? */
  background-image: linear-gradient(to top, rgba(255,255,255, 1), rgba(255,255,255, 0));
  background-position: 100% 0;
  background-size: 100% 100%;
}


.tags {
  grid-area: tags;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
}


.tags > *{
  color: #666666;
}




















</style>
