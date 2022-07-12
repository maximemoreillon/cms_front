

<template>
  <BubbleMenu v-if="editor" class="editor_menu" :tippy-options="{ duration: 100 }" :editor="editor">
    <button :class="{ 'active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
      <MaterialIconFormatBold />
    </button>

    <button :class="{ 'active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
      <MaterialIconFormatItalic />
    </button>

    <button :class="{ 'active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
      <MaterialIconFormatStrikethrough />
    </button>


    <button
      :class="{ 'active': editor.isActive('heading', { level: 1 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
    >
      <MaterialIconFormatHeader1 />
    </button>

    <button
      :class="{ 'active': editor.isActive('heading', { level: 2 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
    >
      <MaterialIconFormatHeader2 />
    </button>

    <button
      :class="{ 'active': editor.isActive('heading', { level: 3 }) }"
      @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
    >
      <MaterialIconFormatHeader3 />
    </button>

    <button
      :class="{ 'active': editor.isActive({ textAlign: 'left' }) }"
      @click="editor.chain().focus().setTextAlign('left').run()"
    >
      <MaterialIconFormatAlignLeft />
    </button>

    <button
      :class="{ 'active': editor.isActive({ textAlign: 'center' }) }"
      @click="editor.chain().focus().setTextAlign('center').run()"
    >
      <MaterialIconFormatAlignCenter />
    </button>

    <button
      :class="{ 'active': editor.isActive({ textAlign: 'right' }) }"
      @click="editor.chain().focus().setTextAlign('right').run()"
    >
      <MaterialIconFormatAlignRight />
    </button>

    <button :class="{ 'active': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
      <MaterialIconCodeBraces />
    </button>

    <button :class="{ 'active': editor.isActive('codeBlock') }" @click="editor.chain().focus().toggleCodeBlock().run()">
      <MaterialIconCodeBracesBox />
    </button>

    <button
      :class="{ 'active': editor.isActive('bulletList') }"
      @click="editor.chain().focus().toggleBulletList().run()"
    >
      <MaterialIconFormatListBulleted />
    </button>

    <button
      :class="{ 'active': editor.isActive('orderedList') }"
      @click="editor.chain().focus().toggleOrderedList().run()"
    >
      <MaterialIconFormatListNumbered />
    </button>

    <!-- <button @click="prompt_for_link()" :class="{ 'active': editor.isActive('link') }">
      <MaterialIconLink />
    </button> -->

    <LinkMenu :editor="editor" />
  </BubbleMenu>
</template>

<script>

import { BubbleMenu } from '@tiptap/vue-2'
import LinkMenu from './LinkMenu.vue'

export default {
  name: 'EditorBubbleMenu',
  components: {
    BubbleMenu,
    LinkMenu
},
  props: {
    article: Object,
    editor: Object
  },
  data(){
    return {
    }
  },
  methods: {
    prompt_for_link() {
      const href = prompt('URL:')
      if (href) this.editor.commands.setLink({ href, target: '_blank' })
    },

  }


}
</script>

<style scoped>







</style>
