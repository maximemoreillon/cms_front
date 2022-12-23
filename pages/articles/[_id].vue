<template>
    <p v-if="error">{{ error }}</p>
    <article v-else v-html="article.content" />
</template>

<script lang="ts" setup>

// Typing is going to be a pain
const url = `https://api.articles.maximemoreillon.com/articles/adb7dbb3-cc17-4dd2-b8c0-1fe5f46e62de`
const { data: article, error } = await useFetch(url)

</script>