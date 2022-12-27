<template>
    <!-- WARNING: if tags are links, cannot be used in articlePreview-->
    <!-- TODO: use a NuxtLink instead -->
    <!-- TODO: check if no better query parameter available -->
    <component 
        class="tag"
        :is="link ? 'a' : 'span'"
        :href="`/?tag_id=${tag._id}`">
        <span>{{ tag.name }}</span>
        <!-- TODO: Close button -->
        <button @click="emit('remove')" v-if="removable">
            <Icon name="mdi:close" />
        </button>
    </component>
</template>

<script lang="ts" setup>

import type Tag from '~~/types/Tag'

const emit = defineEmits(['remove'])

defineProps<{
    tag: Tag,
    link: boolean,
    removable: boolean,
}>()
</script>

<style>

</style>