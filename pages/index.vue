<template>
  <h1>Articles</h1>

  <section v-if="route.query.tag_id">
    <ArticlesTagFilter />
  </section>
  <section v-if="route.query.author">
    <ArticlesAuthorFilter />
  </section>

  <section>
    <ArticlesSearch />
  </section>

  <section class="sorting_ordering">
    <ArticlesSorting />
    <div class="spacer" />
    <ArticlesOrdering />
  </section>

  <template v-if="data">
    <section class="articles">
      <ArticlePreview
        v-for="article in data.articles"
        :key="article._id"
        :article="article"
      />
    </section>

    <section>
      <ArticlesPagination :articleCount="data.article_count" />
    </section>

    <button class="fab" @click="newArticleOpen = true" v-if="user">
      <Icon name="mdi:file-document-plus" />
    </button>
  </template>

  <NewArticle v-model="newArticleOpen" />

  <!-- TODO: Deal with data fetching errors -->
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"

const user = useUser()

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
