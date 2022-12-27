<template>
    <Tag :tag="tag" :removable="true" :link="false"
        @remove="removeFilter()" />
</template>

<script setup lang="ts">

import type Tag from '~~/types/Tag'

const router = useRouter()
const route = useRoute()
const runtimeConfig = useRuntimeConfig()

const url = `/tags/${route.query.tag_id}`

const options = { baseURL: runtimeConfig.public.apiBase }

const { data: tag } = await useFetch<Tag>(url, options)

const removeFilter = () => {
    const { tag_id, ...query} = route.query
    router.push({ query })
}

</script>