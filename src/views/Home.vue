<template>
  <div class="home">

    
    <textarea class="edit" v-model="content"/>

    <div class="preview" v-html="content">
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  data(){
    return{
      content: "test",
    }
  }
}
</script>

<style scoped>
.home{
  display: flex;
  flex-direction: row;
  align-items: stretch;
  height: 100vh;
}

.home > * {
  flex-grow: 1;
  flex-basis: 0;
}
.edit{
  background-color: lightpink;
}

.preview {
  background-color: lightblue;
}

textarea {
  resize: none;
  width: 100%;
  height: 100%;
}
</style>
