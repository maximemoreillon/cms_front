<template>
  <div class="loader">
    <div
      v-bind:style="{width: size +'px', height: size+'px', margin: 0.5*size+'px', borderWidth: 0.02*size+'px'}"
      class="spinner"></div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  props: {
    size: {
      default(){return 75},
    },
  },
}
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
}

.spinner {

  border-radius: 100%;
  border-style: solid;
  border-color: #444444 transparent #444444 transparent;

  animation-name: spinner_rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}


@keyframes spinner_rotation {
0% {transform: rotate(0deg);}
100% {transform: rotate(360deg);}
}

</style>
