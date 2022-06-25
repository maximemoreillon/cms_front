

<template>
  <div class="editor_menu_bar" v-if="editor">

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
      :class="{ 'active': editor.isActive({ textAlign: 'left' }) }">
      <MaterialIconFormatAlignLeft />
    </button>

    <button @click="editor.chain().focus().setTextAlign('center').run()"
      :class="{ 'active': editor.isActive({ textAlign: 'center' }) }">
      <MaterialIconFormatAlignCenter />
    </button>

    <button @click="editor.chain().focus().setTextAlign('right').run()"
      :class="{ 'active': editor.isActive({ textAlign: 'right' }) }">
      <MaterialIconFormatAlignRight />
    </button>

    <button @click="editor.chain().focus().toggleCode().run()" :class="{ 'active': editor.isActive('code') }">
      <MaterialIconCodeBraces />
    </button>

    <button @click="editor.chain().focus().toggleCodeBlock().run()"
      :class="{ 'active': editor.isActive('codeBlock') }">
      <MaterialIconCodeBracesBox />
    </button>

    <button @click="prompt_for_link()">
      <MaterialIconLink />
    </button>

    <ImageInsertMenu :editor="editor" />




  </div>
</template>

<script>
import ImageInsertMenu from './ImageInsertMenu.vue'


export default {
  name: 'EditorToolBar',
  components: {
    ImageInsertMenu,
  },
  props: {
    article: Object,
    editor: Object
  },
  data(){
    return {
      image_upload_menu: false,
    }
  },
  methods: {
    prompt_for_link(){
      const href = prompt('URL:')
      if(href) this.editor.commands.setLink({ href, target: '_blank' })
    },
  
  }


}
</script>

<style scoped>
.editor_menu_bar {
  border: 1px solid #dddddd;
  display: flex;
  gap: 0.25em;
}

</style>
