<template>
  <template v-if="article">
    <section class="controls">
      <NuxtLink :to="`/articles/${route.params.id}`" class="button">
        <Icon name="mdi:arrow-left" />
      </NuxtLink>
      <div class="spacer" />
      <IconButton
        icon="mdi:delete"
        :loading="deleting"
        @click="deleteArticle()"
      />
      <IconButton
        icon="mdi:content-save"
        :loading="saving"
        @click="saveArticle()"
      />
    </section>

    <section>
      <ArticleEditor v-model="article.content" />
    </section>

    <ArticleMetadataEditor v-model="article" />
  </template>

  <Snackbar v-model="snackbar.show" :class="snackbar.class">
    {{ snackbar.message }}
  </Snackbar>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"
import type Tag from "~~/types/Tag"

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const saving = ref(false)
const deleting = ref(false)
const snackbar = reactive({
  show: false,
  message: "",
  class: "",
})

const url = `articles/${route.params.id}`
const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}
const { data: article, error } = await useFetch<Article>(url, fetchOpts)

const getArticleTitleFromH1 = () => {
  if (!article.value) return ""
  const articleDom = new DOMParser().parseFromString(
    article.value.content,
    "text/html"
  )
  const h1 = articleDom.querySelector("h1")
  if (!h1) return "Untitled article"
  return h1.innerText
}

const saveArticle = async () => {
  const url = `articles/${route.params.id}`

  const options = {
    ...fetchOpts,
    method: "PATCH",
    body: {
      ...article.value,
      title: getArticleTitleFromH1(),
      tag_ids: article.value?.tags.map((t: Tag) => t._id),
    },
  }

  saving.value = true

  try {
    await $fetch(url, options)
    snackbar.show = true
    snackbar.message = `Article saved`
    snackbar.class = ""
  } catch (error) {
    snackbar.show = true
    snackbar.message = `Failed to save article`
    snackbar.class = "error"
    console.error(error)
  } finally {
    saving.value = false
  }
}

const deleteArticle = async () => {
  if (!confirm(`Delete this article?`)) return

  const url = `articles/${route.params.id}`

  const options = {
    ...fetchOpts,
    method: "DELETE",
  }

  deleting.value = true

  try {
    await $fetch(url, options)
    router.push("/")
  } catch (error) {
    snackbar.show = true
    snackbar.message = `Failed to delete`
    snackbar.class = "error"
    console.error(error)
  } finally {
    deleting.value = false
  }
}

const keydownHandler = (e: KeyboardEvent) => {
  if (e.key === "s" && e.ctrlKey) {
    e.preventDefault()
    saveArticle()
  }
}

onMounted(() => {
  document.addEventListener("keydown", keydownHandler)
})

onBeforeUnmount(() => {
  document.removeEventListener("keydown", keydownHandler)
})
</script>

<style scoped>
.controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  border-bottom: 1px solid var(--border-color);
  padding-bottom: 0.5rem;
}
</style>
