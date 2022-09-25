<template>
  <router-link
    class="author"
    :to="{ name: 'index', query: {author_id} }" >
    {{ author.display_name }}
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







</style>
