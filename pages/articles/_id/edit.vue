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

            <input
                id="tag_input"
                type="search"
                ref="tag_input"
                list="existing_tag_list"
                placeholder="New tag"
                @keyup.enter="add_tag()">
            
            <datalist id="existing_tag_list">
                <option
                    v-for="(existing_tag, index) in existing_tags"
                    :value="existing_tag.name"
                    :key="`existing_tag_${index}`"/>
            </datalist>



        </div>
        <h2>Summary</h2>
        <SummaryEditor v-model="article.summary" />

        <h2>Thumbnail</h2>

        <img 
            v-if="article.thumbnail_src" 
            :src="article.thumbnail_src"
            :alt="`${article.title}_thumbnail`">
        
        <span v-else>No thumbnail</span>

        <form @submit.prevent="upload_thumbnail()">
            <input 
                type="file"
                ref="new_thumbnail">
            
            <button type="submit">Upload</button>
        </form>
        


        <h2>Content</h2>
        <ArticleEditor 
            class="article_content editor_content"
            v-model="article.content" />
      </template>
      
        
    
  </div>
</template>

<script>
import ArticleEditor from '~/components/ArticleEditor.vue'
import SummaryEditor from '~/components/SummaryEditor.vue'

import Tag from '~/components/Tag.vue'


export default {
  components: {
    ArticleEditor,
    SummaryEditor,
    Tag,
  },

  data() {
    return {
        article: {
            content: 'This article has no content'
        },
        existing_tags: [],
      loading: false,
    }
  },
  mounted(){
      this.get_article()
      this.get_existing_tags()
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
    get_existing_tags(){

      const url = `${this.$config.apiUrl}/v1/tags/`
      this.$axios.get(url)
        .then(({data: tags}) => { this.existing_tags = tags })
        .catch(error => console.error(error))
    },

    update_article(){
        this.updating = true
        const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`

        const body = {
            ...this.article,
            tag_ids: this.article.tags.map( ({_id}) => _id),
        }

        this.$axios.patch(url, body)
        .then( () => {
            alert('Article saved')
        })
        .catch(error => {
            if(error.response) alert(error.response.data)
            else alert(error)
        })
        .finally( () => { this.updating = false })
    },
    remove_tag(index){
        this.article.tags.splice(index,1)
    },
    add_tag(){
        const name = this.$refs.tag_input.value
      if(!name.length) return
      const url = `${this.$config.apiUrl}/v1/tags`
      const body = { name }
      this.$axios.post(url, body)
        .then(({data: tag}) => {
            this.article.tags.push(tag)
            this.$refs.tag_input.value = ""
        })
        .catch(error => {
            alert(`Failed t oadd tag, see console for details`)
            console.error(error);
        })
    },

    upload_thumbnail(){
        const image = this.$refs.new_thumbnail.files[0]
        const formData = new FormData()
        formData.append('image',image)

        const url = `${this.$config.imageManagerApiUrl}/images`

        this.$axios.post(url, formData)
        .then( ({data}) => {
            const {_id} = data
            const thumbnail_src = `${this.$config.imageManagerApiUrl}/images/${_id}/thumbnail`
            this.$set(this.article, 'thumbnail_src', thumbnail_src)
        })
        .catch(error => {

            if(error.response) console.error(error.response.data)
            else console.error(error)

            alert(`Upload failed`)
        })
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
</style>
