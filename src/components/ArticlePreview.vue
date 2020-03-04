<template>
  <div
    class="article_preview"
    v-on:click="$router.push({ path: 'article', query: { id: article.identity.low } })">

    <!-- indictor for published -->
    <earth-icon class="publishing_status" v-if="article.properties.published && $store.state.logged_in"/>

    <!-- Article title, consists of first h1 of the content -->
    <div class="article_title">{{article.properties.title}}</div>

    <!-- date -->
    <div class="article_metadata" v-if="article.properties.creation_date">
      <span class="article_date">{{format_date(article.properties.creation_date)}}</span>
    </div>

    <!-- alt set to empty string to display nothing if no thumbnail -->
    <img
      class="article_thumbnail"
      v-if="article.properties.thumbnail_src"
      v-bind:src="article.properties.thumbnail_src"
      alt="">

    <!-- Summary -->
    <div class="article_summary"
      v-if="article.properties.summary"
      v-html="article.properties.summary"/>

    <div class="tags_container" v-if="tags">

      <Tag
        v-for="tag in tags"
        v-bind:key="tag.identity.low"
        v-bind:tag="tag"/>

    </div>

    <!-- TODO: replace with loader -->
    <div class="tags_container" v-else-if="tags_loading">Loading</div>


  </div>
</template>

<script>
import {formatDate} from '@/mixins/formatDate.js'
//import {parseArticleRecord} from '@/mixins/parseArticleRecord.js'

import Tag from '@/components/Tag.vue'
import EarthIcon from 'vue-material-design-icons/Earth.vue';


export default {
  name: 'ArticlePreview',
  props: {
    article: Object
  },
  data() {
    return {
      tags: [],
      tags_loading: false,
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
    this.get_tags()
  },
  methods: {
    get_tags(){
      this.tags_loading = true
      this.axios.post(process.env.VUE_APP_API_URL + '/get_tags_of_article', {
        id: this.article.identity.low
      })
      .then(response => {

        this.tags.splice(0,this.tags.length)
        response.data.forEach(record => {
          let tag = record._fields[record._fieldLookup['tag']]
          this.tags.push(tag)
        })
        this.tags_loading = false
      })
      .catch(error => {
        console.log(error.response.data)
      })
    }
  }
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
