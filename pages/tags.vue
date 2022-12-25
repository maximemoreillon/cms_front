<template>
    <h1>Tags</h1>

    <div class="tags">
        <Tag v-for="tag in tags" :key="tag._id" :tag="tag"/>
    </div>

</template>

<script lang="ts" setup>

import Tag from '~~/components/Tag.vue';
const runtimeConfig = useRuntimeConfig()

const url = `/tags`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: tags, error } = await useFetch(url, fetchOpts)

</script>