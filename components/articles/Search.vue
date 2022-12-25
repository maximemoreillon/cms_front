<template>
    <form class="search_wrapper" @submit.prevent="setQuery()">
        <input 
            v-model="searchString" 
            type="search" 
            class="search_bar" 
            placeholder="Search articles">
        <button type="submit">
            <Icon name="material-symbols:search" />
        </button>
    </form>
</template>

<script lang="ts" setup>

import { ref, onMounted} from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

// TODO: find right typing
const searchString = ref<any>('')

const setQuery = () => {
    const query = { 
        // ...route.query, 
        search: searchString.value
    }
    if (route.query.search === query.search) return
    if (!searchString.value) delete query.search
    router.push({ query })
}

onMounted(() => { searchString.value = route.query.search })

</script>