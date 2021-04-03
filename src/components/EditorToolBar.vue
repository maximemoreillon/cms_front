<template>
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

</template>

<script>

import { EditorMenuBar } from 'tiptap'
import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  name: 'Comment',
  components: {
      EditorMenuBar,
      IconButton
  },
  props: {
    editor: Object
  },
  methods: {
  }


}
</script>

<style scoped>

</style>
