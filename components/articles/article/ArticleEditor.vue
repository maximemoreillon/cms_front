<template>
    <editor-content :editor="editor" />
</template>

<script setup>
import { watch } from 'vue';
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'

const emit = defineEmits(['update:modelValue'])
const props = defineProps({
    modelValue: { type: String, default: '' },
})


watch(props, ({ modelValue }) => {
    if (editor.value.getHTML() === modelValue) return
    editor.value.commands.setContent(modelValue, false)
})

const editor = useEditor({
    content: '<p>I’m running Tiptap with Vue.js. 🎉</p>',
    extensions: [
        StarterKit
    ],
    onUpdate: () => {
        emit('update:modelValue', editor.value.getHTML())
    
    },
})

</script>