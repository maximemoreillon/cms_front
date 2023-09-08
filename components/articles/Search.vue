<template>
  <form class="search_wrapper" @submit.prevent="setQuery()">
    <input
      v-model="searchString"
      type="search"
      class="search_bar text_input"
      placeholder="Search articles"
    />
    <button type="submit" class="button">
      <Icon name="material-symbols:search" />
    </button>
  </form>
</template>

<script lang="ts" setup>
const route = useRoute()
const router = useRouter()

const searchString = ref("")

const setQuery = () => {
  const query: any = {
    ...route.query,
    search: searchString.value,
  }
  if (route.query.search === query.search) return
  if (!searchString.value) delete query.search
  router.push({ query })
}

onMounted(() => {
  searchString.value = route.query.search as string
})

watch(
  () => route.query.search,
  (val) => {
    if (!val) searchString.value = val as string
  }
)
</script>

<style scoped>
.search_wrapper {
  display: flex;
  gap: 0.25em;
  align-items: center;
}

input {
  flex-grow: 1;
}
</style>
