<template>
  <aside :class="{ open }">
    <!-- Logo as link to homepage -->
    <!-- TODO: Consider whether this is also part of Nav -->
    <NuxtLink class="logo_wrapper" href="https://maximemoreillon.com">
      <!-- TODO: Make logo customizable -->
      <img
        class="logo"
        src="~/assets/images/logo/logo.svg"
        alt="Maxime Moreillon logo"
      />
    </NuxtLink>

    <LayoutNav />
  </aside>
</template>

<script lang="ts" setup>
defineProps<{ open: boolean }>()
</script>

<style scoped>
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
