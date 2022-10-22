

<template>
  <div class="thumbnail_management">

    <!-- Current thumbnail -->
    <div class="current_thumbnail_wrapper" v-if="article.thumbnail_src">
      <img  
        class="thumbnail_preview" 
        :src="article.thumbnail_src" 
        :alt="`${article.title}_thumbnail`"
        @click="open = true">
    </div>
    

    <!-- Modal activator -->
    <button v-else class="outlined" @click="open = true">
      Set thumbnail
    </button>

    <Modal :open="open" @close="open = false">
      <div class="modal_content">
        <h2>Thumbnail setting</h2>

        <!-- Removing thumbnail -->
        <template v-if="article.thumbnail_src">
          <button @click="remove_thumbnail()">
            <MaterialIconDelete />
            <span>Remove Thumbnail</span>
          </button>
        </template>

        <template v-if="article_images.length">
          <h3>From article</h3>

          <div class="article_images_wrapper">
            <div class="article_image_wrapper" 
              v-for="(image, index) in article_images" 
              :key="`article_image_${index}`" 
              :class="{selected: image === article.thumbnail_src}"
              @click="set_thumbnail_src(image)">
              <img class="thumbnail_preview" :src="image" alt=""  >
            </div>
            

          </div>

          
          
        </template>

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
        image_url: '',
        article_images: [],
    }
  },
  watch: {
    open(){
      if (this.open) this.get_article_images()
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
    
    set_thumbnail_src(src = this.image_url){
      this.$set(this.article, 'thumbnail_src', src)
      this.open = false
      this.image_url = ''
    },

    remove_thumbnail(){
      this.set_thumbnail_src(null)
    },

    get_article_images(){
      const virtual_container = document.createElement('div')
      virtual_container.innerHTML = this.article.content
      const images = virtual_container.getElementsByTagName('img')
      this.article_images = [...images].map(i => i.src)
    }
  },



}
</script>

<style scoped>
.thumbnail_management{
  display: flex;
}
.current_thumbnail_wrapper {
  position: relative;
  cursor: pointer;
}

.current_thumbnail_wrapper:hover::after {
  content: '✎';
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 2em;
  height: 2em;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 100%;
}

.thumbnail_preview {
  height: 10em;
  width: 10em;
  object-fit: cover;
}

.modal_content {
  max-width: 40rem;
}


.article_images_wrapper {
  width: 100%;
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5em;
  overflow-x: auto;
}




.article_image_wrapper {
  position: relative;
  cursor: pointer;
  border: 1px solid #dddddd;
  display: flex;
}

.article_image_wrapper.selected::after {
  content: '✔';
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  width: 2em;
  height: 2em;
  background-color: #c00000;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  border-radius: 100%;
}
</style>
