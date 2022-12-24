<template>
    <h1>Article editing</h1>
    <ClientOnly>
        <ArticleEditor />
    </ClientOnly>
</template>

<script lang="ts" setup>
import ArticleEditor from '~~/components/articles/article/ArticleEditor.vue';
</script>