<template>
    <!-- WARNING: if tags are links, cannot be used in articlePreview-->
    <!-- TODO: use a NuxtLink instead -->
    <!-- TODO: check if no better query parameter available -->
    <component 
        class="tag"
        :is="link ? 'a' : 'span'"
        :href="`/?tag_id=${tag._id}`">
        {{ tag.name }}
    </component>
</template>

<script lang="ts" setup>
import type Tag from '~~/types/Tag'
defineProps<{
    tag: Tag,
    link: boolean
}>()
</script>

<style>
.tag {
    border: 1px solid #dddddd;
    padding: 0.25em 0.5em;
}
</style>