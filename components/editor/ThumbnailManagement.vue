

<template>
  <div>
    <img
      v-if="article.thumbnail_src" class="thumbnail" :src="article.thumbnail_src" :alt="`${article.title}_thumbnail`"
      @click="open = true"
    >

    <button v-else class="outlined" @click="open = true">
      Set thumbnail
    </button>

    <Modal :open="open" @close="open = false">
      <div class="image_upload_modal_content">
        <h2>Thumbnail setting</h2>
        <template v-if="$config.imageManagerApiUrl">
          <h3>Via upload</h3>
          <form class="" @submit.prevent="upload_thumbnail()">
            <input ref="image_input" type="file" accept="image/*" name="image">
            <input type="submit" name="">
          </form>
        </template>
        <h3>via URL</h3>
        <form class="" @submit.prevent="set_thumbnail_src()">
          <input v-model="image_url" type="text">
          <input type="submit" name="">
        </form>
        <h3>Remove thumbnail</h3>

        <button @click="remove_thumbnail()">
          <MaterialIconDelete />
          <span>Remove Thumbnail</span>
        </button>
      </div>
    </Modal>
  </div>
</template>

<script>
import Modal from '~/components/Modal'

export default {
  name: 'ThumbnailManagement',
  components: {
    Modal,
  },
  props: {
    article: Object,
  },
  data(){
    return {
        open: false,
        image_url: ''
    }
  },
  methods: {


    upload_thumbnail(){
      const image = this.$refs.image_input.files[0]
      const formData = new FormData()
      formData.append('image',image)

      const url = `${this.$config.imageManagerApiUrl}/images`

      this.$axios.post(url, formData)
      .then( ({data: {_id}}) => {
          const src = `${this.$config.imageManagerApiUrl}/images/${_id}/thumbnail`
          // Not cool to modify props
          this.$set(this.article, 'thumbnail_src', src)
          this.open = false
      })
      .catch(error => {

          if(error.response) console.error(error.response.data)
          else console.error(error)

          alert(`Upload failed`)
      })
    },
    
    set_thumbnail_src(){
      this.$set(this.article, 'thumbnail_src', this.image_url)
      this.open = false
      this.image_url = ''

    },

    remove_thumbnail(){
      this.$set(this.article, 'thumbnail_src', null)
      this.open = false
    }
  }


}
</script>

<style scoped>
/* TODO: Share with ArticlePreview's */
.thumbnail {
  height: 10em;
  width: 10em;
  object-fit: cover;
  cursor: pointer;
}
</style>
