<template>
  <router-link
    :to="{ name: 'index', query: {author_id} }">
    {{author.display_name}}
  </router-link>
</template>

<script>

export default {
  name: 'Author',
  props: {
    author: Object
  },

  computed: {
    author_id(){
      return this.author._id
    }
  },
  methods: {
    author_clicked(){
      const target_route_name = 'index'

      if(!(this.$route.name === target_route_name && this.$route.query.id === this.author_id)){
        this.$router.push({ name: target_route_name, query: { author_id: this.author_id } })
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
