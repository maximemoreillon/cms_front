<template>
  <!-- TODO: Consider wrapping in a template with v-if -->
  <div class="editor">
    <ArticleEditorBubbleMenu :editor="editor" v-if="editor" />
    <ArticleEditorFloatingMenu :editor="editor" v-if="editor" />
    <EditorContent :editor="editor" />
  </div>
</template>

<script setup>
import { lowlight } from "lowlight/lib/core"
import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"

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
// import CodeBlock from '@tiptap/extension-code-block'
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Youtube from "@tiptap/extension-youtube"

lowlight.registerLanguage("html", html)
lowlight.registerLanguage("css", css)
lowlight.registerLanguage("js", js)
lowlight.registerLanguage("ts", ts)

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
    CodeBlockLowlight.configure({ lowlight }),
    BulletList,
    OrderedList,
    ListItem,
    Youtube.configure({}),
  ],
  editorProps: {
    attributes: {
      // Can put tailwind styles in here
      class: "content",
    },
  },
  onUpdate: () => {
    emit("update:modelValue", editor.value.getHTML())
  },
})
</script>

<!-- Not scoped because selecting classes inside editor -->
<style scoped>
.editor:deep().content {
  /* Take some space from the outline when the editor is focused */
  padding: 0 0.5em;
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
}
</style>
