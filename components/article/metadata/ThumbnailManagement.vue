<template>
  <div class="wrapper" @click="open = true">
    <img v-if="src" class="thumbnail" :src="src" />
    <Icon v-else name="mdi:image-off" class="thumbnail" />
    <Icon name="mdi:pencil" class="edit_badge" />

    <Modal v-model="open" @click.stop>
      <ImageInsert @insert="src = $event" />
    </Modal>
  </div>
</template>

<script setup lang="ts">
// TODO: Typing
const props = defineProps<{ modelValue: any }>()

const emit = defineEmits(["update:modelValue"])

const src = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})

const open = ref(false)
</script>

<style scoped>
.wrapper {
  display: flex;
  position: relative;
  cursor: pointer;
}
.thumbnail {
  width: 5rem;
  height: 5rem;
  object-fit: contain;
}

.wrapper .edit_badge {
  position: absolute;
  top: 0;
  right: 0;
  opacity: 0;
  transition: opacity 0.25s;
}

.wrapper:hover .edit_badge {
  opacity: 1;
}
</style>
