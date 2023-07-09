<template>
  <button
    @click="emit('click')"
    class="button"
    :disabled="loading"
    :type="type"
  >
    <Loader v-if="loading" />
    <template v-else>
      <Icon :name="icon" />
      <span v-if="text">{{ text }}</span>
    </template>
  </button>
</template>

<script setup lang="ts">
const emit = defineEmits(["click"])

interface IProps {
  icon: string
  text?: string
  loading?: boolean
  type?: "button" | "submit" | "reset" | undefined
}

const props = withDefaults(defineProps<IProps>(), {
  loading: false,
  icon: "",
  text: "",
  type: undefined,
})
</script>
