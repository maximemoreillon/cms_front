<template>
  <span
    class="tag"
    v-bind:class="{searchable: searchable}"
    v-on:click.stop="tag_clicked()">
    <span>{{label}}</span>
    <span
      v-if="removable"
      class="remove_button"
      v-on:click="$emit('remove')">&times;</span>
  </span>
</template>

<script>


export default {
  name: 'Tag',
  props: {
    label: {
      type: String,
      default() { return "Unlabeled"}
    },
    removable: {
      type: Boolean,
      default() { return false }
    },
    searchable: {
      type: Boolean,
      default() { return false}
    },
  },
  methods: {
    tag_clicked(){
      if(this.searchable){
        this.$router.push({ name: 'article_list', query: { tags: [this.label] } })
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
  margin: 5px;
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


.searchable {
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
}

.searchable:hover {
  color:  #c00000;
  border-color:  #c00000;
}




</style>
