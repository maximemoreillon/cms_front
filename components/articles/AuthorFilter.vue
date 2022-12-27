<template>
    <Author :author="author" :link="false"/>
    <button @click="removeFilter()">
        <Icon name="mdi:close" />
    </button>
</template>

<script setup lang="ts">

import type Author from '~~/types/Author'

const router = useRouter()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const url = `/authors/${route.query.author}`

const options = { baseURL: runtimeConfig.public.apiBase }

const { data: author } = await useFetch<Author>(url, options)

const removeFilter = () => {
    const { author, ...query } = route.query
    router.push({ query })
}

</script>