<template>
  <div class="article_metadata">

    <div class="metadata_wrapper">
      <!-- Author -->
      <div
        class="metadata_element"
        title="Author">
        <!-- <span>Written by</span> -->
        <account-icon class="metadata_icon"/>
        <Author v-bind:author="article.author"/>
      </div>

      <div
        class="metadata_element"
        title="Created"
        v-if="article.authorship.creation_date">
        <calendar-icon class="metadata_icon"/>
        <!-- <span>Creation date:</span> -->
        <span>{{format_date(article.authorship.creation_date)}}</span>
      </div>

      <div
        class="metadata_element"
        title="last edited"
        v-if="article.authorship.edition_date">
        <!-- <span>Last edited:</span> -->
        <calendar-edit-icon class="metadata_icon"/>
        <span>{{format_date(article.authorship.edition_date)}}</span>

      </div>
      
      <div
        class="metadata_element"
        title="Views"
        v-if="article.views">
        <eye-icon class="metadata_icon"/>
        <span>{{article.views}}</span>
      </div>

      <template v-if="user_is_author">
        <div
          class="metadata_element"
          title="Published"
          v-if="article.published">
          <earth-icon class="metadata_icon"/>
          <span>Published</span>
        </div>


        <div
          class="metadata_element"
          title="Private"
          v-if="!article.published">
          <lock-icon class="metadata_icon"/>
          <span>Private</span>
        </div>

        <router-link
          :to="{ name: 'article_editor', params: { id: get_id_of_item(article) } }"
          class="metadata_element edit_button">
          <pencil-icon class="metadata_icon"/>
          <span>Edit</span>
        </router-link>
      </template>
    </div>



    <div class="metadata_element" v-if="article.tags.length">

      <tag-icon class="metadata_icon"/>

      <div class="tags_container">
        <Tag
          class="tag"
          v-for="(tag, index) in article.tags"
          v-bind:key="`tag_${index}`"
          v-bind:tag="tag"/>
      </div>


    </div>



  </div>
</template>

<script>

import Author from '@/components/Author.vue'
import {formatDate} from '@/mixins/formatDate.js'
import IdUtils from '@/mixins/IdUtils'
import Tag from '@/components/Tag.vue'

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
    Author,
    Tag,
  },
  methods: {

  },
  computed: {
    user_is_author(){
      const current_user = this.$store.state.current_user
      if(!current_user) return false
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
  font-size: 90%;
  color: #666666;
}

.metadata_wrapper {


  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1em 1.5em;
}


.metadata_element {
  display: flex;
  align-items: center;
}





.tags_container {
  margin-top: 0.5em;
  color: #666666;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1em 0.25em;
}


.edit_button {
  margin-left: auto;
}

.metadata_icon {
  margin-right: 0.25em;
}


</style>
