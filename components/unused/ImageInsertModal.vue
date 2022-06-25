

<template>
    <Modal
      :open="open"
      @close="$emit('close')">

      <div class="image_upload_modal_content">
        <h2>Image insert</h2>
        <template v-if="$config.imageManagerApiUrl">
          <h3>Via upload</h3>
          <form
            class=""
            @submit.prevent="image_upload()">
            <input type="file" accept="image/*" ref="image_input" name="image">
            <input type="submit" name="">
          </form>
        </template>
        <h3>via URL</h3>
        <form
          class=""
          v-on:submit.prevent="submit_image_link()">
          <input type="text" ref="image_url_input">
          <input type="submit" name="">
        </form>
        
        
      </div>
    </Modal>
</template>

<script>
import Modal from '~/components/Modal'


export default {
  name: 'ImageInsertModal',
  components: {
    Modal,
  },
  props: {
    open: Boolean,
    editor: Object
  },
  data(){
    return {
    }
  },
  methods: {

    add_image(src){
      this.editor.chain().focus().setImage({ src }).run()
      this.$refs.image_url_input.value = ""
      this.$refs.image_input.value = null
      this.$emit('close')
    },
    submit_image_link(){
      const src = this.$refs.image_url_input.value
      this.add_image(src)
    },

    image_upload(){


      const formData = new FormData()
      formData.append('image', this.$refs.image_input.files[0])
      const url = `${this.$config.imageManagerApiUrl}/images`
      this.$axios.post(url, formData)
      .then( ({data: {_id}}) => {
        const src = `${this.$config.imageManagerApiUrl}/images/${_id}`
        this.add_image(src)

      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    }
  }


}
</script>

<style scoped>

</style>
