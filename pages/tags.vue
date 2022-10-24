<template>
  <div class="tag_list">
    <h1>Tags</h1>
    <client-only>

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
          <th class="tag_column_header">
            <div class="counter">
              <MaterialIconTag />
            </div>
            <div class="tag_search_wrapper">
              <input v-model="filter" type="search" class="search_bar" placeholder="Search tags">
              <MaterialIconMagnify />
            </div>
            
          </th>
          <th>
            <MaterialIconFileDocumentMultipleOutline />
          </th>
          <th v-if="user_is_admin">
            <MaterialIconPencil />
          </th>
        </tr>
        <tr v-for="(tag, index) in filtered_tags"
          :key="`tag_${index}`">
          <td>
            <Tag :key="`tag_${index}`" :tag="tag" />
          </td>
          <td>
            {{tag.article_count}}
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
      const sorted_tags = this.tags.slice().sort((a, b) => b.article_count - a.article_count)


      if (this.filter === '') return sorted_tags
      return sorted_tags
        .filter(t => t.name.toLowerCase().includes(this.filter.toLowerCase()))
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
table {
  width: 100%;
  border-collapse: collapse;
  margin: 0 auto;
}

tr:first-child {
  border-bottom: 1px solid #dddddd;
}

th {
  text-align: left;
}

td, th{
  padding: 0.25em;
}

.tag_column_header {
  display: flex;
  flex-wrap: wrap;
  gap: 1em;
}

.tag_search_wrapper {
  display: flex;
  gap: 0.5em;
}
</style>
