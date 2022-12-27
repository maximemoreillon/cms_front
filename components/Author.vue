<template>
    <component 
        class="author" 
        :is="link ? 'a' : 'span'" :href="`/?author=${author._id}`">
        {{ author.display_name }}
    </component>
</template>

<script lang="ts" setup>
import type Author from '~~/types/Author'
defineProps<{
    author: Author
    link: boolean
}>()
</script>