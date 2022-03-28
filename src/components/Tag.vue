<template>
  <!-- TODO: Have tag as a link -->
  <span
    class="tag"
    :class="{clickable: clickable}"
    v-on:click.stop="tag_clicked()">

    <span v-if="tag">{{tag.name}}</span>
    <span v-else>Invalid tag</span>

    <!-- button to remove tag -->
    <span
      v-if="removable"
      class="remove_button"
      v-on:click.stop="$emit('remove')">&times;</span>

  </span>
</template>

<script>

import IdUtils from '@/mixins/IdUtils'

export default {
  name: 'Tag',
  mixins: [
    IdUtils
  ],
  props: {
    tag: {
      type: Object
    },
    removable: {
      type: Boolean,
      default() { return false }
    },
    clickable: {
      type: Boolean,
      default() { return true }
    },
  },
  methods: {
    tag_clicked(){
      if(!this.clickable) return
      const tag_id = this.get_id_of_item(this.tag)
      if(!(this.$route.name === 'articles' && this.$route.query.tag_id !== tag_id)){
        this.$router.push({ name: 'articles', query: { tag_id } })
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

.remove_button {
  margin-left: 5px;
  cursor: pointer;
  transition: color 0.25s;
}

.remove_button:hover {
  color: #c00000;
}


.tag.clickable:hover {
  color:  #c00000;
  border-color:  #c00000;
}




</style>
