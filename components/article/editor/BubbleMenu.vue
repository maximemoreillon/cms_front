<template>
  <BubbleMenu
    class="menu"
    v-if="editor"
    :tippy-options="{ duration: 100 }"
    :editor="editor"
  >
    <button
      :class="{ active: editor.isActive('bold') }"
      class="button"
      @click="editor.chain().focus().toggleBold().run()"
    >
      <Icon name="mdi:format-bold" />
    </button>

    <button
      :class="{ active: editor.isActive('italic') }"
      class="button"
      @click="editor.chain().focus().toggleItalic().run()"
    >
      <Icon name="mdi:format-italic" />
    </button>

    <button
      :class="{ active: editor.isActive('strike') }"
      class="button"
      @click="editor.chain().focus().toggleStrike().run()"
    >
      <Icon name="mdi:format-strikethrough" />
    </button>

    <button
      :class="{ active: editor.isActive('code') }"
      class="button"
      @click="editor.chain().focus().toggleCode().run()"
    >
      <Icon name="mdi:code-braces" />
    </button>

    <button
      v-for="level in 3"
      :key="level"
      :class="{ active: editor.isActive('heading', { level }) }"
      class="button"
      @click="editor.chain().focus().toggleHeading({ level }).run()"
    >
      <Icon :name="`mdi:format-header-${level}`" />
    </button>

    <button
      :class="{ active: editor.isActive({ textAlign: 'left' }) }"
      class="button"
      @click="editor.chain().focus().setTextAlign('left').run()"
    >
      <Icon name="mdi:format-align-left" />
    </button>

    <button
      :class="{ active: editor.isActive({ textAlign: 'center' }) }"
      class="button"
      @click="editor.chain().focus().setTextAlign('center').run()"
    >
      <Icon name="mdi:format-align-center" />
    </button>

    <button
      :class="{ active: editor.isActive({ textAlign: 'right' }) }"
      class="button"
      @click="editor.chain().focus().setTextAlign('right').run()"
    >
      <Icon name="mdi:format-align-right" />
    </button>

    <ArticleEditorLinkMenu :editor="editor" />
  </BubbleMenu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from "@tiptap/vue-3"

// TODO: typing
defineProps<{
  editor: any
}>()
</script>
