<template>
    <NuxtLink :to="{ name: 'articles-_id', params: { _id: article._id }}" class="articlePreview">
        <h3>{{ article.title }}</h3>
        <p v-html="article.summary" />
    </NuxtLink>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

defineProps({
    article: Object,
})


</script>

<style>
.articlePreview {
    display: grid;
}
</style>