

<template>
  <FloatingMenu class="editor_floating_menu" v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">

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

    <button>
      <MaterialIconCodeBraces />
    </button>

    <button>
      <MaterialIconCodeBracesBox />
    </button>

    <button @click="prompt_for_link()">
      <MaterialIconLink />
    </button>

    <ImageInsertMenu :editor="editor" />





  </FloatingMenu>
</template>

<script>


import { FloatingMenu } from '@tiptap/vue-2'
import ImageInsertMenu from './ImageInsertMenu.vue'

export default {
  name: 'EditorFloatingMenu',
  components: {
    FloatingMenu,
    ImageInsertMenu
    
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


.editor_floating_menu {
  display: flex;
  align-items: center;
  background-color: white;
  border: 1px solid #dddddd;
}

</style>
