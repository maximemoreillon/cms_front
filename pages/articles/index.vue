<template>
    <h2>Articles</h2>

    <ArticleSearch />

    <div class="articles_container">
        <ArticlePreviewVue 
            v-for="article in articles" 
            :key="article._id" 
            :article="article"/>
    </div>



</template>

<script lang="ts" setup>

import ArticlePreviewVue from '~~/components/articles/ArticlePreview.vue';
import ArticleSearch from '~~/components/articles/ArticleSearch.vue';

// TODO: environment variables
const url = 'https://api.articles.maximemoreillon.com/articles'

// TODO: types
const {data, error} = await useFetch<any>(url)
const articles = ref([])
if (data.value) articles.value = data.value.articles

</script>

<style>
.articles_container {
    display: flex;
    flex-direction: column;
}
</style>