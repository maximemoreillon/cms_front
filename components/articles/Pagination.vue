<template>
    <div class="pagination">

        <!-- TODO: Buttons for first and last -->
        
        <NuxtLink :to="{ query: pageQuery(currentPage - 1)}">
            <Icon name="mdi:arrow-left"/>
        </NuxtLink>

        <span>{{ startIndex }} - {{ startIndex + pageSize }} / {{ articleCount }}</span>

        <NuxtLink :to="{ query: pageQuery(currentPage + 1)}">
            <Icon name="mdi:arrow-right" />
        </NuxtLink>

    </div>
</template>

<script lang="ts" setup>

const route = useRoute()
const props = defineProps({
    articleCount: {type: Number, default: 0},
})

// query parameters to use: batch_size, start_index
// default page size in back-end: 10

const pageSize = 10

const pageCount = computed(() => Math.ceil(props.articleCount / pageSize))
const startIndex = computed(() => Number(route.query.start_index || 0) )
const currentPage = computed(() => 1 + startIndex.value / pageSize )

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