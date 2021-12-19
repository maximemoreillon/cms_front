<template>
  <div class="article_metadata">

    <!-- Author -->
    <div class="metadata_wrapper">
      <!-- <span>Written by</span> -->
      <account-icon
        title="Author"/>
      <Author v-bind:author="author"/>
    </div>

    <div
      class="metadata_wrapper"
      v-if="authorship.creation_date">
      <calendar-icon
        title="Creation date"/>
      <!-- <span>Creation date:</span> -->
      <span>{{format_date(authorship.creation_date)}}</span>
    </div>

    <div
      class="metadata_wrapper"
      v-if="authorship.edition_date">
      <!-- <span>Last edited:</span> -->
      <calendar-edit-icon
        title="Last edition date"/>
      <span>{{format_date(authorship.edition_date)}}</span>

    </div>

    <div
      class="metadata_wrapper"
      v-if="article.views">
      <eye-icon
        title="views"/>
      <span>{{article.views}}</span>
    </div>

    <div
      class="metadata_wrapper"
      v-if="article.published">
      <earth-icon />
      <span>published</span>
    </div>
    <div
      class="metadata_wrapper"
      v-if="!article.published">
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
    article: Object,
    author: Object,
    authorship: Object,
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
  margin-right: 1.5em;
}

.metadata_wrapper > *:not(:last-child) {
  margin-right: 0.5em;
}


</style>
