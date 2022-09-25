<template>
  <div class="tag_list">
    <h1>Tags</h1>

    <div class="toolbar">
      <!-- Class should have a better name -->
      <div class="counter">
        <MaterialIconTag />
        <span>{{ tags.length }}</span>
      </div>

      <div class="spacer" />


      <!-- search -->
      <input
        v-model="filter"
        type="search"
        class="search_bar"
        placeholder="Search tags" >

      <MaterialIconMagnify />
    </div>

    <div
      v-if="loading"
      class="loader_container"
    >
      <Loader />
    </div>

    <div class="tag_container">
      <Tag
        v-for="(tag, index) in filtered_tags"
        :key="`tag_${index}`"
        :tag="tag"
      />
    </div>
  </div>
</template>

<script>

import Loader from '@/components/Loader'

import Tag from '@/components/Tag.vue'


export default {
  name: 'Tags',
  modules: [
    '@nuxtjs/axios',
  ],
  components: {
    Tag,
    Loader,
  },
  auth: false,
  data () {
    return {
      tags: [],
      loading: false,
      error: null,
      filter: '',

    }
  },
  computed: {
    filtered_tags(){
      if(this.filter === '') return this.tags
      return this.tags.filter(t => t.name.toLowerCase().includes(this.filter.toLowerCase()))
    }

  },

  mounted() {
    this.get_tags()

  },


  methods: {

    get_tags(){

      this.loading = true

      const url = `${this.$config.apiUrl}/v1/tags`

      this.$axios.get(url)
      .then( ({data}) => {
        this.tags = data
      })
      .catch(error => {
        this.loading_error = true
        if(error.response) console.error(error.response.data)
        else console.error(error)
      })
      .finally(() => { this.loading = false })

    },


  }



}
</script>


<style scoped>

.tag_container{
  margin-top: 1em;
  display: flex;
  flex-wrap: wrap;
  gap: 0.5em;
}


</style>
