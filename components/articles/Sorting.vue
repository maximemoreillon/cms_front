<template>

    <NuxtLink
        v-for="{value, icon, isDefault } in sortingOptions"
        :key="value"
        :class="{ active: route.query.sort === value || isDefault && !route.query.sort}"
        :to="{ query: { ...route.query, sort: value } }">
        <Icon :name="icon" />
    </NuxtLink>

    <NuxtLink 
        v-for="{ value, icon, isDefault } in orderingOptions" 
        :key="value" 
        :class="{ active: route.query.order === value || isDefault && !route.query.order }"
        :to="{ query: { ...route.query, order: value } }">
        <Icon :name="icon" />
    </NuxtLink>

</template>

<script lang="ts" setup>

import { ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

// TODO: defaults
const sortingOptions = ref([
    { icon: 'mdi:calendar', value: 'date', isDefault: true},
    { icon: 'mdi:order-alphabetical-ascending', value: 'title'},
    // TODO: only if logged-in
    { icon: 'mdi:eye', value: 'views' },
])

const orderingOptions = ref([
    { icon: 'mdi:sort-descending', value: 'DESC', isDefault: true },
    { icon: 'mdi:sort-ascending', value: 'ASC'},
])



</script>

<style>
.active {
    color: red;
}
</style>