<template>
  <div>
      <template>
        <h1 v-if="article">{{article.title}}</h1>
        <button @click="update_article()">Save</button>
        <h2>Tags</h2>
        <div class="tags_wrapper">
           <Tag
            v-for="(tag, index) in article.tags"
            :key="`tag_${index}`"
            :tag="tag"
            removable
            @remove="remove_tag(index)"/>

        </div>
        <h2>Summary</h2>
        <textarea v-model="article.summary" />
        <h2>Thumbnail</h2>
        <div>{{article.thumbnail_src}}</div>

        <h2>Content</h2>
        <Editor 
            class="article_content editor_content"
            v-model="article.content" />
      </template>
      
        
    
  </div>
</template>

<script>
import Editor from '~/components/TiptapEditor.vue'
import Tag from '~/components/Tag.vue'


export default {
  components: {
    Editor,
    Tag,
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
        const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`
        this.$axios.get(url)
        .then( ({data}) => {
            this.article = data
        })
        .catch(error => {
            if(error.response) alert(error.response.data)
            else alert(error)
        })
        .finally( () => { this.loading = false })
    },
    update_article(){
        this.updating = true
        const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`

        const body = {
            ...this.article,
            tag_ids: this.article.tags.map(tag => this.get_id_of_item(tag)),
        }

        this.$axios.patch(url, body)
        .then( ({data}) => {
            this.article = data
        })
        .catch(error => {
            if(error.response) alert(error.response.data)
            else alert(error)
        })
        .finally( () => { this.updating = false })
    },
    remove_tag(index){
        this.article.tags.splice(index,1)
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
.tags_wrapper{
    display: flex;
    gap: 0.5em;
}
.editor_content {
    border: 1px solid #dddddd;
}
</style>
