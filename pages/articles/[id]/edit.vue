<template>
  <div class="edit" v-if="article">
    <!-- TODO: Fix margin with page top -->
    <div class="controls">
      <button @click="deleteArticle()" class="button">
        <Icon name="mdi:delete" />
        <span>Delete article</span>
      </button>
      <button @click="saveArticle()" class="button">
        <Icon name="mdi:content-save" />
        <span>Save</span>
      </button>
    </div>

    <ArticleEditor v-model="article.content" />

    <ArticleMetadataEditor v-model="article" />
  </div>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"
import type Tag from "~~/types/Tag"

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const saving = ref(false)
const deleting = ref(false)

const url = `articles/${route.params.id}`

const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}
const { data: article, error } = await useFetch<Article>(url, fetchOpts)

const saveArticle = async () => {
  const options = {
    ...fetchOpts,
    method: "PATCH",
    body: {
      ...article.value,
      tag_ids: article.value?.tags.map((t: Tag) => t._id),
    },
  }

  saving.value = true

  try {
    await $fetch(url, options)
    alert("Article saved")
  } catch (error) {
    // TODO: Nicer notification
    alert("Failed to update article")
    console.error(error)
  } finally {
    saving.value = false
  }
}

const deleteArticle = async () => {
  if (!confirm(`Delete this article?`)) return

  const options = {
    ...fetchOpts,
    method: "DELETE",
  }

  deleting.value = true

  try {
    await $fetch(url, options)
    router.push("/")
  } catch (error) {
    // TODO: Nicer notification
    alert("Failed to delete article")
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

onBeforeMount(() => {
  document.removeEventListener("keydown", keydownHandler)
})
</script>

<style scoped>
.edit {
  display: grid;
  grid-template-areas:
    "controls controls"
    "content content"
    "tags tags"
    "summary summary"
    "thumbnail visibility";
  gap: 1rem;
}

.edit .controller {
  grid-area: controller;
  justify-self: end;
}

.edit:deep() .editor {
  grid-area: content;
}

.edit:deep() .summary {
  grid-area: summary;
}

.edit:deep() .visibility {
  grid-area: visibility;
}

.edit:deep() .tags {
  grid-area: tags;
}

.edit:deep() .thumbnail {
  grid-area: thumbnail;
}

.controls {
  grid-area: controls;
  display: flex;
  justify-content: flex-end;
  gap: 0.5rem;
}
</style>
