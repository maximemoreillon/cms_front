<template>
  <Transition>
    <dialog ref="dialog" @click="open = false">
      <div class="modal-content" @click.stop>
        <button @click="open = false" class="modal_close_button button">
          <Icon name="mdi:close" />
        </button>
        <slot />
      </div>
    </dialog>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits(["update:modelValue"])
const dialog = ref()

const open = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emits("update:modelValue", newVal)
  },
})

watch(open, () => {
  if (open.value) dialog.value.showModal()
  else dialog.value.close()
})
</script>

<style scoped>
.modal_close_button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 150%;
}

dialog::backdrop {
  background-color: #00000099;
}

dialog {
  color: var(--text-color);
  background-color: var(--background-color);
  padding: 0;
  border: none;
  border-radius: var(--border-radius);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
}

.modal-content {
  width: 100%;
  height: 100%;
}
</style>
