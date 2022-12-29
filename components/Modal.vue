<template>
  <Transition>
    <div class="modal_background" v-if="open" @click.self="open = false">
      <!-- TODO: consider having an innder div for fancier animation -->
      <div class="modal_container">
        <button @click="open = false" class="modal_close_button button">
          <Icon name="mdi:close" />
        </button>
        <slot />
      </div>
    </div>
  </Transition>
</template>

<script lang="ts" setup>
const props = defineProps<{
  modelValue: boolean
}>()

const emits = defineEmits(["update:modelValue"])

const open = computed({
  get() {
    return props.modelValue
  },
  set(newVal) {
    emits("update:modelValue", newVal)
  },
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

.modal_background {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 100;

  background-color: #00000022;

  display: flex;
  align-items: center;
  justify-content: center;
}

.modal_container {
  max-width: 95vw;
  position: relative;

  background-color: white;
  border-radius: var(--border-radius);
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);

  /* padding: 1rem; */
}

.modal_close_button {
  position: absolute;
  top: 0.5em;
  right: 0.5em;
  font-size: 150%;
}
</style>
