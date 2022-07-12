<template>
  <!-- TODO: Consider a grid layout -->
  <div class="article_metadata">
    <div v-if="user_is_author" class="metadata_wrapper">
      <!-- Published indicator -->
      <div class="metadata_element">
        <template v-if="article.published">
          <MaterialIconEarth v-if="article.published" />
          <span>Published</span>
        </template>
        <template v-else>
          <MaterialIconLock />
          <span>Private</span>
        </template>
      </div>

      <!-- View count -->
      <div v-if="article.views" class="metadata_element" title="Views">
        <MaterialIconEye />
        <span>{{ article.views }}</span>
      </div>

      <div class="spacer" />

      <!-- Delete -->
      <button class="outlined" @click="delete_article()">
        <MaterialIconDelete />
        <span>Delete</span>
      </button>

      <!-- Link to editor -->
      <router-link
        :to="{ name: 'articles-id-edit', params: { id: article._id } }"
        class="metadata_element edit_button button outlined"
      >
        <MaterialIconPencil class="metadata_icon" />
        <span>Edit</span>
      </router-link>
    </div>

    <div class="metadata_wrapper">
      <!-- Author -->
      <div class="metadata_element" title="Author">
        <MaterialIconAccount class="metadata_icon" />
        <Author :author="article.author" />
      </div>

      <!-- Creation date -->
      <div v-if="article.authorship.creation_date" class="metadata_element" title="Created">
        <MaterialIconCalendar />
        <span>{{ format_date(article.authorship.creation_date) }}</span>
      </div>
      <!-- Last edited date -->
      <div v-if="article.authorship.edition_date" class="metadata_element" title="last edited">
        <MaterialIconCalendarEdit />
        <span>{{ format_date(article.authorship.edition_date) }}</span>
      </div>
    </div>

    <div class="metadata_wrapper">
      <TagList class="metadata_element" :tags="article.tags" />
    </div>
  </div>
</template>

<script>

import Author from './Author.vue'

import TagList from './TagList.vue'

export default {
  name: 'ArticleMetadata',
  components: {
    Author,
    TagList,
  },
  props: {
    article: Object,
  },
  computed: {
    user_is_author(){
      const current_user = this.$auth.user
      if(!current_user) return false
      const current_user_id = current_user._id
      const author_id = this.article.author._id

      return current_user_id === author_id
    },
    article_id(){
      return this.$route.params.id
    }

  },
  methods: {
    format_date({day,month,year}){
      // Dates are Neo4J formatted
      // i.e. {day, month, year}
      return [
        year,
        month.toString().padStart(2,'0'),
        day.toString().padStart(2,'0'),
      ].join('/');
    },
    async delete_article() {
      if(!confirm(`Delete article?`)) return
      const url = `${this.$config.apiUrl}/v1/articles/${this.article_id}`


      try {
        await this.$axios.delete(url)
        this.$router.push({ name: 'index' })
      } 
      catch (error) {
        if (error.response) alert(error.response.data)
        else alert(error)
      }


    },
  }
}
</script>

<style scoped>

.article_metadata {
  margin-top: -1em;
  font-size: 85%;
  color: #666666;
  display: flex;
  flex-direction: column;
  gap: 1em;
}

.metadata_wrapper {

  display: flex;
  flex-wrap: wrap;
  align-items: baseline;
  gap: 1em;
}


.metadata_element {
  display: flex;
  align-items: center;
  gap: 0.25em;
}




</style>
