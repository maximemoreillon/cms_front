<template>
    <div>
        <!-- Wrapping because Not a good idea to have v-if at top level element -->
        <div v-if="show" class="snackbar" :style="snackbar_style">
            {{text}}
        </div>
    </div>

</template>
<script>
export default {
    name: 'Snackbar',
    props: {
        text: String,
        value: Boolean,
        color: String,
    },
    data(){
        return {
        }
    },
    watch: {
        show(value){
            if(value) setTimeout( () => {this.show = false}, 3000)
        }
    },
    computed: {
        show: {
            get() { return this.value },
            set(value) { this.$emit('input', value) },
        },
        snackbar_style(){
            return {
                'background-color': this.color || 'black'
            }
        }
        
    }
}
</script>

<style scoped>
.snackbar {
    position: fixed;
    bottom: 2em;
    left: 50%;
    transform: translateX(-50%);
    padding: 0.5em;
    color: white;
}
</style>
