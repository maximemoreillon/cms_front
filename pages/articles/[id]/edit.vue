<template>
    <template v-if="article">
        <button @click="saveArticle()">
            <Icon name="mdi:content-save" />
        </button>
        <button>
            <Icon name="mdi:delete" />
        </button>
        <ArticleEditor v-model="article.content"/>
    </template>
</template>

<script lang="ts" setup>
import type Article from '~~/types/Article'

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const saving = ref(false)
const url = `articles/${route.params.id}`

// TODO: Typing
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: article, error } = await useFetch <Article>(url, fetchOpts)

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

const keydownHandler = (e: KeyboardEvent) => {
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