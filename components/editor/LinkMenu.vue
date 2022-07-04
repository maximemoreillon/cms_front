

<template>
    <button class="menu_wrapper" :class="{ active: editor.isActive('link'), open}" @click="open = !open">
        <MaterialIconLink />
        <div class="menu_content" v-if="open" @click.stop>
            <form @submit.prevent="set_link()">
                <input type="text" v-model="url">
                <input type="submit">
                <button @click="clear_link()">Remove</button>
            </form>
        </div>
    </button>
</template>

<script>

export default {
    name: 'LinkMenu',
    components: {
        
    },
    props: {
        editor: Object
    },
    data() {
        return {
            open: false,
            url: ''
        }
    },
    watch: {
        open(open){
            if (open) this.url = this.editor.getAttributes('link').href
            else this.url = ''
        }
    },
    methods: {
        set_link(){
            
            this.editor
                .chain()
                .focus()
                .extendMarkRange('link')
                .setLink({ href:this.url })
                .run()
            
            this.open = false
            
        },
        clear_link(){
            this.editor.chain().focus().unsetLink().run()
            this.open = false
        }

    }


}
</script>

<style scoped>
.menu_wrapper{
    position: relative;
    display: inline-flex;
    align-items: center;
}
.menu_content {
    /* Setting back cursor because button */
    cursor: initial;
    z-index: 3;
    background-color: white;
    border: 1px solid #dddddd;
    padding: 1em;
    
    position: absolute;
    right: 0;
    top: calc(100% + 10px);
}



form {
    display: flex;
    flex-wrap: nowrap;
    gap: 0.5em;
}

input[type="text"] {
    flex-grow: 1;
}
</style>
