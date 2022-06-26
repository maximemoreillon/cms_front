

<template>
    <div class="menu_wrapper">
        <button @click="open = !open">
            <MaterialIconImage />
        </button>
        <div class="menu_content" v-if="open">
            <h2>Image insert</h2>
            <template v-if="$config.imageManagerApiUrl">
                <h3>Via upload</h3>
                <form class="" @submit.prevent="image_upload()">
                    <input type="file" accept="image/*" ref="image_input" name="image">
                    <input type="submit" name="">
                </form>
            </template>
            <h3>via URL</h3>
            <form class="" v-on:submit.prevent="submit_image_link()">
                <input type="text" ref="image_url_input">
                <input type="submit" name="">
            </form>
        </div>

    </div>
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
            this.editor.chain().focus().setImage({ src }).run()
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
}
.menu_content {
    z-index: 3;
    background-color: white;
    border: 1px solid #dddddd;
    right: 0;
    
    position: absolute;
    padding: 1em;
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
