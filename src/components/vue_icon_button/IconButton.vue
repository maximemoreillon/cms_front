<template>

  <!-- TODO: Change from SPAN to BUTTON -->
  <span
    class="mdi icon_button"
    v-bind:style="{ fontSize: size}"
    v-on:click="button_clicked()"
    v-bind:class="[icon, {loading: loading}]">

    <div class="loader" v-if="loading"/>

  </span>
</template>

<script>
export default {
  name: 'IconButton',
  props: {
    icon: String,
    loading: Boolean,
    size: {
      type: String,
      default(){
        return "150%";
      }
    }
  },
  methods: {
    button_clicked(){
      if(!this.loading) this.$emit('buttonClicked')
    }
  }
}
</script>

<style scoped>
.icon_button {
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

.icon_button:not(.loading):hover {
  color: #c00000;
}

.icon_button .loader{
  width: 20px;
  height: 20px;
  border-radius: 100%;
  border-width: 3px;
  border-style: solid;
  border-color: #444444 transparent #444444 transparent;
  position: absolute;

  animation-name: loader_rotation;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}

@keyframes loader_rotation {
  0% {transform: rotate(0deg);}
  100% {transform: rotate(360deg);}
}
</style>
