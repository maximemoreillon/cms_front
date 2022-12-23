<template>
    <NuxtLink :to="{ name: 'articles-_id', params: { _id: article._id }}">
        {{ article.title }}
    </NuxtLink>
</template>

<script lang="ts" setup>

import { ref } from 'vue';

defineProps({
    article: Object,
})


</script>