<template>
    <!-- TODO: Save button -->
    <button @click="saveArticle()">
        <Icon name="mdi:content-save" />
    </button>
    <button>
        <Icon name="mdi:delete" />
    </button>
    <ArticleEditor v-model="article.content"/>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';

import ArticleEditor from '~~/components/articles/article/edit/ArticleEditor.vue';

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const articleId = computed(() => route.params.id)

// TODO: Typing
const url = `articles/${articleId.value}`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: article, error } = await useFetch(url, fetchOpts)

const saveArticle = async () => {
    alert('Not implemented')
}

// TODO: Save on ctrl-s

</script>