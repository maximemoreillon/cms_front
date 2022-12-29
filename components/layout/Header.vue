<template>
  <header>
    <!-- Open/close navigation -->
    <button class="navigation_button button" @click="emit('navToggle')">
      <Icon name="mdi:menu" />
    </button>

    <!-- Logo as link to homepage -->
    <a class="logo_wrapper" href="https://maximemoreillon.com">
      <img
        class="logo"
        src="~/assets/images/logo/logo.svg"
        alt="Maxime Moreillon logo"
      />
    </a>
  </header>
</template>

<script setup lang="ts">
const emit = defineEmits(["navToggle"])
</script>

<style scoped>
header .navigation_button {
  grid-area: navButton;
  cursor: pointer;
  display: none;
}

header .title {
  grid-area: title;
}

header .logo_wrapper {
  grid-area: logo;
  display: flex;
  justify-content: center;
  align-items: center;
  /* height: 100%; */
  /* outline: 1px solid red; */
  padding: 1.5em;
}

header .logo {
  width: 7.5em;
  height: 7.5em;
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

/* responsivity */
/* Not mobile first, I know it's bad practice */
@media only screen and (max-width: 50rem) {
  header .navigation_button {
    display: block;
    margin-right: 1em;
  }

  header .logo_wrapper {
    padding: 0;
  }

  header .logo {
    height: 1.75em;
    width: 1.75em;
  }
}
</style>
