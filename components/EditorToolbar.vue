

<template>
  <div 
    class="editor_menu_bar"
    v-if="editor">

    <button 
      @click="editor.chain().focus().toggleBold().run()"
      :class="{ 'active': editor.isActive('bold') }">
      <MaterialIconFormatBold />
    </button>
    <button 
      @click="editor.chain().focus().toggleItalic().run()"
      :class="{ 'active': editor.isActive('italic') }">
      <MaterialIconFormatItalic />
    </button>
    <button 
      @click="image_upload_modal = true">
      <MaterialIconImage />
    </button>
    <button 
      @click="prompt_for_link()">
      <MaterialIconLink />
    </button>


    <ImageInsertModal 
      :editor="editor"
      :open="image_upload_modal"
      @close="image_upload_modal = false" />


  </div>
</template>

<script>
import ImageInsertModal from '~/components/ImageInsertModal.vue'


export default {
  name: 'EditorToolBar',
  components: {
    ImageInsertModal,
  },
  props: {
    editor: Object
  },
  data(){
    return {
      image_upload_modal: false,
    }
  },
  methods: {
    prompt_for_link(){
      const href = prompt('URL:')
      if(href) this.editor.commands.setLink({ href, target: '_blank' })
    }
  
  }


}
</script>

<style scoped>
.editor_menu_bar {
  border: 1px solid #dddddd;
  display: flex;
}

</style>
