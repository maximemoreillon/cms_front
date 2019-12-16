<template>
  <div
    class="article_preview"
    v-on:click="view_article(article._id)">

    <!-- content that appears on the report card -->
    <div
      class="article_title"
      v-if="article.title">
      {{article.title}}
    </div>

    <!-- fallback if title does not exist -->
    <div
      class="article_title"
      v-else>
      Untitled article
    </div>

    <!-- date -->
    <div class="article_date" v-if="article.creation_date">
      {{format_date(new Date(article.creation_date))}}
    </div>

    <div class="article_summary" v-if="article.summary">
      {{article.summary}}
    </div>

  </div>
</template>

<script>
export default {
  name: 'ArticlePreview',
  props: {
    article: Object
  },
  methods: {
    view_article(_id){
      this.$router.push({ path: 'article', query: { _id: _id } })
    },
    format_date(date){
      var mm = date.getMonth() + 1; // getMonth() is zero-based
      var dd = date.getDate();
      return [date.getFullYear(), (mm>9 ? '' : '0') + mm, (dd>9 ? '' : '0') + dd ].join('/');
    }
  }
}
</script>

<style scoped>
.article_preview {

  margin: 10px;
  padding: 10px;
  flex-basis: 300px;

  cursor: pointer;

  box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
}



.article_preview .article_title {
  font-weight: bold;
}
.article_preview .article_date {
  color: #666666;
  font-size: 75%;
}
.article_preview .article_summary {
  margin-top: 5px;
  max-height: 100px;
  overflow: hidden;
}


</style>
