<template>
  <span
    class="author"
    v-on:click.stop="author_clicked()">

    <template v-if="author">
      <img
        class="avatar"
        :src="author.avatar_src"
        v-if="author.avatar_src">
      <span>
        {{author.username}}
      </span>
    </template>


    <span v-else>Invalid author</span>

  </span>
</template>

<script>

import IdUtils from '@/mixins/IdUtils'

export default {
  name: 'Author',
  props: {
    author: {
      type: Object
    },
  },
  mixins: [
    IdUtils
  ],
  methods: {
    author_clicked(){
      let target_route_name = 'article_list'
      const author_id = this.get_id_of_item(this.author)

      if(!(this.$route.name === target_route_name && this.$route.query.id === author_id)){
        this.$router.push({ name: target_route_name, query: { author_id } })
      }
    }
  },
}
</script>

<style scoped>


.author {
  font-weight: bold;
  cursor: pointer;
  transition: color 0.25s, border-color 0.25s;
  display: inline-flex;
  align-items: center;
}

.author:hover {
  color:  #c00000;
  border-color:  #c00000;
}

img {
  height: 1em;
  width: 1em;
  margin-right: 0.25em;
}



</style>
