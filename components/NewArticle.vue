<!-- TODO: Consider a modal instead -->
<template>
  <Modal v-model="open">
    <div class="content">
      <h3>New article</h3>

      <form @submit.prevent="createArticle()">
        <input
          type="text"
          v-model="title"
          class="text_input"
          placeholder="Title"
        />

        <button type="submit" class="button">
          <Icon name="mdi:file-document-plus"></Icon>
        </button>
      </form>
    </div>
  </Modal>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"

const emit = defineEmits(["update:modelValue"])
const props = defineProps<{
  modelValue: boolean
}>()

const open = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const title = ref("")
const creating = ref(false)

const createArticle = async () => {
  const body = {
    title: title.value,
    content: `<h1>${title.value}</h1><p>This article has no content yet</p>`,
  }

  const options = {
    method: "POST",
    body,
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie("jwt").value}` },
  }

  const url = "/articles"

  creating.value = true

  try {
    const { _id } = await $fetch<Article>(url, options)
    router.push(`/articles/${_id}/edit`)
  } catch (error) {
    alert("Failed to create article")
    console.error(error)
  } finally {
    creating.value = false
  }
}
</script>

<style scoped>
.content {
  padding: 1rem 2rem;
}
</style>
