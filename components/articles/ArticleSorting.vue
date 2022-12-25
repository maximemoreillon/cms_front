<template>
    <NuxtLink
        v-for="{value, icon} in sortingOptions"
        :key="value"
        :class="{ active: route.query.sort === value }"
        :to="{ query: {...route.query, sort: value}}">
        <Icon :name="icon" />
    </NuxtLink>
</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

const sortingOptions = ref([
    { icon: 'mdi:calendar', value: 'date' },
    { icon: 'mdi:order-alphabetical-ascending', value: 'title'},
    // Todo: only if logged-in
    { icon: 'mdi:eye', value: 'views' },
])



</script>

<style>
.active {
    color: red;
}
</style>