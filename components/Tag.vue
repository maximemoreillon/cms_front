<template>
    <!-- WARNING: if tags are links, cannot be used in articlePreview-->
    <!-- TODO: use a NuxtLink instead -->
    <!-- TODO: check if no better query parameter available -->
    <component 
        v-if="tag"
        class="tag"
        :is="link ? 'a' : 'span'"
        :href="`/?tag_id=${tag._id}`">
        <span>{{ tag.name }}</span>
        <button 
            v-if="removable"
            class="close_button"
            @click="emit('remove')" >
            <Icon name="mdi:close" />
        </button>
    </component>
</template>

<script lang="ts" setup>

import type Tag from '~~/types/Tag'

const emit = defineEmits(['remove'])

defineProps<{
    tag: Tag | null,
    link: boolean,
    removable: boolean,
}>()
</script>

<style scoped>
.tag {
    text-decoration: none;
    color: initial;
    background-color: #dddddd;
    /* border: 1px solid #dddddd; */
    font-size: 80%;
    padding: 0.25em 0.75em;


    border-radius: 100vh;

    transition: 
        color 0.25s,
        border-color 0.25s,
        background-color 0.25s;

    display: inline-flex;
    align-items: center;
    gap: 0.25em;

}

a.tag:hover {
    /* color: var(--accent-color);
    border-color: var(--accent-color); */
    background-color: #c0000022;
}

.close_button {
    border: none;
    background-color: inherit;

    display: flex;
    align-items: center;

    cursor: pointer;
}

.close_button:hover {
    /* TODO: Find a color from the palette */
    color: var(--accent-color);
}
</style>