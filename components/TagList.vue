<template>
  <div class="tag_list">

    <template v-if="tags && tags.length">
      <MaterialIconTag />

      <Tag :clickable="false" v-for="(tag, index) in tag_list" v-bind:key="`tag_${index}`" :tag="tag" />

      <span v-if="this.truncate && tags.length > this.truncate">
        +{{ tags.length - truncate }}
      </span>
    </template>

    <MaterialIconTagOff v-else />



  </div>
</template>

<script>

export default {
  name: 'TagList',

  props: {
    tags: Array,
    truncate: Number,
    removable: Boolean,
    clickable: {
      type: Boolean,
      default: () => true
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
  computed:{
    tag_list(){
      if (this.truncate) return this.tags.slice(0, this.truncate)
      else return this.tags
    }
  }
}
</script>

<style scoped>



.tag_list {
  color: #666666;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25em;
}



</style>
