<template>
    <!-- TODO: Save button -->
    <button @click="saveArticle()">
        <Icon name="mdi:content-save" />
    </button>
    <button>
        <Icon name="mdi:delete" />
    </button>
    <ArticleEditor v-model="article.content"/>
</template>

<script lang="ts" setup>

import { ref, onMounted, onBeforeMount } from 'vue';
import { useRoute } from 'vue-router';


const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const saving = ref(false)
const url = `articles/${route.params.id}`

// TODO: Typing
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: article, error } = await useFetch(url, fetchOpts)

const saveArticle = async () => {

    const options = {
        method: 'PATCH',
        body: article.value,
        baseURL: runtimeConfig.public.apiBase
    }

    saving.value = true

    try {
        await $fetch(url, options);
    } catch (error) {
        console.error(error)
    } finally {
        saving.value = false
    }

}

const keydownHandler = (e) => {
    if (e.key === 's' && e.ctrlKey) {
        e.preventDefault()
        saveArticle()
    }
}

onMounted(() => {
    document.addEventListener("keydown", keydownHandler)
})

onBeforeMount(() => {
    document.removeEventListener("keydown", keydownHandler)
})

</script>