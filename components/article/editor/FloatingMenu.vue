<template>
  <FloatingMenu
    v-if="editor"
    :editor="editor"
    :tippy-options="{ duration: 100 }"
  >
    <button
      v-for="level in 3"
      :key="level"
      class="button"
      :class="{ active: editor.isActive('heading', { level }) }"
      @click="editor.chain().focus().toggleHeading({ level }).run()"
    >
      <Icon :name="`mdi:format-header-${level}`" />
    </button>

    <button
      class="button"
      :class="{ active: editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
      <Icon name="mdi:code-braces-box" />
    </button>

    <button
      class="button"
      :class="{ active: editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <Icon name="mdi:format-list-bulleted" />
    </button>

    <button
      class="button"
      :class="{ active: editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      <Icon name="mdi:format-list-numbered" />
    </button>

    <ArticleEditorImageMenu :editor="editor" />

    <button @click="prompt_for_youtube()" class="button">
      <Icon name="mdi:youtube" />
    </button>
  </FloatingMenu>
</template>

<script lang="ts" setup>
import { FloatingMenu } from "@tiptap/vue-3"

const props = defineProps({
  editor: { type: Object },
})

// TODO: Have a nicer propmt, such as a dialog
const prompt_for_youtube = () => {
  const src = prompt("URL:")
  if (src)
    props.editor.commands.setYoutubeVideo({ src, width: 640, height: 480 })
}
</script>
