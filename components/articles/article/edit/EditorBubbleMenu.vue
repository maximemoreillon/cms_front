<template>
    <BubbleMenu 
        class="editor_menu" 
        :tippy-options="{ duration: 100 }" 
        :editor="editor">


        <button :class="{ 'active': editor.isActive('bold') }" @click="editor.chain().focus().toggleBold().run()">
            <Icon name="mdi:format-bold" />
        </button>

        <button :class="{ 'active': editor.isActive('italic') }" @click="editor.chain().focus().toggleItalic().run()">
            <Icon name="mdi:format-italic" />
        </button>

        <button :class="{ 'active': editor.isActive('strike') }" @click="editor.chain().focus().toggleStrike().run()">
            <Icon name="mdi:format-strikethrough" />
        </button>


        <button 
            v-for="level in 3" :key="level"
            :class="{ 'active': editor.isActive('heading', { level}) }"
            @click="editor.chain().focus().toggleHeading({ level}).run()">
            <Icon :name="`mdi:format-header-${level}`" />
        </button>

        <button :class="{ 'active': editor.isActive({ textAlign: 'left' }) }"
            @click="editor.chain().focus().setTextAlign('left').run()">
            <Icon name="mdi:format-align-left" />
        </button>

        <button :class="{ 'active': editor.isActive({ textAlign: 'center' }) }"
            @click="editor.chain().focus().setTextAlign('center').run()">
            <Icon name="mdi:format-align-center" />
        </button>

        <button :class="{ 'active': editor.isActive({ textAlign: 'right' }) }"
            @click="editor.chain().focus().setTextAlign('right').run()">
            <Icon name="mdi:format-align-right" />
        </button>

        <button :class="{ 'active': editor.isActive('code') }" @click="editor.chain().focus().toggleCode().run()">
            <Icon name="mdi:calendar" />
        </button>

        <button :class="{ 'active': editor.isActive('codeBlock') }"
            @click="editor.chain().focus().toggleCodeBlock().run()">
            <Icon name="mdi:calendar" />
        </button>

        <button :class="{ 'active': editor.isActive('bulletList') }"
            @click="editor.chain().focus().toggleBulletList().run()">
            <Icon name="mdi:calendar" />
        </button>

        <button :class="{ 'active': editor.isActive('orderedList') }"
            @click="editor.chain().focus().toggleOrderedList().run()">
            <Icon name="mdi:calendar" />
        </button>

        <!-- <LinkMenu :editor="editor" /> -->
    </BubbleMenu>
</template>

<script lang="ts" setup>
import { BubbleMenu } from '@tiptap/vue-3'

defineProps({
    editor: { type: Object },
})



</script>