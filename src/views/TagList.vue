<template>
  <div class="tag_list">

    <h1>Tags</h1>

    <div
      class="loader_container"
      v-if="loading">
      <Loader />
    </div>

    <div class="tag_container">
      <Tag
        v-for="tag in tags"
        :key="tag.identity"
        :tag="tag"/>
    </div>


  </div>
</template>

<script>

import Loader from '@moreillon/vue_loader'

import Tag from '@/components/Tag.vue'


export default {
  components: {
    Loader,
    Tag
  },
  data () {
    return {
      tags: [],
      loading: false,
      error: null,

    }
  },

  mounted() {
    this.get_tags()

  },


  methods: {

    get_tags(){

      this.loading = true

      const url = `${process.env.VUE_APP_CMS_API_URL}/v2/tags`

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
    user_is_admin(){
      if(!this.$store.state.current_user) return false
      return this.$store.state.current_user.properties.isAdmin
    },
    load_more_possible(){
      return !this.articles_loading && !this.articles_all_loaded && !this.loading_error
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
  margin-top: 1em;
}


</style>
