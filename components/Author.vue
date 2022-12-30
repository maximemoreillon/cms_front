<template>
  <!-- TODO: use a NuxtLink instead -->
  <component
    v-if="author"
    class="author"
    :is="link ? 'a' : 'span'"
    :href="`/?author=${author._id}`"
  >
    {{ author.display_name }}
  </component>
</template>

<script lang="ts" setup>
import type Author from "~~/types/Author"
defineProps<{
  author: Author | null
  link: boolean
}>()
</script>

<style scoped>
.author {
  white-space: nowrap;
}
</style>
