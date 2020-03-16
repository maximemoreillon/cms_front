<template>
  <span
    class="tag"
    v-on:click.stop="tag_clicked()">

    <span v-if="tag">{{tag.properties.name}}</span>
    <span v-else>Invalid tag</span>

    <!-- button to remove tag -->
    <span
      v-if="removable"
      class="remove_button"
      v-on:click.stop="$emit('remove')">&times;</span>

  </span>
</template>

<script>


export default {
  name: 'Tag',
  props: {
    tag: {
      type: Object
    },
    removable: {
      type: Boolean,
      default() { return false }
    },
    cickable: {
      type: Boolean,
      default() { return false}
    },
  },
  methods: {
    tag_clicked(){
      let target_route_name = 'article_list'
      if(!(this.$route.name === target_route_name && this.$route.query.id === this.tag.identity.low)){
        this.$router.push({ name: target_route_name, query: { tag_id: this.tag.identity.low } })
      }

    }
  },
}
</script>

<style scoped>


.tag {
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
}

.tag:first-child {
  margin-left: 0;
}

.remove_button {
  margin-left: 5px;
  cursor: pointer;
  transition: color 0.25s;
}

.remove_button:hover {
  color: #c00000;
}


.tag:hover {
  color:  #c00000;
  border-color:  #c00000;
}




</style>
