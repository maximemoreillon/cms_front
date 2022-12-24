<template>
    <p v-if="error">{{ error }}</p>
    <template v-else>
        <NuxtLink :to="{ name: 'articles-_id-edit', params: { _id: articleId }}">Edit</NuxtLink>
        <!-- TODO: Typing  -->
        <article v-html="article.content" />
    </template>
    
</template>

<script lang="ts" setup>

import { computed } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const articleId = computed(() => route.params._id)

const url = `articles/${articleId.value}`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: article, error } = await useFetch(url, fetchOpts)

</script>