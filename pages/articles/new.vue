<!-- TODO: Consider a modal instead -->
<template>
  <h1>New article</h1>

  <form @submit.prevent="createArticle()">
    <input type="text" v-model="title" />

    <button type="submit">
      <Icon name="mdi:plus"></Icon>
      <span>Create article</span>
    </button>
  </form>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"

definePageMeta({
  middleware: ["auth"],
})

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const title = ref("A new article")
const creating = ref(false)

const createArticle = async () => {
  const body = {
    title: title.value,
    content: `<h1>${title.value}</h1>`,
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
