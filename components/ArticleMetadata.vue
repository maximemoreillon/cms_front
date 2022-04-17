<template>
  <div class="article_metadata">

    <div class="metadata_wrapper">
      <!-- Author -->
      <div
        class="metadata_element"
        title="Author">
        <!-- <span>Written by</span> -->
        <MaterialIconAccount class="metadata_icon"/>
        <Author v-bind:author="article.author"/>
      </div>

      <div
        class="metadata_element"
        title="Created"
        v-if="article.authorship.creation_date">
        <MaterialIconCalendar class="metadata_icon"/>
        <!-- <span>Creation date:</span> -->
        <span>{{format_date(article.authorship.creation_date)}}</span>
      </div>

      <div
        class="metadata_element"
        title="last edited"
        v-if="article.authorship.edition_date">
        <!-- <span>Last edited:</span> -->
        <MaterialIconCalendarEdit class="metadata_icon"/>
        <span>{{format_date(article.authorship.edition_date)}}</span>

      </div>

      <div
        class="metadata_element"
        title="Views"
        v-if="article.views">
        <MaterialIconEye class="metadata_icon"/>
        <span>{{article.views}}</span>
      </div>

      <template v-if="user_is_author">
        <div
          class="metadata_element"
          title="Published"
          v-if="article.published">
          <MaterialIconEarth class="metadata_icon"/>
          <span>Published</span>
        </div>


        <div
          class="metadata_element"
          title="Private"
          v-if="!article.published">
          <MaterialIconLock class="metadata_icon"/>
          <span>Private</span>
        </div>

        <router-link
          :to="{ name: 'article_editor', params: { id: article._id } }"
          class="metadata_element edit_button button">
          <pencil-icon class="metadata_icon"/>
          <span>Edit</span>
        </router-link>
      </template>
    </div>



    <div
      class="metadata_element tags_wrapper"
      v-if="article.tags.length">

      <MaterialIconTag class="metadata_icon"/>

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

import Author from './Author.vue'
import Tag from './Tag.vue'

export default {
  name: 'ArticleMetadata',
  props: {
    article: Object,
  },
  components: {
    Author,
    Tag,
  },
  methods: {
    format_date({day,month,year}){
      // Dates are Neo4J formatted
      // i.e. {day, month, year}
      return [
        year,
        month.toString().padStart(2,'0'),
        day.toString().padStart(2,'0'),
      ].join('/');
    }
  },
  computed: {
    user_is_author(){
      return false
    }
  }
}
</script>

<style scoped>

.article_metadata {
  margin-top: -1em;
  font-size: 85%;
  color: #666666;
}

.metadata_wrapper {

  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1em 1em;
}


.metadata_element {
  display: flex;
  align-items: center;
}



.tags_wrapper {
  margin-top: 1em;
}

.tags_container {
  color: #666666;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25em;
}


.edit_button {
  margin-left: auto;
}

.metadata_icon {
  margin-right: 0.25em;
}


</style>
