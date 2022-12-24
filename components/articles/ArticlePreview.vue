<template>
    <NuxtLink :to="{ name: 'articles-id', params: { id: article._id }}" class="articlePreview">
        <h3>{{ article.title }}</h3>
        <div>{{ formatNeo4jDate(article.authorship.creation_date) }}</div>
        <div>{{ formatNeo4jDate(article.authorship.edition_date) }}</div>

        <!-- PROBLEM: if summary contains links, causes hydration problems -->
        <!-- <p v-html="article.summary" /> -->
        <div>{{ article.summary }}</div>
    </NuxtLink>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { formatNeo4jDate } from '~~/utils'

defineProps({
    article: Object,
})




</script>

<style>
.articlePreview {
    display: grid;
}
</style>