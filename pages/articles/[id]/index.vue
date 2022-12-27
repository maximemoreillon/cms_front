<template>
    <template v-if="article">
        <h1>{{ article.title }}</h1>
        
        <ArticleMetadata :article="article" />
        
        <!-- PROBLEM: Error when navigating to /: Missing required param "id"-->
        <!-- <NuxtLink :to="{ name: 'articles-id-edit', params: { id: route.params.id }}"> -->
        <NuxtLink :to="`/articles/${route.params.id}/edit`" v-if="userIsAuthor">
            <Icon name="mdi:pencil" />
        </NuxtLink>
        
        <article v-html="article?.content" ref="articleContent"/>
    </template>

    <!-- TODO: Error display -->

    <!-- Image Modal -->
    <Modal v-model="modalOpen">
        <img :src="modalImageSrc" alt="" class="modalImage">
    </Modal>
</template>

<script lang="ts" setup>

import Article from '~~/types/Article';

definePageMeta({
    middleware: ["auth"]
})

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const user = userUser()

const userIsAuthor = computed(() => article.value?.author._id === user.value?._id)
const modalOpen = ref(false)
const modalImageSrc = ref('')
const articleContent = ref<HTMLElement>()

const url = `/articles/${route.params.id}`
const fetchOpts = { 
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie('jwt').value}` }
}

// TODO: Error handling
const { data: article, error } = await useFetch<Article>(url, fetchOpts)



onMounted(() => {
    addEventListenerForImageModals()
})

const addEventListenerForImageModals = () => {
    
    articleContent.value?.querySelectorAll('img')
        .forEach( (img:any) => {
            img.addEventListener("click", (event: any) => {
                modalOpen.value = true
                modalImageSrc.value = event.target.src
            }, false)
        })

    
}

useHead({
    title: article.value?.title,
    meta: [
        { name: 'description', content: article.value?.summary },

        // Twitter
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@m_moreillon' },
        { name: 'twitter:title', content: article.value?.title },
        { name: 'twitter:description', content: article.value?.summary },
        { name: 'twitter:image', content: article.value?.thumbnail_src },
        { name: 'twitter:image:alt', content: `${article.value?.title} thumbnail` },

        // OpenGraph
        { name: 'og:title', content: article.value?.title },
        { name: 'og:description', content: article.value?.summary },
        { name: 'og:image', content: article.value?.thumbnail_src },
        { name: 'og:url', content: `${article.value?.title} thumbnail` },
        { name: 'og:type', content: 'article' },
        { name: 'og:locale', content: 'en_US' },
        
    ],
})


</script>

<style>
article h1 {
    display: none;
}
article img {
    max-width: 80%;
}
.modalImage {
    max-width: 100%;
}
</style>