<template>
    <button
        v-for="{value, icon} in sortingOptions"
        :key="value"
        :class="{ active: route.query.sort === value }"
        @click="setQuery('sort', value)">
        <Icon :name="icon" />
    </button>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute()
const router = useRouter()

const setQuery = (key: string, value: string) => {
    // Do nothing if already the right query
    if (route.query[key] === value) return
    // Unpack query and add new param
    const query = { ...route.query, [key]: value }
    router.push({ query })
}

const sortingOptions = ref([
    { icon: 'mdi:calendar', value: 'date' },
    { icon: 'mdi:order-alphabetical-ascending', value: 'title'},
])

// TODO: Add sorting by views if user is logged in


</script>

<style>
.active {
    color: red;
}
</style>