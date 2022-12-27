<template>
    <h2>Articles</h2>

    <ArticlesTagFilter v-if="route.query.tag_id"/>
    <ArticlesAuthorFilter v-if="route.query.author" />
    <ArticlesSearch />
    <ArticlesSorting />

    <NuxtLink to="/articles/new" v-if="user">
        <Icon name="mdi:add" />
        <span>New article</span>
    </NuxtLink>

    <template v-if="data">
        
        <div class="articles_container">
            <ArticlePreview v-for="article in data.articles" :key="article._id" :article="article" />
        </div>
        
        <ArticlesPagination :articleCount="data.article_count" />
    </template>

    <!-- TODO: Deal with data fetching errors -->

    
</template>

<script lang="ts" setup>

import type Article from '~~/types/Article'

const user = userUser()

definePageMeta({
  middleware: ["auth"]
})

type FetchBody = {
    article_count: number,
    articles: Article[]
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const query = computed(() => route.query)

watch(query, () => { refresh() })

const fetchFnc = () => {
    // TODO: Fix this typing error
    const searchParams = new URLSearchParams(query.value).toString()
    return `/articles?${searchParams}`
}
const fetchOpts = { 
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie('jwt').value}` }
}
const { data, error, refresh } = await useFetch<FetchBody>(fetchFnc, fetchOpts)
// TODO: error handling

</script>

<style>
.articles_container {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>