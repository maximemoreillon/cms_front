<template>
    <div class="loader_wrapper">

        <!-- the spinner -->
        <div class="spinner" />

        <!-- message -->
        <div v-if="$slots.default" v-bind:class="{ blinking: blinking }">
            <slot />
        </div>



    </div>
</template>

<script>


export default {
    name: 'Loader',
    props: {
        blinking: {
            type: Boolean,
            default() { return true }
        }
    },

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
* {
    box-sizing: border-box;
}

.loader_wrapper {
    display: inline-flex;
    align-items: center;
    gap: 0.5em
}

.spinner {

    width: 1em;
    height: 1em;

    border-width: 0.05em;
    border-radius: 100%;
    border-style: solid;
    border-color: currentColor transparent currentColor transparent;

    animation-name: spinner_rotation;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;

    user-select: none;
}


.loader_message.blinking {
    animation-name: blinking_text;
    animation-duration: 1s;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    animation-direction: alternate;
}

@keyframes spinner_rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}

@keyframes blinking_text {
    0% {
        opacity: 0;
    }

    100% {
        opacity: 1;
    }
}
</style>
