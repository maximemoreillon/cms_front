<template>
  <div>
    <!-- TODO: Loader -->
    <template v-if="article">
      <div class="toolbar">
        <router-link
          v-if="article_id !== 'new'" :to="{ name: 'articles-id', params: { id: article_id } }"
          class="metadata_element button"
        >
          <MaterialIconArrowLeft class="metadata_icon" />
          <span>Return to article</span>
        </router-link>


        <div class="spacer" />
        <button @click="submit_article()">
          <MaterialIconContentSave />
          <span>Save</span>
        </button>
      </div>

      <!-- Note: removed class here for default CSS in editor -->
      <ArticleEditor ref="articleEditor" v-model="article.content" />

      <!-- TODO: Make this its own component -->
      <div class="article_settings">
        <TagList
          :tags="article.tags" removable input @newTag="add_tag($event)"
          @tagRemoved="remove_tag($event)"
        />

        <h3>Summary</h3>
        <SummaryEditor v-model="article.summary" />

        <div class="flex">
          <div class="grow">
            <h3>Thumbnail</h3>
            <ThumbnailManagement :article="article" />
          </div>
          <div class="grow">
            <h3>Visibility</h3>
            <div class="visibility_wrapper">
              <div>
                <input id="private" v-model="article.published" type="radio" :value="false">
                <label for="private">
                  <MaterialIconLock />
                  <span>Private</span>
                </label>
              </div>
              <div>
                <input id="public" v-model="article.published" type="radio" :value="true">
                <label for="public">
                  <MaterialIconEarth />
                  <span>Public</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </template>

    <Snackbar v-model="snackbar.show" :text="snackbar.text" color="green" />
  </div>
</template>

<script>
import ArticleEditor from '~/components/editor/ArticleEditor.vue'
import SummaryEditor from '~/components/editor/SummaryEditor.vue'
import ThumbnailManagement from '~/components/editor/ThumbnailManagement.vue'
import Snackbar from '~/components/Snackbar.vue'
import TagList from '../../../components/TagList.vue'


export default {
    name: 'ArticleEdit',
    components: {
        ArticleEditor,
        SummaryEditor,
        ThumbnailManagement,
        TagList,
        Snackbar
    },

  data() {
    return {
        article: {
            title: 'Untitled article',
            content: '<h1>New article</h1><p>This article has no content</p>',
            summary: 'This article has no summary',
            tags: [],
            published: false,
        },
        snackbar: {
            show: false,
            text: '',
        },
        existing_tags: [],
        loading: false,
    }
  },
  computed: {
      article_id(){
          return this.$route.params.id
      }
  },
  watch: {
    article_id(){
        // Prevents getting an empty article after saving a new one
        if (this.article_id !== 'new') this.get_article()
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
    submit_article(){
        if(this.article_id === 'new') {
            this.create_article()
        }
        else {
            this.update_article()
        }
    },
    create_request_body(){

        // Title is first H1 of the article
        const articleFirstH1 = this.$refs.articleEditor.$refs.editorContent.$el.querySelector('h1')
        const title = articleFirstH1?.innerText || 'Untitled article'

        // Get IDs from tags
        const tag_ids = this.article.tags.map(({ _id }) => _id)

        return { ...this.article, title, tag_ids, }
    },
    async create_article(){
        this.updating = true
        const url = `${this.$config.apiUrl}/v1/articles`        

        const body = this.create_request_body()

        try {
            const article = await this.$axios.$post(url, body)
            // This resets the article content
            this.$router.push({ name: 'articles-id-edit', params: { id: article._id } })
        } catch (error) {
            if (error.response) alert(error.response.data)
            else alert(error)
        }
        finally {
            this.updating = false
        }
    },
    async update_article(){
        this.updating = true
        const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`

        const body = this.create_request_body()

        try {
            await this.$axios.patch(url, body)
            this.snackbar.show = true
            this.snackbar.text = 'Article saved'
        } catch (error) {
            if (error.response) alert(error.response.data)
            else alert(error)
        }
        finally {
            this.updating = false
        }
        
    },
    remove_tag(index){
        this.article.tags.splice(index,1)
    },
    add_tag(name){

        if(!name.length) return
        const url = `${this.$config.apiUrl}/v1/tags`
        const body = { name }
        this.$axios.post(url, body)
        .then(({data: tag}) => {
            this.article.tags.push(tag)
        })
        .catch(error => {
            alert(`Failed to add tag, see console for details`)
            console.error(error);
        })
    },
    handle_keydown(e) {
        // Keyboard events

        // CTRL S
        if (e.key === 's' && e.ctrlKey) {
            e.preventDefault()
            this.submit_article()
        }

    },


    
  }

}
</script>

<style>


.article_settings{
    border-top: 1px solid #dddddd;
    padding-top: 1em;
}
</style>
