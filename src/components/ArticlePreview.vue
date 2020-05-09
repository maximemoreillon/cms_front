<template>
  <div
    class="article_preview"
    v-on:click="$router.push({ path: 'article', query: { id: article.identity.low } })">

    <!-- indictor for published -->
    <earth-icon class="publishing_status" v-if="article.properties.published && $store.state.logged_in"/>

    <!-- Article title, consists of first h1 of the content -->
    <div class="preview_header">
      <div class="article_title">{{article.properties.title}}</div>

      <!-- date -->
      <div
        class="article_date"
        v-if="article.relationship.properties.creation_date">
        {{format_date(article.relationship.properties.creation_date)}}
      </div>
    </div>


    <!-- alt set to empty string to display nothing if no thumbnail -->
    <div class="article_preview_body">
      <img
        class="article_thumbnail"
        v-if="article.properties.thumbnail_src"
        v-bind:src="article.properties.thumbnail_src"
        alt="">

      <!-- Summary -->
      <div class="article_summary"
        v-if="article.properties.summary"
        v-html="article.properties.summary"/>
    </div>


    <div
      class="tags_container"
      v-if="tags && !tags_loading">

      <Tag
        v-for="tag in tags"
        v-bind:key="tag.identity.low"
        v-bind:tag="tag"/>

    </div>

    <Loader v-else-if="tags_loading"/>


  </div>
</template>

<script>

import Loader from '@moreillon/vue_loader'

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
    Loader,

    // Icons
    EarthIcon
  },
  mounted() {
    this.get_tags()
  },
  methods: {
    get_tags(){
      this.tags_loading = true
      this.axios.get(`${process.env.VUE_APP_CMS_API_URL}/tags_of_article?id=${this.article.identity.low}`)
      .then(response => {

        this.tags.splice(0,this.tags.length)
        response.data.forEach(record => {
          let tag = record._fields[record._fieldLookup['tag']]
          this.tags.push(tag)
        })
        this.tags_loading = false
      })
      .catch(error =>  alert(error.response.data) )
    }
  },

}
</script>

<style scoped>

.article_preview {
  position: relative;
  padding: 0.75em;
  //flex-basis: 400px;

  cursor: pointer;

  /*box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);*/
  border: 1px solid #dddddd;
  transition: border-color 0.25s;
}

.article_preview:hover {
  border-color: #c00000;
}

.article_preview > *:not(:last-child) {
  margin: 0.75em 0;
}



.article_title {
  font-weight: bold;
  font-size: 120%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}



.article_date {
  font-size: 75%;
  display: flex;
  color: #666666;
}

.publishing_status {
  /* not too happy with float */
  float: right;
}

.article_preview_body {
  display: flex;
  align-items: flex-start;
}


.article_summary {
  line-height: 120%;
  max-height: 100px;
  overflow-y: hidden;
}


.article_thumbnail {
  width: 80px;
  height: 80px;
  object-fit: contain;
  margin-right: 10px;
}


.tags_container {
  display: flex;
  flex-wrap: wrap;
}

.tags_container > *{
  margin: 5px 0;

}

.tags_container > *:not(:last-child) {
  margin-right: 5px;

}






</style>
