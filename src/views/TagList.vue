<template>
  <div class="tag_list">

    <h1>Tags</h1>

    <Toolbar >

      <span class="article_counter">
        {{tags.length}} Tags
      </span>

      <div class="growing_spacer"/>


        <!-- search -->
        <input
          type="search"
          class="search_bar"
          v-model="filter">

        <magnify-icon/>


    </Toolbar>

    <div
      class="loader_container"
      v-if="loading">
      <Loader />
    </div>

    <div class="tag_container">
      <Tag
        v-for="(tag, index) in filtered_tags"
        :key="`tag_${index}`"
        :tag="tag"/>
    </div>


  </div>
</template>

<script>

import Loader from '@moreillon/vue_loader'

import Tag from '@/components/Tag.vue'
import Toolbar from '@/components/Toolbar.vue'


export default {
  components: {
    Loader,
    Tag,
    Toolbar
  },
  data () {
    return {
      tags: [],
      loading: false,
      error: null,
      filter: '',

    }
  },

  mounted() {
    this.get_tags()

  },


  methods: {

    get_tags(){

      this.loading = true

      const url = `${process.env.VUE_APP_CMS_API_URL}/v3/tags`

      this.axios.get(url)
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


  },
  computed: {
    filtered_tags(){
      if(this.filter === '') return this.tags
      return this.tags.filter(t => t.name.toLowerCase().includes(this.filter.toLowerCase()))
    }

  }



}
</script>


<style scoped>

.tag_container{
  display: flex;
  flex-wrap: wrap;
}

.tag_container > * {
  margin-bottom: 1em;
}


</style>
