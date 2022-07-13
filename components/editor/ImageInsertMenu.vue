

<template>
  <button class="menu_wrapper" @click="open = !open">
    <MaterialIconImage />
    <div v-if="open" class="menu_content" @click.stop>
      <h2>Image insert</h2>
      <template v-if="$config.imageManagerApiUrl">
        <h3>Via upload</h3>
        <form class="" @submit.prevent="image_upload()">
          <input ref="image_input" type="file" accept="image/*" name="image">
          <input type="submit" name="">
        </form>
      </template>
      <h3>via URL</h3>
      <form class="" @submit.prevent="submit_image_link()">
        <input ref="image_url_input" type="text">
        <input type="submit" name="">
      </form>
    </div>
  </button>
</template>

<script>

export default {
    name: 'ImageInsertMenu',
    components: {
        
    },
    props: {
        editor: Object
    },
    data() {
        return {
            open: false,
        }
    },
    methods: {

        add_image(src) {
            this.editor.chain().focus().setImage({ src, alt: 'Article image' }).run()
            this.$refs.image_url_input.value = ""
            this.$refs.image_input.value = null
            this.open = false
        },
        submit_image_link() {
            const src = this.$refs.image_url_input.value
            this.add_image(src)
        },

        image_upload() {


            const formData = new FormData()
            formData.append('image', this.$refs.image_input.files[0])
            const url = `${this.$config.imageManagerApiUrl}/images`
            this.$axios.post(url, formData)
                .then(({ data: { _id } }) => {
                    const src = `${this.$config.imageManagerApiUrl}/images/${_id}`
                    this.add_image(src)

                })
                .catch(error => {

                    if (error.response) console.error(error.response.data)
                    else console.error(error)

                    alert(`Upload failed`)
                })

        }
    }


}
</script>

<style scoped>
.menu_wrapper{
    position: relative;
    display: inline-flex;
    align-items: center;
}
.menu_content {
    /* Setting back cursor because button */
    cursor: initial;
    z-index: 3;
    background-color: white;
    border: 1px solid #dddddd;
    padding: 1em;
    
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
}

form {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5em;
}

input[type="text"] {
    flex-grow: 1;
}
</style>
