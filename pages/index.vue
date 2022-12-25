<template>
    <h2>Articles</h2>

    <ArticlesSearch />

    <ArticlesSorting />

    <p>
        <Icon name="mdi:file-document-outline" />{{ data.article_count }}
    </p>

    <div class="articles_container">
        <ArticlePreview v-for="article in data.articles" :key="article._id" :article="article" />
    </div>

    <ArticlesPagination :articleCount="data.article_count" />
</template>

<script lang="ts" setup>

import { useRoute } from 'vue-router';
import { computed, watch } from 'vue';

const runtimeConfig = useRuntimeConfig()
const route = useRoute()
const query = computed<any>(() => route.query)

watch(query, () => { refresh() })

// TODO: types
const fetchFnc = () => {
    const search = new URLSearchParams(query.value).toString()
    return `/articles?${search}`
}
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data, error, refresh } = await useFetch<any>(fetchFnc, fetchOpts)

</script>

<style>
.articles_container {
    display: flex;
    flex-direction: column;
    gap: 1em;
}

</style>