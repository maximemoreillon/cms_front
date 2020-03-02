<template>
  <button
    class="icon_button"
    v-bind:style="{ fontSize: size}"
    v-on:click="button_clicked()"
    type="button">
    <slot></slot>
  </button>
</template>

<script>




export default {
  name: 'IconButton',
  props: {
    size: {
      type: String,
      default(){ return "100%" }
    }
  },
  methods: {
    button_clicked(){
      if(!this.loading) this.$emit('buttonClicked')
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

.icon_button.loading {
  color: #aaaaaa;
  cursor:not-allowed;
}

.icon_button:hover {
  color: #c00000;
}

</style>
