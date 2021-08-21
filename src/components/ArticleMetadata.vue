<template>
  <div class="article_metadata">

    <!-- Author -->
    <div class="metadata_wrapper">
      <span>Written by</span>
      <Author v-bind:author="article.author"/>
    </div>

    <div
      class="metadata_wrapper"
      v-if="article.authorship.properties.creation_date">
      <span>Creation date:</span>
      <span>{{format_date(article.authorship.properties.creation_date)}}</span>
    </div>

    <div
      class="metadata_wrapper"
      v-if="article.authorship.properties.edition_date">
      <span>Last edited:</span>
      <span>{{format_date(article.authorship.properties.edition_date)}}</span>

    </div>

    <div
      class="metadata_wrapper"
      v-if="article.properties.views">
        {{article.properties.views}} Views
    </div>

    <div
      class="metadata_wrapper"
      v-if="article.properties.published">
      <earth-icon />
      <span>published</span>
    </div>
    <div
      class="metadata_wrapper"
      v-if="!article.properties.published">
      <lock-icon />
      <span>private</span>
    </div>

  </div>
</template>

<script>

import Author from '@/components/Author.vue'
import {formatDate} from '@/mixins/formatDate.js'

export default {
  name: 'ArticleMetadata',
  props: {
    article: Object
  },
  mixins: [
    formatDate,
  ],
  components: {
    Author
  },
  methods: {

  },
}
</script>

<style scoped>

.article_metadata {
  margin-top: -0.5em;
  font-size: 85%;
  color: #666666;
  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
}


.article_metadata > *:not(:last-child) {
  margin-right: 0.5em;
}

.metadata_wrapper {
  display: flex;
  align-items: center;
}

.metadata_wrapper > *:not(:last-child) {
  margin-right: 0.25em;
}

.metadata_wrapper:not(:last-child) {
  margin-right: 1em;
}

.metadata_wrapper > *:not(:last-child) {
  margin-right: 0.5em;
}


</style>
