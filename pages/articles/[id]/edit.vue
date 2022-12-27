<template>
    <template v-if="article">
        <NuxtLink :to="`/articles/${route.params.id}`">
            <Icon name="mdi:arrow-left"></Icon>
        </NuxtLink>
        <button @click="saveArticle()">
            <Icon name="mdi:content-save" />
        </button>
        <button @click="deleteArticle()">
            <Icon name="mdi:delete" />
        </button>

        <ArticleEditor v-model="article.content"/>

        <ArticleMetadataEditor v-model="article" />
    </template>
</template>

<script lang="ts" setup>
import type Article from '~~/types/Article'
import type Tag from '~~/types/Tag'

const route = useRoute()
const router = useRouter()
const runtimeConfig = useRuntimeConfig()
const saving = ref(false)
const deleting = ref(false)

const url = `articles/${route.params.id}`

const fetchOpts = { 
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie('jwt').value}` }
}
const { data: article, error } = await useFetch <Article>(url, fetchOpts)

const saveArticle = async () => {


    const options = {
        ...fetchOpts,
        method: 'PATCH',
        body: {
            ...article.value,
            tag_ids: article.value?.tags.map((t: Tag) => t._id)
        },
    }

    saving.value = true

    try {
        await $fetch(url, options)
        alert('Article saved')
    } catch (error) {
        // TODO: Nicer notification
        alert('Failed to update article')
        console.error(error)
    } finally {
        saving.value = false
    }

}

const deleteArticle = async () => {

    if(!confirm(`Delete this article?`)) return

    const options = {
        ...fetchOpts,
        method: 'DELETE',
    }

    deleting.value = true

    try {
        await $fetch(url, options)
        router.push('/')
    } catch (error) {
        // TODO: Nicer notification
        alert('Failed to delete article')
        console.error(error)
    } finally {
        deleting.value = false
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