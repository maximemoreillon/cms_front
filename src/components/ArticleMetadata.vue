<template>
  <div class="article_metadata">

    <!-- Author -->
    <div class="metadata_wrapper">
      <!-- <span>Written by</span> -->
      <account-icon
        title="Author"/>
      <Author v-bind:author="article.author"/>
    </div>

    <div
      class="metadata_wrapper"
      v-if="article.authorship.creation_date">
      <calendar-icon
        title="Creation date"/>
      <!-- <span>Creation date:</span> -->
      <span>{{format_date(article.authorship.creation_date)}}</span>
    </div>

    <div
      class="metadata_wrapper"
      v-if="article.authorship.edition_date">
      <!-- <span>Last edited:</span> -->
      <calendar-edit-icon
        title="Last edition date"/>
      <span>{{format_date(article.authorship.edition_date)}}</span>

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

    <router-link
      :to="{ name: 'article_editor', params: { id: get_id_of_item(article) } }"
      class="metadata_wrapper"
      v-if="user_is_author">
      <pencil-icon />
      <span>Edit</span>
    </router-link>

  </div>
</template>

<script>

import Author from '@/components/Author.vue'
import {formatDate} from '@/mixins/formatDate.js'
import IdUtils from '@/mixins/IdUtils'

export default {
  name: 'ArticleMetadata',
  props: {
    article: Object,
  },
  mixins: [
    formatDate,
    IdUtils,
  ],
  components: {
    Author
  },
  methods: {

  },
  computed: {
    user_is_author(){
      const current_user = this.$store.state.current_user
      const current_user_id = this.get_id_of_item(current_user)
      const author_id = this.article.author._id

      return current_user_id === author_id
    }
  }
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
