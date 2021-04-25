<template>
  <div class="">

    <editor-menu-bar
      :editor="editor"
      v-slot="{ commands, isActive }">

      <div class="menubar">

        <IconButton
        v-bind:active="isActive.bold()"
        @click="commands.bold">
        <format-bold-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.italic()"
        @click="commands.italic">
        <format-italic-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.strike()"
        @click="commands.strike">
        <format-strikethrough-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.underline()"
        @click="commands.underline">
        <format-underline-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.code()"
        @click="commands.code">
        <code-tags-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.paragraph()"
        @click="commands.paragraph">
        <format-paragraph-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.heading({ level: 1 })"
        @click="commands.heading({ level: 1 })">
        <format-header-1-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.heading({ level: 2 })"
        @click="commands.heading({ level: 2 })">
        <format-header-2-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.heading({ level: 3 })"
        @click="commands.heading({ level: 3 })">
        <format-header-3-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.bullet_list()"
        @click="commands.bullet_list">
        <format-list-bulleted-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.ordered_list()"
        @click="commands.ordered_list">
        <format-list-numbered-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.blockquote()"
        @click="commands.blockquote">
        <format-quote-close-icon />
        </IconButton>

        <IconButton
        v-bind:active="isActive.code_block()"
        @click="commands.code_block">
        <code-tags-icon />
        </IconButton>


        <IconButton
        @click="commands.undo">
        <undo-icon />
        </IconButton>

        <IconButton
        @click="commands.redo">
        <redo-icon />
        </IconButton>

        <IconButton
        v-on:click="showImagePrompt(commands.image)">
        <image-icon />
        </IconButton>

        <IconButton
        v-on:click="showVideoPromt(commands.iframe)">
        <youtube-icon />
        </IconButton>

        <IconButton
        v-bind:class="{ 'is-active': isActive.link() }"
        v-on:click="prompt_for_url(commands.link)">
        <link-icon />
        </IconButton>


      </div>

    </editor-menu-bar>



    <Modal
      class="above_all"
      v-bind:open="image_upload_modal.open"
      v-on:close="image_upload_modal.open = false">

      <h2>Image upload</h2>
      <p>Using an URL</p>
      <form
        class=""
        v-on:submit.prevent="submit_image_link()">
        <input type="text" ref="image_url_input">
        <input type="submit" name="">
      </form>
      <p>Or upload an image</p>
      <form
        class=""
        v-on:submit.prevent="image_upload()">
        <input type="file" ref="image_input" name="image">
        <input type="submit" name="">
      </form>

    </Modal>
  </div>

</template>

<script>

import { EditorMenuBar } from 'tiptap'
import IconButton from '@/components/vue_icon_button/IconButton.vue'
import Modal from '@moreillon/vue_modal'

export default {
  name: 'Comment',
  components: {
      EditorMenuBar,
      IconButton,
      Modal,
  },
  props: {
    editor: Object
  },
  data(){
    return {
      image_upload_modal: {
        open: false,
      },
    }
  },
  methods: {
    prompt_for_url(command){
      let url = prompt('URL:')
      if(url) command({ href: url })

    },
    showVideoPromt(command){
      const src = prompt('Enter the ID of your video here')
      if (src) command({ src })
    },

    showImagePrompt(command) {
      if(!process.env.VUE_APP_IMAGE_MANAGER_API_URL) {
        const src = prompt('Enter the url of your image here')
        if (src) command({ src })
        return
      }
      this.image_upload_modal.open = true

    },
    submit_image_link(){
      const src =  this.$refs.image_url_input.value
      this.editor.commands.image({src})
      this.$refs.image_url_input.value = ""
      this.image_upload_modal.open = false
    },

    image_upload(){


      let formData = new FormData();
      formData.append('image', this.$refs.image_input.files[0])
      const url = `${process.env.VUE_APP_IMAGE_MANAGER_API_URL}/image`
      const options = {
        headers: {'Content-Type': 'multipart/form-data' }
      }
      this.axios.post(url, formData, options)
      .then(response => {
        const image_id = response.data._id
        const src = `${process.env.VUE_APP_IMAGE_MANAGER_API_URL}/images/${image_id}`
        this.editor.commands.image({src})
        this.image_upload_modal.open = false

      })
      .catch(error => {

        if(error.response) console.error(error.response.data)
        else console.error(error)

        alert(`Upload failed`)
      })

    }
  }


}
</script>

<style scoped>
form {
  display: flex;
}
input[type="text"], input[type="text"] {
  flex-grow: 1;
  margin-right: 1em;
}
</style>
