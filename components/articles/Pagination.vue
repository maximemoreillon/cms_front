<template>
  <div class="pagination">
    <!-- TODO: Buttons for first and last -->

    <NuxtLink :to="{ query: { start_index: 0 } }" class="button">
      <Icon name="mdi:page-first" />
    </NuxtLink>

    <NuxtLink :to="{ query: pageQuery(currentPage - 1) }" class="button">
      <Icon name="mdi:chevron-left" />
    </NuxtLink>

    <span
      >{{ startIndex }} - {{ startIndex + pageSize }} / {{ articleCount }}</span
    >

    <NuxtLink :to="{ query: pageQuery(currentPage + 1) }" class="button">
      <Icon name="mdi:chevron-right" />
    </NuxtLink>

    <NuxtLink
      :to="{ query: { start_index: articleCount - pageSize } }"
      class="button"
    >
      <Icon name="mdi:page-last" />
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
const props = defineProps({
  articleCount: { type: Number, default: 0 },
})

// query parameters to use: batch_size, start_index
// default page size in back-end: 10

const pageSize = ref(10)

const pageCount = computed(() => Math.ceil(props.articleCount / pageSize.value))
const startIndex = computed(() => Number(route.query.start_index || 0))
const currentPage = computed(() => 1 + startIndex.value / pageSize.value)

const pageQuery = (page: number) => {
  return { ...route.query, start_index: (page - 1) * pageSize.value }
}
</script>

<style>
.pagination {
  display: flex;
  justify-content: center;
  gap: 0.5em;
}
</style>
