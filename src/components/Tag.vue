<template>
  <!-- TODO: Have tag as a link -->
  <span
    class="tag"
    :class="{clickable: clickable}"
    v-on:click.stop="tag_clicked()">

    <span class="tag_name">{{tag.name || 'Untitled'}}</span>

    <!-- button to remove tag -->
    <span
      v-if="removable"
      class="remove_button"
      v-on:click.stop="$emit('remove')">
      <close-icon />
    </span>

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
    tag: Object,
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
  font-size: 85%;
  flex-shrink: 0;
  border: 1px solid #dddddd;
  border-radius: 5px;
  padding: 0.5em 0.75em;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;

  max-width: 9em;


  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5em;
}

.tag_name {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.remove_button {
  cursor: pointer;
  transition:
    color 0.25s, background-color 0.25s;
  display: flex;
  align-items: center;
  border-radius: 1000px;
  padding: 0.25em;
}

.remove_button:hover {
  color: white;
  background-color: var(--accent-color);
}


.tag.clickable:hover {
  color: var(--accent-color);;
  border-color: var(--accent-color);;
}




</style>
