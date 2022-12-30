<template>
  <NuxtLoadingIndicator color="#c00000" />
  <!-- Wrapping for CSS -->
  <div class="layout">
    <!-- Header is only visible on mobile -->
    <LayoutHeader @navToggle="aside_open = !aside_open" />

    <LayoutAside :open="aside_open" @navToggle="aside_open = !aside_open" />

    <main>
      <NuxtPage />
    </main>

    <div
      class="nav_backround"
      :class="{ visible: aside_open }"
      @click="aside_open = false"
    />
  </div>
</template>

<script lang="ts" setup>
import "~~/assets/styles/codeBlock.css"
import "~~/assets/styles/button.css"
import "~~/assets/styles/textInput.css"
import "~~/assets/styles/fab.css"

const aside_open = ref(false)
</script>

<style>
:root {
  /* Sizes */
  --header-height: 2.5em;
  --nav-width: 12em;
  --aside-width: var(--nav-width);
  --grid-gap: 1em;
  --main-max-width: 40em;

  /* Colors */
  /* TODO: shoukld have been color-accent, color-border, etc. */
  --accent-color: #c00000;

  /* TODO: find better name */
  --border-color: #dddddd;

  --text-color: #444444;
  --headers-color: #222222;
  --nav-color: #222222;
  --text-light-color: #666666;

  --error-color: #c00000;
  --success-color: #00c000;

  /* Text */
  --line-height: 1.5;

  /* Misc */
  --border-radius: 0.5rem;
}

::-webkit-scrollbar {
  width: 3px;
  height: 3px;
}

::-webkit-scrollbar-track {
  background-color: transparent;
}

::-webkit-scrollbar-thumb {
  background-color: var(--accent-color);
}

* {
  box-sizing: border-box;
}

html {
  /* Keep the scrollbar visible at all time */
  overflow-y: scroll;
}

body {
  /* TODO: Use nicer font like roboto */
  font-family: sans-serif;
  font-size: clamp(1rem, 2.5vw, 1.2rem);

  padding: 0;
  margin: 0;

  color: var(--text-color);
}

h1,
h2,
h3 {
  color: var(--headers-color);
}

h1 {
  /* Margin to zero because otherwise inconsistent gap at top of pages */
  margin: 0;
}

section {
  margin: 1rem 0;
}

.spacer {
  flex-grow: 1;
}

.active {
  color: var(--accent-color);
}

.layout {
  /* Padding achieved using grid */
  min-height: 100vh;
  display: grid;
  grid-template-areas:
    ". . . ."
    ". aside main ."
    ". . . .";
  grid-template-columns:
    1fr var(--aside-width) minmax(auto, var(--main-max-width))
    1fr;
  grid-template-rows: 0 1fr 0;
  grid-gap: var(--grid-gap);
}

aside {
  /* Sticky and not fixed because needs to be in the document flow for grid positioning */
  position: sticky;

  grid-area: aside;
  align-self: start;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  background-color: white;

  top: var(--grid-gap);
  z-index: 11;
  border-right: 1px solid var(--border-color);
  transition: transform 0.25s;
  max-height: calc(100vh - 2 * var(--grid-gap));
}

header {
  /* Layer only visible on small devices */
  grid-area: header;
  display: none;
  background-color: white;
  position: sticky;
  top: 0;
  z-index: 8;
  font-size: 1.5rem;
  border: none;
  border-bottom: 1px solid var(--border-color);
  padding: 0.25em 0.5em;
}

main {
  grid-area: main;

  /* Position relaive for FABs */
  position: relative;

  /* TODO: Figure out where to have this */
  line-height: var(--line-height);
}

nav {
  font-size: 1.1em;
  /* Re-applying background color for times where position fixed */
  background-color: white;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
}

main a {
  color: var(--accent-color);
}

.content img {
  max-width: 80%;
  max-height: 60vh;
  /* border-radius: var(--border-radius); */
  /* box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); */
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.content iframe {
  display: block;
  /* img, iframe default is inline */
  margin: 2em auto;
  max-width: 100%;

  /* This is super useful */
  aspect-ratio: 3/2;
}

/* responsivity */
/* Not mobile first, I know it's bad practice */
@media only screen and (max-width: 50rem) {
  .layout {
    /* Outer columns to zero because gap is enough */
    /* Aside outside the flow so omitted from grid*/
    grid-template-columns: 0 1fr 0;
    grid-template-rows: auto 1fr auto;
    grid-template-areas:
      "header header header"
      ". main .";
  }

  .nav_backround {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9;
    background-color: #00000044;
    visibility: hidden;
    opacity: 0;
    transition: visibility 0.5s, opacity 0.5s;
  }

  .nav_backround.visible {
    visibility: visible;
    opacity: 1;
  }

  header {
    display: flex;
  }

  aside {
    font-size: 1.2rem;
    position: fixed;
    left: 0;
    top: 0;
    max-height: none;
    height: 100%;
    width: var(--nav-width);
    transform: translateX(-100%);
    border: none;
    filter: drop-shadow(0em 0em 0.25em #44444444);
  }

  aside.open {
    transform: translateX(0%);
  }
}
</style>
