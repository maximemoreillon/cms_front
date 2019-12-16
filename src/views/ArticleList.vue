<template>

  <div class="article_list_view">


    <div class="">
      <IconButton icon="mdi-plus" v-on:buttonClicked="new_article()"/>
    </div>


    <div class="articles_container">

      <ArticlePreview
        class="article_preview_container card-1"
        v-for="article in articles"
        v-bind:key="article._id"
        v-bind:article="article"/>

    </div>







  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import ArticlePreview from '@/components/ArticlePreview.vue'

export default {
  components: {
    IconButton,
    ArticlePreview
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {

    new_article(){
      this.$router.push({ path: 'article_editor' })
    },

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

.articles_container {
  display: flex;
  flex-wrap: wrap;
}





</style>
