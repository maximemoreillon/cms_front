<template>
  <div class="wrapper" v-if="tag">
    <Tag :tag="tag" :removable="true" :link="false" @remove="removeFilter()" />
    <TagEdit v-if="user?.isAdmin" v-model="tag" />
  </div>
</template>

<script setup lang="ts">
import type Tag from "~~/types/Tag"

const router = useRouter()
const route = useRoute()
const user = userUser()
const runtimeConfig = useRuntimeConfig()

const fetchFnc = () => (route.query.tag_id ? `/tags/${route.query.tag_id}` : "")
const options = { baseURL: runtimeConfig.public.apiBase }

const { data: tag, error } = await useFetch<Tag>(fetchFnc, options)

const removeFilter = () => {
  const { tag_id, ...query } = route.query
  router.push({ query })
}
</script>

<style scoped>
.wrapper {
  display: flex;
  align-self: center;
  gap: 0.5rem;
}
</style>
