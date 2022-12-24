<template>
    <h2>Articles</h2>

    <ArticleSearch />

    <ArticleSorting />

    <p>
        <Icon name="mdi:file-document-outline" />{{ data.article_count }}
    </p>

    <div class="articles_container">
        <ArticlePreviewVue v-for="article in data.articles" :key="article._id" :article="article" />
    </div>

    <ArticlesPagination :articleCount="data.article_count" />
</template>

<script lang="ts" setup>

import ArticlePreviewVue from '~~/components/articles/ArticlePreview.vue';
import ArticleSearch from '~~/components/articles/ArticleSearch.vue';
import ArticleSorting from '~~/components/articles/ArticleSorting.vue';
import ArticlesPagination from '~~/components/articles/ArticlesPagination.vue';
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
}
</style>