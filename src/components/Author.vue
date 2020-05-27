<template>
  <span
    class="author"
    v-on:click.stop="author_clicked()">

    <span v-if="author">{{author.properties.username}}</span>
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
      if(!(this.$route.name === target_route_name && this.$route.query.id === this.author.identity.low)){
        this.$router.push({ name: target_route_name, query: { author_id: this.author.identity.low } })
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
}

.author:hover {
  color:  #c00000;
  border-color:  #c00000;
}




</style>
