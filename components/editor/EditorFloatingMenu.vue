

<template>
  <FloatingMenu class="editor_menu" v-if="editor" :editor="editor" :tippy-options="{ duration: 100 }">

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

    <button @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'active': editor.isActive('codeBlock') }">
      <MaterialIconCodeBracesBox />
    </button>

    <button @click="editor.chain().focus().toggleBulletList().run()"
      :class="{ 'active': editor.isActive('bulletList') }">
      <MaterialIconFormatListBulleted />
    </button>

    <button @click="editor.chain().focus().toggleOrderedList().run()"
      :class="{ 'active': editor.isActive('orderedList') }">
      <MaterialIconFormatListNumbered />
    </button>



    <ImageInsertMenu :editor="editor" />

    <button @click="prompt_for_youtube()">
      <MaterialIconYoutube />
    </button>





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
    prompt_for_youtube() {
      const src = prompt('URL:')
      if (src) this.editor.commands.setYoutubeVideo({ src, width: 640, height: 480 })
    },

  }


}
</script>

<style scoped>


.editor_menu {
  transform: translateX(10%);
}

</style>
