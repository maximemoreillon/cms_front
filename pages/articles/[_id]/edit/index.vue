<template>
    <h1>Article editing</h1>
    <ArticleEditor v-model="content"/>
    <input type="text" v-model="content">
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import ArticleEditor from '~~/components/articles/article/ArticleEditor.vue';

const content = ref('Banana')

</script>