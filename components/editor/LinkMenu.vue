

<template>
    <div class="menu_wrapper">
        <button :class="{ 'active': editor.isActive('link') }" @click="open = !open">
            <MaterialIconLink />
        </button>
        <div class="menu_content" v-if="open">
            <form @submit.prevent="set_link()">
                <input type="text" v-model="url">
                <input type="submit">
                <button @click="clear_link()">Remove</button>
            </form>
        </div>

    </div>
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
}
.menu_content {
    z-index: 3;
    background-color: white;
    border: 1px solid #dddddd;
    right: 0;
    
    position: absolute;
    padding: 1em;
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
