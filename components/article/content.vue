<!-- UNUSED AS THIS MIGHT AFFECT SEO -->
<template>
  <editor-content :editor="editor" class="content" />
  <!-- Modal to zoom on images -->
  <Modal v-model="modalOpen">
    <img :src="modalImageSrc" alt="" class="modal_image" />
  </Modal>
</template>

<script setup lang="ts">
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
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight"
import BulletList from "@tiptap/extension-bullet-list"
import OrderedList from "@tiptap/extension-ordered-list"
import ListItem from "@tiptap/extension-list-item"
import Youtube from "@tiptap/extension-youtube"

lowlight.registerLanguage("html", html)
lowlight.registerLanguage("css", css)
lowlight.registerLanguage("js", js)
lowlight.registerLanguage("ts", ts)

const props = defineProps<{ content: string }>()
const modalOpen = ref(false)
const modalImageSrc = ref("")

const editor = useEditor({
  content: props.content,
  editable: false,
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
})

onMounted(() => {
  addEventListenerForImageModals()
})

const addEventListenerForImageModals = () => {
  editor.value?.view.dom.querySelectorAll("img").forEach((img: HTMLElement) => {
    img.addEventListener(
      "click",
      (event: any) => {
        modalOpen.value = true
        modalImageSrc.value = event.target.src
      },
      false
    )
  })
}
</script>

<style scoped>
.modal_image {
  border-radius: var(--border-radius);
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  display: flex;
}

.content:deep() h1 {
  /* hide h1 of article.content, show article.title as h1 instead */
  display: none;
}

.content:deep() img {
  cursor: pointer;
}
</style>
