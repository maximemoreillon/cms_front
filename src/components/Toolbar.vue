<template>
  <div class="toolbar">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',

}
</script>

<style scoped>


.toolbar{
  display: flex;
  flex-wrap: nowrap;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  padding: 5px 0;
  margin-bottom: 25px;
}

.toolbar .tools {
  flex-shrink: 0;
}

.toolbar > * {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.toolbar > * > *:not(:last-child) {
  //margin-right: 1em;
}


.toolbar > *:not(:last-child){
  margin-right: 0.25em;
}

.growing_spacer{
  flex-grow: 1;
}

.dates_container {
  font-size: 80%;
  color: #666666;
}

</style>
