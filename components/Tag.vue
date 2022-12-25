<template>
    <!-- WARNING: if tags are links, cannot be used in articlePreview-->
    <span>
        {{ tag.name }}
    </span>
</template>

<script lang="ts" setup>
import type Tag from '~~/types/Tag'
defineProps<{
    tag: Tag
}>()
</script>