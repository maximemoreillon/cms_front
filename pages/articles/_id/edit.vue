<template>
  <div>
    <editor v-model="article.content" />
  </div>
</template>

<script>
import Editor from '~/components/TiptapEditor.vue'

export default {
  components: {
    Editor,
  },

  data() {
    return {
        article: {
            content: 'This article has no content'
        },
      loading: false,
    }
  },
  mounted(){
      this.get_article()
  },
  methods: {
      get_article(){

        this.loading = true;
        this.$axios.get(`${this.$config.apiUrl}/v1/articles/${this.article_id}`)
        .then( ({data}) => {
            this.article = data
        })
        .catch(error => {
            if(error.response) alert(error.response.data)
            else alert(error)
        })
        .finally( () => { this.loading = false })
    }
  },
  computed: {
      article_id(){
          return this.$route.params.id
      }
  }

}
</script>

<style>

</style>
