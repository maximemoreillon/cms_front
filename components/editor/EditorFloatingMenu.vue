

<template>
  <FloatingMenu v-if="editor" class="editor_menu" :editor="editor" :tippy-options="{ duration: 100 }">
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
