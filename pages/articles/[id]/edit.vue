<template>
    <h1>Article editing</h1>
    <ArticleEditor v-model="article.content"/>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import ArticleEditor from '~~/components/articles/article/ArticleEditor.vue';

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const articleId = computed(() => route.params.id)

const url = `articles/${articleId.value}`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: article, error } = await useFetch(url, fetchOpts)

</script>