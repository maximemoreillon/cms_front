

<template>
  <div v-if="editor" class="editor_menu_bar">
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

    <button
      :class="{ 'active': editor.isActive('codeBlock') }"
      @click="editor.chain().focus().toggleCodeBlock().run()"
    >
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
