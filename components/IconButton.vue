<template>
  <button @click="emit('click')" class="button" :disabled="loading">
    <Loader v-if="loading" />
    <Icon v-else :name="icon" />
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"])
const props = defineProps({
  loading: { type: Boolean, default: false },
  icon: { type: String },
})
</script>
