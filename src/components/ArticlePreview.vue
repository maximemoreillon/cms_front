<template>
  <div
    class="article_preview"
    v-on:click="view_article(article._id)">

    <!-- indictor for published -->
    <span
      v-if="article.published && $store.state.user"
      class="publishing_status mdi mdi-earth"/>



    <!-- Article title, consists of first h1 of the content -->
    <div class="article_title">{{article_title}}</div>

    <!-- date and publish status-->
    <div class="article_metadata" v-if="article.creation_date">
      <span class="article_date">{{format_date(article.creation_date)}}</span>
    </div>

    <!-- alt set to empty string to display nothing if no thumbnail -->
    <img class="article_thumbnail" v-if="article_thumbnail_src" v-bind:src="article_thumbnail_src" alt="">

    <!-- Summary -->
    <dot class="article_summary" v-bind:msg="article_summary"/>


  </div>
</template>

<script>
import {formatDate} from '@/mixins/formatDate.js'
import dot from 'vue-text-dot'


export default {
  name: 'ArticlePreview',
  props: {
    article: Object
  },
  components: {
    dot,
  },
  mixins: [formatDate],
  methods: {
    view_article(_id){
      this.$router.push({ path: 'article', query: { _id: _id } })
    },
  },
  computed: {
    article_title(){
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article.content
      var first_h1 = virtual_container.getElementsByTagName('h1')[0]
      if(first_h1)return first_h1.innerHTML
      else return "Untitled"
    },
    article_summary(){
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article.content
      var first_p = virtual_container.getElementsByTagName('p')[0]
      if(first_p) return first_p.innerHTML
      else return ""
    },
    article_thumbnail_src(){
      var virtual_container = document.createElement('div');
      virtual_container.innerHTML = this.article.content
      var first_img = virtual_container.getElementsByTagName('img')[0]
      if(first_img) return first_img.src
      else return ""
    }
  }
}
</script>

<style scoped>
.article_preview {
  position: relative;
  margin: 10px;
  padding: 10px;
  flex-basis: 400px;

  cursor: pointer;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}





.article_preview .article_title {
  font-weight: bold;
  font-size: 120%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;

  transition: color 0.25s;
}

.article_preview:hover .article_title {
  color: #c00000;
}

.article_preview .article_metadata {
  font-size: 75%;
  display: flex;
}

.article_preview .article_date {
  color: #666666;
}

.publishing_status {
  float: right;
}

.article_preview .article_summary {
  margin-top: 5px;
  line-height: 120%;
}

.article_thumbnail {
  width: 80px;
  height: 80px;
  object-fit: contain;
  float: left;
  margin-right: 10px;
}


</style>
