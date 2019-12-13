<template>
  <div
  class="icon_button"
  v-on:click="$emit('buttonClicked')">

    <span
      class="mdi"
      v-bind:class="icon"/>

  </div>
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

</style>
