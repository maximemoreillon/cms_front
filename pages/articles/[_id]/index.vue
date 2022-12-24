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

const articleId = computed(() => route.params._id)
// Typing is going to be a pain
const url = `https://api.articles.maximemoreillon.com/articles/${articleId.value}`
const { data: article, error } = await useFetch(url)

</script>