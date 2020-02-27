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
  flex-wrap: wrap;
  align-items: center;
  border-bottom: 1px solid #dddddd;
  padding: 5px 0;
  margin-bottom: 25px;
}

.toolbar > *:not(:first-child){
  margin-left: 10px;
}

.growing_spacer{
  flex-grow: 1;
}



.dates_container {
  font-size: 80%;
  color: #666666;
}

</style>
