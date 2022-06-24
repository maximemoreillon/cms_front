<template>
    <div>
        <template v-if="article">

            <div class="top_toolbar">

                <div class="spacer" />
                <button @click="update_article()">
                    <MaterialIconContentSave />
                </button>

            </div>

            <ArticleEditor class="article_content editor_content" v-model="article.content" ref="articleEditor" />

            <h2>Visibility</h2>
            <div class="visibility_wrapper">
                <div>
                    <input type="radio" id="private" :value="false" v-model="article.published">
                    <label for="private">
                        <MaterialIconLock />
                        <span>Private</span>
                    </label>
                </div>
                <div>
                    <input type="radio" id="public" :value="true" v-model="article.published">
                    <label for="public">
                        <MaterialIconEarth />
                        <span>Public</span>
                    </label>
                </div>
            </div>



            <h2>Tags</h2>
            <div class="tags_wrapper">
                <Tag v-for="(tag, index) in article.tags" :key="`tag_${index}`" :tag="tag" removable
                    @remove="remove_tag(index)" />

                <input id="tag_input" type="search" ref="tag_input" list="existing_tag_list" placeholder="New tag"
                    @keyup.enter="add_tag()">

                <datalist id="existing_tag_list">
                    <option v-for="(existing_tag, index) in existing_tags" :value="existing_tag.name"
                        :key="`existing_tag_${index}`" />
                </datalist>

            </div>
            <h2>Summary</h2>
            <SummaryEditor v-model="article.summary" />

            <ThumbnailManagement :article="article" />

        </template>


    </div>
</template>

<script>
import ArticleEditor from '~/components/ArticleEditor.vue'
import SummaryEditor from '~/components/SummaryEditor.vue'
import ThumbnailManagement from '~/components/ThumbnailManagement.vue'

import Tag from '~/components/Tag.vue'


export default {
  components: {
    ArticleEditor,
    SummaryEditor,
    ThumbnailManagement,
    Tag,
  },

  data() {
    return {
        article: {
            title: 'Untitled article',
            content: 'This article has no content',
            summary: '',
        },
        existing_tags: [],
      loading: false,
    }
  },
  mounted(){
      if(this.article_id !== 'new') this.get_article()
      this.get_existing_tags()
      document.addEventListener("keydown", this.handle_keydown)

  },
  beforeDestroy() {
    document.removeEventListener("keydown", this.handle_keydown)
  },
  methods: {
    get_article(){
        this.loading = true
        const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`
        this.$axios.get(url)
        .then( ({data}) => {
            this.article = data
        })
        .catch(error => {
            if(error.response) console.error(error.response.data)
            else console.error(error)
        })
        .finally( () => {
            this.loading = false
        })
    },
    get_existing_tags(){
      const url = `${this.$config.apiUrl}/v1/tags/`
      this.$axios.get(url)
        .then(({data: tags}) => { this.existing_tags = tags })
        .catch(error => { console.error(error) })
    },

    update_article(){
        this.updating = true
        const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`

        const articleHFirst1 = this.$refs.articleEditor.$refs.editorContent.$el.querySelector('h1')
        const title = articleHFirst1?.innerText || 'Untitled article'

        const body = {
            ...this.article,
            title,
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
      handle_keydown(e) {
          // Keyboard events

          // CTRL S
          if (e.key === 's' && e.ctrlKey) {
              e.preventDefault()
              this.update_article()
          }

      },


    
  },
  computed: {
      article_id(){
          return this.$route.params.id
      }
  }

}
</script>

<style>
.top_toolbar{
    display: flex;
    border-bottom: 1px solid #dddddd;
}
.tags_wrapper{
    display: flex;
    gap: 0.5em;
}
</style>
