<template>
  <Transition>
    <div class="snackbar" v-if="open">
      <span>
        <slot />
      </span>
      <button class="button" @click="open = false">
        <Icon name="mdi:close" />
      </button>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<{ modelValue: boolean }>()
const emit = defineEmits(["update:modelValue"])
const open = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})
watch(open, () => {
  if (open.value) setTimeout(() => (open.value = false), 3000)
})
</script>

<style scoped>
.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

/* TODO: color custimizable */
.snackbar {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background-color: #444444;
  border-radius: var(--border-radius);
  color: white;
  position: fixed;
  padding: 0.5rem 1rem;
  bottom: 2rem;
  left: 50%;
  transform: translateX(-50%);
}

.snackbar.error {
  background-color: var(--error-color);
}
</style>
