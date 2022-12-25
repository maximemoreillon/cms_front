<template>
    <div class="pagination">
        <!-- TODO: Do not show all pages -->
        <!-- IDEA: Could just use previous and next buttons -->
        <NuxtLink :to="{ query: pageQuery(currentPage - 1)}">
            <Icon name="mdi:arrow-left"/>
        </NuxtLink>

        <span>{{ currentPage }} / {{ pageCount }}</span>

        <NuxtLink :to="{ query: pageQuery(currentPage + 1)}">
            <Icon name="mdi:arrow-right" />
        </NuxtLink>

        <!-- <NuxtLink 
            :class="{ current: currentPage === page }"
            v-for="page in pageCount" 
            :key="page" 
            :to="{ query: pageQuery(page)}">
            {{ page }}
        </NuxtLink> -->
    </div>
</template>

<script lang="ts" setup>

const route = useRoute()
const props = defineProps({
    articleCount: {type: Number, default: 0},
})

// query parameters to use: batch_size, start_index
// default page size: 10

const pageSize = 10

const pageCount = computed(() => Math.ceil(props.articleCount / pageSize))

const currentPage = computed(() => {
    const start_index = Number(route.query.start_index || 0)
    return 1 + start_index / pageSize
})

const pageQuery = (page: number) => {
    return { ...route.query, start_index: (page - 1) * pageSize }
}

</script>

<style>

.pagination {
    display: flex;
    gap: 0.5em;
}

.current {
    color: red;
}


</style>