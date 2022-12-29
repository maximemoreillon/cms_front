<template>
  <!-- Wrapping because using flex column -->
  <!-- TODO: Consider without -->
  <div class="page">
    <h1>Articles</h1>

    <ArticlesTagFilter v-if="route.query.tag_id" />
    <ArticlesAuthorFilter v-if="route.query.author" />

    <ArticlesSearch />

    <div class="sorting_ordering">
      <ArticlesSorting />
      <div class="spacer" />
      <ArticlesOrdering />
    </div>

    <template v-if="data">
      <div class="articles">
        <ArticlePreview
          v-for="article in data.articles"
          :key="article._id"
          :article="article"
        />
      </div>

      <ArticlesPagination :articleCount="data.article_count" />

      <button class="fab" @click="newArticleOpen = true" v-if="user">
        <Icon name="mdi:file-document-plus" />
      </button>
    </template>

    <NewArticle v-model="newArticleOpen" />

    <!-- TODO: Deal with data fetching errors -->
  </div>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"

const user = userUser()

definePageMeta({
  middleware: ["auth"],
})

type FetchBody = {
  article_count: number
  articles: Article[]
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const query = computed(() => route.query)
const newArticleOpen = ref(false)

watch(query, () => {
  refresh()
})

const fetchFnc = () => {
  // TODO: Fix this typing error
  const searchParams = new URLSearchParams(query.value).toString()
  return `/articles?${searchParams}`
}
const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}
const { data, error, refresh } = await useFetch<FetchBody>(fetchFnc, fetchOpts)
// TODO: error handling
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.articles {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.sorting_ordering {
  display: flex;
  gap: 0.5rem;
}
</style>
