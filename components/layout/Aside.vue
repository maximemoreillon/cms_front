<template>
  <aside :class="{open}">
    <!-- Would be forgiven to wrap stuff other than nav in its own div-->

    <!-- Open/close navigation -->
    <div class="nav_button_wrapper">
      <MaterialIconMenu
        class="navigation_button"
        @click="$emit('navToggle')"
      />
    </div>


    <!-- Logo as link to homepage -->
    <a
      class="logo_wrapper"
      href="https://maximemoreillon.com"
    >
      <img
        class="logo"
        src="~/assets/images/logo/logo.svg"
        alt="Maxiime Moreillon logo"
      >
    </a>

    <Nav />
  </aside>
</template>

<script>
import Nav from './Nav.vue'

export default {
  name: 'Aside',
  components: {
    Nav,
  },
  props: {
    open: Boolean
  },

}
</script>

<!-- Could be scoped -->
<style>

aside {


  grid-area: aside;
  align-self: start;

  display: flex;
  flex-direction: column;
  align-items: stretch;


  background-color: white;

  /* Sticky because still needs to be in the document flow for grid */
  position: sticky;
  top: var(--grid-gap);
  z-index: 11;

  border-right: 1px solid var(--border-color);

  transition: transform 0.25s;

  max-height: calc(100vh - 2 * var(--grid-gap));
}

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

/* responsivity */
/* Not mobile first, I know it's bad practice */
@media only screen and (max-width: 50rem) {

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
