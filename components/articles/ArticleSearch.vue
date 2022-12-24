<template>
<form class="search_wrapper" @submit.prevent="search()">
    <input 
        ref="search" 
        v-model="searchString" 
        type="search" 
        class="search_bar" 
        placeholder="Search articles">
    <button type="submit">
        Search
    </button>
</form>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute, useRouter} from 'vue-router';
const route = useRoute()
const router = useRouter()

const searchString = ref('')

const search = () => {
    const query = { ...route.query, search: searchString.value }
    if (route.query.search === query.search) return
    if (searchString.value === '') delete query.search
    router.push({ query })
}

</script>