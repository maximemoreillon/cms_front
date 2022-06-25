<template>
  <!-- TODO: Consider a grid layout -->
  <div class="article_metadata">

    <div class="metadata_wrapper">
      <!-- Author -->
      <div class="metadata_element" title="Author">
        <MaterialIconAccount class="metadata_icon" />
        <Author v-bind:author="article.author" />
      </div>
      <!-- Creation date -->
      <div class="metadata_element" title="Created" v-if="article.authorship.creation_date">
        <MaterialIconCalendar class="metadata_icon" />
        <span>{{format_date(article.authorship.creation_date)}}</span>
      </div>
      <!-- Last edited date -->
      <div class="metadata_element" title="last edited" v-if="article.authorship.edition_date">
        <MaterialIconCalendarEdit class="metadata_icon" />
        <span>{{format_date(article.authorship.edition_date)}}</span>
      </div>

      <!-- View count -->
      <div class="metadata_element" title="Views" v-if="article.views">
        <MaterialIconEye class="metadata_icon" />
        <span>{{article.views}}</span>
      </div>

      <!-- Published indicator -->
      <template v-if="user_is_author">
        <div class="metadata_element" title="Published" v-if="article.published">
          <MaterialIconEarth class="metadata_icon" />
          <span>Published</span>
        </div>

        <div class="metadata_element" title="Private" v-if="!article.published">
          <MaterialIconLock class="metadata_icon" />
          <span>Private</span>
        </div>

        <div class="spacer"></div>

        <button @click="delete_article()">
          <MaterialIconDelete class="metadata_icon" />
          <span>Delete</span>
        </button>

        <!-- Link to editor -->
        <router-link :to="{ name: 'articles-id-edit', params: { id: article._id } }"
          class="metadata_element edit_button button">
          <MaterialIconPencil class="metadata_icon" />
          <span>Edit</span>
        </router-link>
      </template>
    </div>


    <TagList class="metadata_element" :tags="article.tags"/>



    <!-- <div class="metadata_element tags_wrapper" v-if="article.tags.length">

      <MaterialIconTag class="metadata_icon" />

      <div class="tags_container">
        <Tag class="tag" v-for="(tag, index) in article.tags" v-bind:key="`tag_${index}`" v-bind:tag="tag" />
      </div>


    </div> -->



  </div>
</template>

<script>

import Author from './Author.vue'

import TagList from './TagList.vue'

export default {
  name: 'ArticleMetadata',
  props: {
    article: Object,
  },
  components: {
    Author,
    TagList,
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
  gap: 1em 1em;
}


.metadata_element {
  display: flex;
  align-items: center;
}


.metadata_icon {
  margin-right: 0.25em;
}


</style>
