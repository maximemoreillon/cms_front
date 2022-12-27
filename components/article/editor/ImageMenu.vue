<template>
    <button class="menu_wrapper" @click="open = !open">
        <Icon name="mdi:image-plus" />

        <div v-if="open" class="menu_content" @click.stop>
            <h2>Image insert</h2>

            <template v-if="runtimeConfig.imageManagerApiUrl">
                <h3>Via upload</h3>
                <form @submit.prevent="imageUpload()">
                    <input ref="imageToUpload" type="file" accept="image/*">
                    <button type="submit">
                        <Icon name="mdi:upload" />
                    </button>
                </form>
            </template>

            <h3>via URL</h3>
            <form class="" @submit.prevent="insertImage(imageUrl)">
                <input v-model="imageUrl" type="text">
                <button type="submit">
                    <Icon name="mdi:link-plus" />
                </button>
            </form>
        </div>

    </button>
</template>

<script lang="ts" setup>

const runtimeConfig = useRuntimeConfig()
const props = defineProps({
    editor: Object,
})
const open = ref(false)
const uploading = ref(false)
const imageToUpload = ref()
const imageUrl = ref('')

const insertImage = (src: string) => {
    props.editor?.chain().focus().setImage({ src, alt: 'Article image' }).run()
    imageToUpload.value = null
}

const imageUpload = async () => {

    uploading.value = true

    const body = new FormData()

    const image = imageToUpload.value.files[0]
    body.append('image', image)

    const options = {
        method: 'POST',
        body,
        headers: { authorization: `Bearer ${useCookie('jwt').value}` },
    }

    const url = `${runtimeConfig.public.imageManagerApiUrl}/images/`

    try {
        const {_id} = await $fetch<{_id: string}>(url, options)
        const src = `${runtimeConfig.public.imageManagerApiUrl}/images/${_id}`
        insertImage(src)
        open.value = false
    } catch (error) {
        console.error(error)
    } finally {
        uploading.value = false
    }
}


</script>

<style scoped>
.menu_wrapper {
    position: relative;
}

.menu_content {
    position: absolute;
    background-color: white;
}
</style>