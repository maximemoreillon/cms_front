<template>
    <aside :class="{ open }">
        <!-- Would be forgiven to wrap stuff other than nav in its own div-->

        <!-- Open/close navigation -->
        <div class="nav_button_wrapper">
            <button class="navigation_button" @click="emit('navToggle')">
                <Icon name="mdi:menu" />
            </button>
        </div>


        <!-- Logo as link to homepage -->
        <NuxtLink class="logo_wrapper" href="https://maximemoreillon.com">
            <img class="logo" src="~/assets/images/logo/logo.svg" alt="Maxime Moreillon logo">
        </NuxtLink>

        <LayoutNav />
    </aside>
</template>

<script lang="ts" setup>

defineProps({ open: Boolean })
const emit = defineEmits(['navToggle'])

</script>

<style scoped>
aside .nav_button_wrapper {
    display: none;
    /* background-color: white;
    width: var(--header-height);
    height: var(--header-height);
    align-items: center;
    justify-content: center;
    position: absolute;
    left: 100%;
    border-top-right-radius: 100%;
    border-bottom-right-radius: 100%;
    top: 0;
    font-size: 120%; */
}

aside .navigation_button {
    grid-area: navButton;
    cursor: pointer;
}

aside .title {
    grid-area: title;
}

aside .logo_wrapper {
    grid-area: logo;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1em;
}

aside .logo {
    width: 7em;
    height: 7em;
    animation-name: one_minute_rotation;
    animation-iteration-count: infinite;
    animation-duration: 60s;
    animation-timing-function: linear;
}

@keyframes one_minute_rotation {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}


</style>