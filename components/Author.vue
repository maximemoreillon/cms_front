<template>
    <span>{{ author.display_name }}</span>
</template>

<script lang="ts" setup>
import type Author from '~~/types/Author'
defineProps<{
    author: Author
}>()
</script>