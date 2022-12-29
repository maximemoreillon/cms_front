<template>
  <button class="menu_wrapper" @click="open = !open">
    <Icon name="mdi:image-plus" />

    <!-- TODO: Consider using a modal instead -->
    <div v-if="open" class="menu_content" @click.stop>
      <ImageInsert @insert="insertImage($event)" />
    </div>
  </button>
</template>

<script lang="ts" setup>
// TODO: Typing
const props = defineProps({ editor: Object })
const open = ref(false)

const insertImage = (src: string) => {
  props.editor?.chain().focus().setImage({ src, alt: "Article image" }).run()
}
</script>

<style scoped>
.menu_wrapper {
  position: relative;
}

.menu_content {
  position: absolute;
  left: 0;
  bottom: 100%;
  background-color: white;
  text-align: initial;
  border: 1px solid #dddddd;
  padding: 0.5em;
}

form {
  display: flex;
  flex-wrap: nowrap;
  gap: 0.5em;
}

form input {
  flex-grow: 1;
}
</style>
