<template>

  <div class="article_list_view">


    <div
      class="article_preview_container"
      v-for="article in articles"
      v-bind:key="article._id"
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

    </div>




  </div>


</template>

<script>
export default {
  components: {

  },
  data () {
    return {
      articles: []
    }
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
  },
  mounted() {
    this.axios.post('https://cms.maximemoreillon.com/get_article_list')
    .then(response => {
      this.articles = response.data
    })
    .catch(error => alert(error))
  }
}
</script>


<style scoped>

.article_list_view {
  display: flex;
  flex-wrap: wrap;
}

.article_preview_container {

  border: 1px solid #dddddd;
  margin: 10px;
  padding: 10px;
  flex-basis: 200px;

  cursor: pointer;
}

.article_title {
  font-weight: bold;
}
.article_date {
  color: #666666;
  font-size: 75%;
}



</style>
