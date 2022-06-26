

<template>
  <div>

    <img
      v-if="article.thumbnail_src" 
      :src="article.thumbnail_src"
      :alt="`${article.title}_thumbnail`"
      @click="open = true">
    
    <button 
      class="outlined"
      v-else
      @click="open = true">
      Set thumbnail
    </button>

    <Modal
      :open="open"
      @close="open = false">

      <div class="image_upload_modal_content">
        <h2>Thumbnail setting</h2>
        <template v-if="$config.imageManagerApiUrl">
        <h3>Via upload</h3>
        <form
            class=""
            @submit.prevent="upload_thumbnail()">
            <input type="file" accept="image/*" ref="image_input" name="image">
            <input type="submit" name="">
        </form>
        </template>
        <h3>via URL</h3>
        <form
          class=""
          v-on:submit.prevent="set_thumbnail_url()">
          <input type="text" ref="image_url_input">
          <input type="submit" name="">
        </form>
        <h3>Remove thumbnail</h3>
        <button @click="remove_thumbnail()">Remove</button>

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
    }
  },
  methods: {


    upload_thumbnail(){
        const image = this.$refs.new_thumbnail.files[0]
        const formData = new FormData()
        formData.append('image',image)

        const url = `${this.$config.imageManagerApiUrl}/images`

        this.$axios.post(url, formData)
        .then( ({data}) => {
            const {_id} = data
            const src = `${this.$config.imageManagerApiUrl}/images/${_id}/thumbnail`
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
      const src = this.$refs.image_url_input.value
      this.$set(this.article, 'thumbnail_src', src)
      this.open = false

    },

    remove_thumbnail(){
      this.$set(this.article, 'thumbnail_src', null)
      this.open = false
    }
  }


}
</script>

<style scoped>

</style>
