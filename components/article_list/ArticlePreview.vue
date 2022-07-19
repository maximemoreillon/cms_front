<template>
  <!-- The whole preview is a link to the article -->
  <NuxtLink class="article_preview" :class="{article_with_thumbnail: !!article.thumbnail_src}"
    :to="{ name: 'articles-id', params: {id: article_id} }">
    <h2>{{ article.title || 'Untitled article' }}</h2>

    <div class="metadata">
      <!-- date -->
      <div v-if="article.authorship.creation_date" class="metadata_item">
        <MaterialIconCalendar />
        <span class="article_date">
          {{ format_date(article.authorship.creation_date) }}
        </span>
      </div>

      <!-- Author -->
      <div v-if="article.author" class="metadata_item">
        <MaterialIconAccount />
        <span class="author">
          {{ article.author.display_name || 'Unnnamed' }}
        </span>
      </div>



      <!-- Publishing status and views only visible to users logged in -->
      <template v-if="$auth.user">
        <div v-if="article.views" class="metadata_item">
          <MaterialIconEye />
          <span>
            {{ article.views }}
          </span>
        </div>
        <div class="metadata_item">
          <MaterialIconEarth v-if="article.published" />
          <MaterialIconLock v-else />
        </div>
      </template>
    </div>


    <img v-if="article.thumbnail_src" class="thumbnail" :src="article.thumbnail_src" alt="">


    <div class="summary article_content">
      {{ article_summary_cleanedup }}
    </div>


    <TagList class="tags" :tags="article.tags" :truncate="5" :clickable="false" />
  </NuxtLink>
</template>

<script>



import TagList from '~/components/TagList.vue'


export default {
  name: 'ArticlePreview',
  components: {
    TagList,
  },
  props: {
    article: Object
  },
  data(){
    return {
      max_tags: 5,
    }
  },
  computed:{
    article_id(){
      return this.article._id
    },
    article_summary_cleanedup(){
      if (!this.article.summary) return 'No summary available'
      return this.article.summary.replace(/<\/?[^>]+(>|$)/g, "")
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
    }
  }

}
</script>

<style scoped>

.article_preview {

  /* Relative for shadow */
  position: relative;

  text-decoration: none;

  color: currentColor;
  font-weight: normal;

  cursor: pointer;

  border: 1px solid #dddddd;
  transition: border-color 0.25s;
  padding: 1em;



  display: grid;
  grid-template-areas:
    'title'
    'metadata'
    'summary'
    'tags';


  /* WARNING: Missing tags will create a gap */

  grid-template-rows: repeat(auto,4);
  grid-gap: 1em;

}



.article_with_thumbnail {
  /* Special layout if the article has a thumbnail */
  grid-template-columns: 3fr 5fr;
  grid-template-areas:
    'title title'
    'metadata metadata'
    'thumbnail summary'
    'tags tags';

}



.article_preview:hover {
  border-color: #c00000;
}


h2 {
  grid-area: title;
  margin: 0;
}

.metadata {
  grid-area: metadata;
  /* Bring metadata closer to title */
  margin-top: -0.75em;
  display: flex;
  align-items: center;
  gap: 1em;
  font-size: 75%;
  color: #666666;
}

.metadata > div {
  display: flex;
  align-items: center;
  gap: 0.25em;
}


.thumbnail {
  grid-area: thumbnail;

  /* Span the whole available surface */
  /* NOTE: Does not work with max-width and max-height */
  width: 100%;
  height: 100%;
  max-height: 10em;
  object-fit: cover;
}


.summary {
  grid-area: summary;

  /* Height is set using grid so height 100% here allows working overflows */
  max-height: 10em;
  overflow-y: hidden;

  /* Position relative for shadow below */
  position: relative;

}

.summary::before {
  /* Shadow to show there is more content available */
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 25%;
  z-index: 1;

  /* PROBLEM: What if background is not white? */
  background-image: linear-gradient(to top, rgba(255,255,255, 1), rgba(255,255,255, 0));
  background-position: 100% 0;
  background-size: 100% 100%;
}


.tags {
  grid-area: tags;
}





















</style>
