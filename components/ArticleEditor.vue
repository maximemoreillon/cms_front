<template>
  <div>
    <EditorToolbar :editor="editor" />
    <editor-content :editor="editor" ref="editorContent"/>
  </div>
</template>

<script>
import EditorToolbar from '@/components/EditorToolbar.vue'

import { Editor, EditorContent } from '@tiptap/vue-2'

import Document from '@tiptap/extension-document'
import History from '@tiptap/extension-history'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import Heading from '@tiptap/extension-heading'
import Link from '@tiptap/extension-link'
import Image from '@tiptap/extension-image'
import Bold from '@tiptap/extension-bold'
import Italic from '@tiptap/extension-italic'

export default {
  name: 'ArticleEditor',
  components: {
    EditorContent,
    EditorToolbar,
  },

  props: {
    value: { type: String, default: '' },
  },

  data() {
    return {
      editor: null,
    }
  },

  watch: {
    value(value) {
      const isSame = this.editor.getHTML() === value

      if (isSame) return

      this.editor.commands.setContent(value, false)
    },
  },

  mounted() {
    this.editor = new Editor({
      content: this.value,
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        // Underline,
        Link,
        Heading.configure({
          levels: [1, 2, 3],
        }),
        Image.configure({
          inline: true,
        }),
        History.configure({})
      ],
      onUpdate: () => {
        this.$emit('input', this.editor.getHTML())
      },
    })
  },

  beforeDestroy() {
    this.editor.destroy()
  },
}
</script>
