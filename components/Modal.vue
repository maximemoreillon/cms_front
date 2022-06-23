<template>
  <div
    class="modal"
    :class="{open}"
    @click.self="$emit('close')" >

    <div class="modal_window_outer">
      <div class="modal_window_inner">

        <!-- CLose button -->
        <span
          v-if="close_button"
          class="modal_close_button"
          @click="$emit('close')">
          ✖
        </span>


        <!-- The content of the modal goes here -->
        <slot />
      </div>
    </div>

  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: {
    open: Boolean,
    close_button: {
      type: Boolean,
      default: true,
    }
  }
}
</script>

<style scoped>
.modal{
  /* poisitioning and sizing of background*/
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 100;

  /* positioning of content */
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #444444; /* fallback for ie */
  background-color: #444444aa;

  /* values which change when opening the modal */
  /* here are the defaults */
  visibility: hidden;
  opacity: 0;

  transition:
    visibility 0.5s,
    opacity 0.5s;
}

.modal.open{
  visibility: visible;
  opacity: 1;

  /* Delay when OPENING */
  transition-delay: 0s;
}

.modal{
  /* delay when CLOSING */
  transition-delay: 0.25s;
}

.modal_window_outer{
  /* for elements positioned absolutely inside */
  position: relative;

  opacity: 0;
  transform: scaleX(0);
  transition:
    opacity 0.25s,
    transform 0.25s;

  /* delay when CLOSING */
  transition-delay: 0.25s;

  /* ADDITIONAL VISUALS */
  background-color: white;
  margin: 50px;
}


.modal_window_inner{
  opacity: 0;
  transition: opacity 0.25s;
  /* Delay when CLOSING */
  transition-delay: 0s;

  /* ADDITIONAL VISUALS */
  padding: 25px;
}

.modal.open .modal_window_outer{
  opacity: 1;
  transform: scaleX(1);

  /* Delay when OPENING */
  transition-delay: 0s;
}


.modal.open .modal_window_inner{
  opacity: 1;
  /* Delay when OPENING */
  transition-delay: 0.25s;
}

/* close button */
.modal_close_button{
  position: absolute;
  top: 0.2em;
  right: 0.4em;
  font-size: 150%;
  font-weight: bold;
  cursor: pointer;
  color: #00000066;
}

.modal_close_button:hover{
  color: #000000;
}
</style>
