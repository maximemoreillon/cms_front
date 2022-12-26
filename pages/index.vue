<template>
    <h2>Articles</h2>

    <ArticlesSearch />

    <ArticlesSorting />

    <template v-if="data">
        <p>
            <Icon name="mdi:file-document-outline" />{{ data.article_count }}
        </p>
        
        <div class="articles_container">
            <ArticlePreview v-for="article in data.articles" :key="article._id" :article="article" />
        </div>
        
        <ArticlesPagination :articleCount="data.article_count" />
    </template>

    
</template>

<script lang="ts" setup>
import type Article from '~~/types/Article'

definePageMeta({
  middleware: ["auth"]
})


type FetchBody = {
    article_count: number,
    articles: Article[]
}

const runtimeConfig = useRuntimeConfig()
const route = useRoute()

// TODO: find type
const query = computed<any>(() => route.query)

watch(query, () => { refresh() })

// TODO: types
const fetchFnc = () => {
    const search = new URLSearchParams(query.value).toString()
    return `/articles?${search}`
}
const fetchOpts = { 
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie('jwt').value}` }
}
const { data, error, refresh } = await useFetch<FetchBody>(fetchFnc, fetchOpts)

</script>

<style>


</style>