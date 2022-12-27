<template>
    <h1>Tags</h1>

    <!-- TODO: Show as a table -->

    <!-- TODO: Search -->

    <div class="tags">
        <Tag v-for="tag in tags" :key="tag._id" :tag="tag" :link="true" :removable="false"/>
    </div>

</template>

<script lang="ts" setup>
import type Tag from '~~/types/Tag'

const runtimeConfig = useRuntimeConfig()

const url = `/tags`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: tags, error } = await useFetch<Tag[]>(url, fetchOpts)

</script>

