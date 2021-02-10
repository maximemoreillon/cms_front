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
      if(!(this.$route.name === 'article_list' && this.$route.query.id === this.tag.identity)){
        this.$router.push({ name: 'article_list', query: { tag_id: this.tag.identity } })
      }

    }
  },
}
</script>

<style scoped>


.tag {
  font-size: 80%;
  flex-shrink: 0;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 5px;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;

  max-width: 150px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.tag:not(:last-child) {
  margin-left: 0.25em;
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
