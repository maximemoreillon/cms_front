<template>
    <div 
    class="modal_background" 
    v-if="open"
    @click.self="open = false">

        <div class="modal_container">
            <button @click="open = false" class="modal_close_button">
                <Icon name="mdi:close" />
            </button>
            <slot />
        </div>
    </div>
</template>

<script lang="ts" setup>

const props = defineProps<{
    modelValue: boolean
}>()

const emits = defineEmits(['update:modelValue'])

const open = computed({
    get(){
        return props.modelValue
    },
    set(newVal){
        emits('update:modelValue', newVal)
    }
})
</script>

<style scoped>
.modal_background {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 2;

    background-color: #00000022;

    display: flex;
    align-items: center;
    justify-content: center;
}

.modal_container {
    max-width: 95vw;
    position: relative;
}

.modal_close_button {
    position: absolute;
    top: 1em;
    right: 1em;
}
</style>