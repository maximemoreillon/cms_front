<template>
    <h2>{{ article.title }}</h2>
    
    <!-- TODO: metadata -->
    <ArticleMetadata :article="article" />

    <!-- PROBLEM: Error when navigating to /: Missing required param "id"-->
    <NuxtLink :to="{ name: 'articles-id-edit', params: { id: route.params.id }}">
        <Icon name="mdi:pencil"/>
    </NuxtLink>

    <!-- TODO: Typing  -->
    <article v-html="article.content" />
    
</template>

<script lang="ts" setup>

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

// TODO: Typing
const url = `/articles/${route.params.id}`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: article, error } = await useFetch(url, fetchOpts)

const imageAlt = `${article.title} thumbnail`
useHead({
    title: article.value.title,
    meta: [
        { name: 'description', content: article.value.summary },

        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@m_moreillon' },
        { name: 'twitter:title', content: article.value.title },
        { name: 'twitter:description', content: article.value.summary },
        { name: 'twitter:image', content: article.value.thumbnail_src },
        { name: 'twitter:image:alt', content: imageAlt },

        // OpenGraph
        { name: 'og:title', content: article.value.title },
        { name: 'og:description', content: article.value.summary },
        { name: 'og:image', content: article.value.thumbnail_src },
        { name: 'og:url', content: imageAlt },
        { name: 'og:type', content: 'article' },
        { name: 'og:locale', content: 'en_US' },
        
    ],
})


</script>