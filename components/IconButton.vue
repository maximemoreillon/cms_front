<!-- This is just a gloriofied wrapper for CSS so stop using it -->
<template>

  <button
    class="icon_button"
    :style="{ fontSize: size}"
    :class="{ active }"
    @click="button_clicked()"
    type="button">

    <slot />

  </button>

</template>

<script>




export default {
  name: 'IconButton',
  props: {
    size: {
      type: String,
      default(){ return "100%" }
    },
    active: {
      type: Boolean,
      default(){ return false }
    }
  },
  methods: {
    button_clicked(){
      this.$emit('click')

      // For legacy support
      this.$emit('buttonClicked')
    }
  },

}
</script>

<style scoped>

.icon_button {
  border: none;
  background-color: transparent;
  position: relative;
  cursor: pointer;

  transition: color 0.25s;
  color: #444444;

  display: inline-flex;
  justify-content: center;
  align-items: center;
}


.icon_button:hover {
  color: #802020;
}

.icon_button.active {
  color: #c00000;
}

</style>
