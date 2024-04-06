<template>
  <template v-if="editor">
    <ArticleEditorBubbleMenu :editor="editor" class="menu" />
    <ArticleEditorFloatingMenu :editor="editor" class="menu" />
  </template>
  <EditorContent :editor="editor" />
</template>

<script setup>
// TipTap and its extensions
import { useEditor, EditorContent } from "@tiptap/vue-3"

import Document from "@tiptap/extension-document"
import History from "@tiptap/extension-history"
import Paragraph from "@tiptap/extension-paragraph"
import Text from "@tiptap/extension-text"
import Heading from "@tiptap/extension-heading"
import Link from "@tiptap/extension-link"
import Image from "@tiptap/extension-image"
import Bold from "@tiptap/extension-bold"
import Italic from "@tiptap/extension-italic"
import Strike from "@tiptap/extension-strike"
import TextAlign from "@tiptap/extension-text-align"
import Code from "@tiptap/extension-code"
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Youtube from "@tiptap/extension-youtube"

const emit = defineEmits(["update:modelValue"])
const props = defineProps({
  modelValue: { type: String, default: "" },
})

// Not sure if computed really necessary
const modelValue = computed(() => props.modelValue)

watch(modelValue, () => {
  if (editor.value.getHTML() === props.modelValue) return
  editor.value.commands.setContent(props.modelValue, false)
})

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    Document,
    Paragraph,
    Text,
    Bold,
    Italic,
    Strike,
    TextAlign.configure({ types: ["heading", "paragraph", "image"] }),
    Heading.configure({ levels: [1, 2, 3] }),
    Link.configure({ openOnClick: false }),
    Image.configure({ inline: true }),
    History.configure({}),
    Code,
    CodeBlockLowlight.configure({ lowlight }), // Note: lowlight auto-imported
    BulletList,
    OrderedList,
    ListItem,
    Youtube.configure({}),
  ],
  editorProps: {
    attributes: {
      class: "text_input content",
    },
  },
  onUpdate: () => {
    emit("update:modelValue", editor.value.getHTML())
  },
})
</script>

<style scoped>
.menu:deep() {
  /* inline-flex needed otherwise overflow */
  display: inline-flex;
  gap: 0.25rem;
  padding: 0.25rem;
  border: 1px solid var(--border-color);
  background-color: var(--background-color);
  border-radius: var(--border-radius);
}

.menu:deep() > .button {
  padding: 0.5rem;
}
</style>
