<template>
  <!-- Cannot have tag as link because remove button -->
  <span
    class="tag"
    :class="{clickable}"
    @click.stop="tag_clicked()"
  >

    <span class="tag_name">{{ tag.name || 'Untitled' }}</span>

    <!-- button to remove tag -->
    <button
      v-if="removable"
      class="remove_button"
      @click.stop="$emit('remove')"
    >
      <MaterialIconClose />
    </button>

  </span>
</template>

<script>

export default {
  name: 'Tag',

  props: {
    tag: Object,
    removable: {
      type: Boolean,
    },
    clickable: {
      type: Boolean,
      default() { return true }
    },
  },
  methods: {
    tag_clicked(){
      if(!this.clickable) return
      const tag_id = this.tag._id
      if(!(this.$route.name === 'articles' && this.$route.query.tag_id !== tag_id)){
        this.$router.push({ name: 'index', query: { tag_id } })
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
  padding: 0.25em 0.5em;
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
  background-color: transparent;
  border: none;

  transition:
    color 0.25s,
    background-color 0.25s;

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
