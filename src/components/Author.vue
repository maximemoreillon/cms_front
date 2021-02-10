<template>
  <span
    class="author"
    v-on:click.stop="author_clicked()">

    <template v-if="author">
      <img
        class="avatar"
        :src="author.properties.avatar_src"
        v-if="author.properties.avatar_src">
      <span>
        {{author.properties.username}}
      </span>
    </template>


    <span v-else>Invalid author</span>

  </span>
</template>

<script>


export default {
  name: 'Author',
  props: {
    author: {
      type: Object
    },
  },
  methods: {
    author_clicked(){
      let target_route_name = 'article_list'
      if(!(this.$route.name === target_route_name && this.$route.query.id === this.author.identity)){
        this.$router.push({ name: target_route_name, query: { author_id: this.author.identity } })
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
