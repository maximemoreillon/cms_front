<template>
  <button
    v-if="editor"
    class="button"
    :class="{ active: editor.isActive('link'), open }"
    @click="open = !open"
  >
    <Icon name="mdi:link" />

    <!-- Wrapping in button so as to use position: absolute -->
    <form @submit.prevent="setLink()" v-if="open" class="link_menu" @click.stop>
      <input type="text" v-model="url" class="text_input" placeholder="URL" />

      <button type="submit" class="button">
        <Icon name="mdi:link-plus" />
      </button>

      <button type="reset" @click="unsetLink()" class="button">
        <Icon name="mdi:link-off" />
      </button>
    </form>
  </button>
</template>

<script lang="ts" setup>
const url = ref("")
const open = ref(false)
const props = defineProps({ editor: Object })
const currentLink = computed(() => props.editor?.getAttributes("link").href)

watch(currentLink, () => {
  url.value = currentLink.value
})

const setLink = () => {
  props.editor
    ?.chain()
    .focus()
    .extendMarkRange("link")
    .setLink({ href: url.value })
    .run()

  open.value = false
}

const unsetLink = () => {
  props.editor?.chain().focus().extendMarkRange("link").unsetLink().run()

  open.value = false
}
</script>

<style scoped>
button {
  position: relative;
}

.link_menu {
  position: absolute;
  z-index: 5;
  bottom: 150%;
  right: 0;

  display: flex;
  flex-wrap: nowrap;

  background-color: white;
  padding: 0.25rem;

  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}

form button {
  color: var(--text-color);
}

input {
  width: 20rem;
}
</style>
