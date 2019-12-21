<template>
  <div class="loader">
    <div class="spinner">

    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
}
</script>

<style scoped>
.loader {
  display: flex;
  justify-content: center;
}

.spinner {
  margin: 5vmin;
  width: 10vmin;
  height: 10vmin;

  border-radius: 100%;
  border-width: 3px;
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
