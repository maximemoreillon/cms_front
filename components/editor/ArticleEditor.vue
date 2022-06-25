<template>
  <div>
    <EditorToolbar :editor="editor" v-if="false" />
    <template v-if="true">

      <EditorBubbleMenu :editor="editor" />
      <EditorFloatingMenu :editor="editor"/>
    </template>

    <!-- Ref is used by parent to access article content such as h1 -->
    <EditorContent class="editor_content" :editor="editor" ref="editorContent" />

  </div>
</template>

<script>
import EditorToolbar from './EditorToolbar.vue'
import EditorBubbleMenu from './EditorBubbleMenu.vue'
import EditorFloatingMenu from './EditorFloatingMenu.vue'

// TipTap
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
import Strike from '@tiptap/extension-strike'
import TextAlign from '@tiptap/extension-text-align'
import Code from '@tiptap/extension-code'
import CodeBlock from '@tiptap/extension-code-block'
import BulletList from '@tiptap/extension-bullet-list'
import OrderedList from '@tiptap/extension-ordered-list'
import ListItem from '@tiptap/extension-list-item'

export default {
  name: 'ArticleEditor',
  components: {
    EditorContent,
    EditorToolbar,
    EditorBubbleMenu,
    EditorFloatingMenu,
  },

  props: {
    value: { type: String, default: () => '' },
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
      extensions: [
        Document,
        Paragraph,
        Text,
        Bold,
        Italic,
        Strike,
        TextAlign.configure({ types: ['heading', 'paragraph', 'image'], }),
        Heading.configure({ levels: [1, 2, 3], }),
        Link,
        Image.configure({ inline: true, }), // TODO: Check what the other options are
        History.configure({}),
        Code,
        CodeBlock.configure({ languageClassPrefix: 'language-', }),
        BulletList,
        OrderedList,
        ListItem,
      ],
      content: this.value,
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


<style>

.editor_content {
  /* border: 1px solid #dddddd; */
}
</style>
