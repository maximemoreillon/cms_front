<template>

    <textarea class="summary" v-model="article.summary" />

    <!-- TODO: Thumbnail -->

    <!-- Visibility -->
    <div>
        <input id="private" v-model="article.published" type="radio" :value="false">
        <label for="private">
            <Icon name="mdi:lock" />
            <span>Private</span>
        </label>
    </div>
    <div>
        <input id="public" v-model="article.published" type="radio" :value="true">
        <label for="public">
            <Icon name="mdi:earth" />
            <span>Public</span>
        </label>
    </div>

    <TagList 
        v-model="article.tags" 
        :link="false" 
        :input="true" 
        :truncate="null" 
        :removable="true"/>

</template>

<script lang="ts" setup>
import type Article from '~~/types/Article'

const props = defineProps<{ modelValue: Article }>()

const emit = defineEmits(['update:modelValue'])

const article = computed({
    get: () => props.modelValue,
    set: newVal => emit('update:modelValue', newVal)
})



</script>

<style>
.summary {
    width: 100%;
}
</style>