<template>
    <NuxtLink :to="{ name: 'articles-_id', params: { _id: articleId }}">
    {{ articleId }}
    </NuxtLink>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
const articleId = ref('adb7dbb3-cc17-4dd2-b8c0-1fe5f46e62de')

</script>