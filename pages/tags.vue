<template>
  <div class="tag_list">
    <h1>Tags</h1>
    <client-only>

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
        class="loader_container" >
        <Loader />
      </div>

      <!-- <div class="tag_container">
        <Tag
          v-for="(tag, index) in filtered_tags"
          :key="`tag_${index}`"
          :tag="tag"
        />
      </div> -->

      <table v-if="!loading && filtered_tags.length">
        <tr>
          <th>
            <MaterialIconTag />
          </th>
          <th>
            <MaterialIconFileDocumentOutline />
          </th>
          <th>
            <MaterialIconPencil />
          </th>
        </tr>
        <tr v-for="(tag, index) in filtered_tags"
          :key="`tag_${index}`">
          <td>
            <Tag :key="`tag_${index}`" :tag="tag" />
          </td>
          <td>
            0
          </td>
          <td v-if="user_is_admin">
            <TagMangement v-model="filtered_tags[index]" />
          </td>
        </tr>
      </table>
    </client-only>

  </div>
</template>

<script>

import Loader from '@/components/Loader'

import Tag from '@/components/Tag.vue'
import TagMangement from '@/components/TagManagement.vue' 

import userUtils from '@/mixins/userUtils'

export default {
  name: 'Tags',
  modules: [
    '@nuxtjs/axios',
  ],
  components: {
    Tag,
    Loader,
    TagMangement
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
  mixins: [
    userUtils
  ],
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

      this.$axios.get('/tags')
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


table {
  border-collapse: collapse;
  text-align: center;
  margin: 0 auto;
}

tr:first-child {
  border-bottom: 1px solid #dddddd;
}

td {
  padding: 0.25em 1em;
}

</style>
