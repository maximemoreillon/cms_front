<template>
  <router-link :to="{ name: 'article_list', query: {author_id} }">
    {{author.display_name}}
  </router-link>
</template>

<script>

import IdUtils from '@/mixins/IdUtils'

export default {
  name: 'Author',
  props: {
    author: Object
  },
  mixins: [
    IdUtils
  ],
  computed: {
    author_id(){
      return this.get_id_of_item(this.author)
    }
  },
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
