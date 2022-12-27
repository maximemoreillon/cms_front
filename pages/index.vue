<template>
    <h2>Articles</h2>

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
    const searchParams = new URLSearchParams(query.value).toString()
    return `/articles?${searchParams}`
}
const fetchOpts = { 
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie('jwt').value}` }
}
const { data, error, refresh } = await useFetch<FetchBody>(fetchFnc, fetchOpts)

</script>

<style>


</style>