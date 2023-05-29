<template>
  <template v-if="runtimeConfig.imageManagerApiUrl">
    <h3>Via upload</h3>
    <form @submit.prevent="imageUpload()">
      <!-- TODO: use an icon -->
      <label for="image-upload" class="button">
        <Icon name="mdi:folder" />
        <span>Browse files</span>
      </label>
      <div class="spacer" />
      <input
        ref="imageToUpload"
        type="file"
        accept="image/*"
        id="image-upload"
      />
      <button type="submit" class="button">
        <Icon name="mdi:upload" />
      </button>
    </form>
  </template>

  <h3>Via URL</h3>
  <form class="" @submit.prevent="insertImage(imageUrl)">
    <input
      v-model="imageUrl"
      type="text"
      class="text_input"
      placeholder="URL"
    />
    <button type="submit" class="button">
      <Icon name="mdi:link-plus" />
    </button>
  </form>
</template>

<script lang="ts" setup>
const uploading = ref(false)
const runtimeConfig = useRuntimeConfig()
const imageToUpload = ref()
const imageUrl = ref("")
const emit = defineEmits(["insert"])

const imageUpload = async () => {
  uploading.value = true

  const body = new FormData()

  const image = imageToUpload.value.files[0]
  body.append("image", image)

  const options = {
    method: "POST",
    body,
    headers: { authorization: `Bearer ${useCookie("jwt").value}` },
  }

  const url = `${runtimeConfig.public.imageManagerApiUrl}/images/`

  try {
    const { _id } = await $fetch<{ _id: string }>(url, options)
    const src = `${runtimeConfig.public.imageManagerApiUrl}/images/${_id}`
    insertImage(src)
  } catch (error) {
    console.error(error)
  } finally {
    uploading.value = false
  }
}

const insertImage = (url: string) => {
  emit("insert", url)
  imageToUpload.value = null
  imageUrl.value = ""
}
</script>

<style>
form {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input {
  flex-grow: 1;
}

input[type="file"] {
  display: none;
}
</style>
