<template>
    <h1>Authors</h1>

    <div class="tags">
        <Author v-for="author in authors" :key="author._id" :author="author" :link="true"/>
    </div>

</template>

<script lang="ts" setup>
import type Author from '~~/types/Author'

const runtimeConfig = useRuntimeConfig()

const url = `/authors`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: authors, error } = await useFetch<Author[]>(url, fetchOpts)

</script>

