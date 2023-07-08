<template>
  <div class="loader" />
</template>

<style>
.loader {
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

@keyframes spinner_rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
