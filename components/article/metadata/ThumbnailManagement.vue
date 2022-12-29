<template>
  <div class="wrapper" @click="open = true">
    <img v-if="src" class="thumbnail" :src="src" />
    <Icon v-else name="mdi:image-off" class="thumbnail" />
    <Icon name="mdi:pencil" class="edit_badge" />

    <Modal v-model="open" @click.stop class="modal">
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
  width: 10rem;
  height: 10rem;
  object-fit: contain;
}

.wrapper .edit_badge {
  position: absolute;
  top: 0.5rem;
  right: 0.5rem;
  opacity: 0;
  transition: opacity 0.25s;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  padding: 0.5rem;
  background-color: var(--accent-color);
  color: white;
  border-radius: 100%;
}

.wrapper:hover .edit_badge {
  opacity: 1;
}

.modal {
  cursor: initial;
}
</style>
