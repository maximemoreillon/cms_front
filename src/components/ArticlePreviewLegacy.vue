<template>
  <div
    class="article_preview"
    v-on:click="view_article(article._id)">

    <!-- indictor for published -->
    <earth-icon class="publishing_status" v-if="article.published && $store.state.logged_in"/>

    <!-- Article title, consists of first h1 of the content -->
    <div class="article_title">{{article.title}}</div>

    <!-- date and category -->
    <div class="article_metadata" v-if="article.creation_date">

      <span class="article_date">{{format_date(article.creation_date)}}</span>

      <span class="article_category" v-if="! ('category' in $route.query) && article.category">
        {{article.category}}
      </span>

      <span class="article_category" v-else-if="! ('category' in $route.query)">Uncategorized</span>

    </div>

    <!-- alt set to empty string to display nothing if no thumbnail -->
    <img
      class="article_thumbnail"
      v-if="article.thumbnail_src"
      v-bind:src="article.thumbnail_src"
      alt="">

    <!-- Summary -->
    <div class="article_summary"
      v-if="article.summary"
      v-html="article.summary"/>

    <div class="tags_container" v-if="article.tags">

      <Tag
        v-for="(tag, tag_index) in article.tags"
        v-bind:key="tag_index"
        v-bind:label="tag"
        searchable/>

    </div>


  </div>
</template>

<script>
import {formatDate} from '@/mixins/formatDate.js'
import Tag from '@/components/Tag.vue'
import EarthIcon from 'vue-material-design-icons/Earth.vue';


export default {
  name: 'ArticlePreview',
  props: {
    article: Object
  },
  mixins: [formatDate],
  components: {
    Tag,

    // Icons
    EarthIcon
  },
  methods: {
    view_article(_id){
      this.$router.push({ path: 'article', query: { _id: _id } })
    },
  },
}
</script>

<style scoped>

.article_preview {
  position: relative;
  padding: 10px;
  flex-basis: 400px;

  cursor: pointer;

  /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
  border: 1px solid #dddddd;
  transition: border-color 0.25s;
}

.article_preview:hover {
  border-color: #c00000;
}



.article_title {

  /* DIRTY */
  margin-top: 10px;

  font-weight: bold;
  font-size: 120%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



.article_metadata {
  font-size: 75%;
  display: flex;
  color: #666666;
}

.article_metadata > * {
  margin-right: 5px;
}

.article_date {

}

.publishing_status {
  float: right;
}

.article_summary {
  margin-top: 5px;
  line-height: 120%;
  max-height: 100px;
  overflow-y: hidden;
}

.article_thumbnail {
  width: 80px;
  height: 80px;
  object-fit: contain;
  float: left;
  margin-right: 10px;
}


.tags_container {
  display: flex;
  flex-wrap: wrap;
}






</style>
