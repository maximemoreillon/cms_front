

<template>
  <BubbleMenu class="editor_bubble_menu" v-if="editor" :tippy-options="{ duration: 100 }" :editor="editor">


    <button @click="editor.chain().focus().toggleBold().run()" :class="{ 'active': editor.isActive('bold') }">
      <MaterialIconFormatBold />
    </button>

    <button @click="editor.chain().focus().toggleItalic().run()" :class="{ 'active': editor.isActive('italic') }">
      <MaterialIconFormatItalic />
    </button>

    <button @click="editor.chain().focus().toggleStrike().run()" :class="{ 'active': editor.isActive('strike') }">
      <MaterialIconFormatStrikethrough />
    </button>


    <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      :class="{ 'active': editor.isActive('heading', { level: 1 }) }">
      <MaterialIconFormatHeader1 />
    </button>

    <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      :class="{ 'active': editor.isActive('heading', { level: 2 }) }">
      <MaterialIconFormatHeader2 />
    </button>

    <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
      :class="{ 'active': editor.isActive('heading', { level: 3 }) }">
      <MaterialIconFormatHeader3 />
    </button>

    <button @click="editor.chain().focus().setTextAlign('left').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'left' }) }">
      <MaterialIconFormatAlignLeft />
    </button>

    <button @click="editor.chain().focus().setTextAlign('center').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'center' }) }">
      <MaterialIconFormatAlignCenter />
    </button>

    <button @click="editor.chain().focus().setTextAlign('right').run()"
      :class="{ 'is-active': editor.isActive({ textAlign: 'right' }) }">
      <MaterialIconFormatAlignRight />
    </button>

    <button>
      <MaterialIconCodeBraces />
    </button>

    <button>
      <MaterialIconCodeBracesBox />
    </button>

    <button @click="prompt_for_link()">
      <MaterialIconLink />
    </button>



  </BubbleMenu>
</template>

<script>

import { BubbleMenu } from '@tiptap/vue-2'

export default {
  name: 'EditorBubbleMenu',
  components: {
    BubbleMenu
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

.editor_bubble_menu {
  /* inline-flex needed otherwise overflow */
  display: inline-flex;
  align-items: center;
  background-color: white;
  border: 1px solid #dddddd;
}

</style>
