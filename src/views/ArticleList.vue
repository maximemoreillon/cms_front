<template>

  <div class="article_list_view">

    <div
      class="article_preview_container"
      v-for="article in articles"
      v-bind:key="article._id"
      v-on:click="view_article(article._id)">

      <div class="">
        {{article.title}}
      </div>

      <div class="actions_container">

        <!--
        <button type="button" v-on:click="view_article(article._id)">View</button>
        <button type="button" v-on:click="edit_article(article._id)">Edit</button>
        <button type="button" v-on:click="delete_article(article._id)">Delete</button>
        -->

        <IconButton v-if="false" icon="mdi-arrow-right" v-on:buttonClicked="view_article(article._id)"/>

      </div>


    </div>

  </div>


</template>

<script>
import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  components: {
    IconButton
  },
  data () {
    return {
      articles: []
    }
  },
  methods: {
    delete_article(_id){
      this.axios.post('https://cms.maximemoreillon.com/delete_article', {_id: _id})
      .then(response => {
        console.log(response.data)
      })
      .catch(error => alert(error))
    },
    edit_article(_id){
      this.$router.push({ path: 'article_editor', query: { _id: _id } })
    },
    view_article(_id){
      this.$router.push({ path: 'article', query: { _id: _id } })
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

.article_list_view {
  display: flex;
}

.article_preview_container {

  border: 2px solid #dddddd;
  margin: 25px;
  padding: 10px;
  flex-basis: 200px;
}

.actions_container {
  text-align: right;
}

</style>
