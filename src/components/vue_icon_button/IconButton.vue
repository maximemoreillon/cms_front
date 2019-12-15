<template>
  <span
    class="mdi icon_button"
    v-on:click="$emit('buttonClicked')"
    v-bind:class="icon"/>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    icon: String
  }
}
</script>

<style scoped>
.icon_button {
  cursor: pointer;
  font-size: 200%;
  transition: color 0.25s;
  color: #444444;
}

.icon_button:hover {
  color: #c00000;
}
</style>
