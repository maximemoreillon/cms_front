<template>
  <!-- The whole preview is a link to the article -->
  <NuxtLink
    class="article_preview"
    :class="{article_with_thumbnail: !!article.thumbnail_src}"
    :to="{ name: 'articles-id', params: {id: article_id} }">

    <h2>{{article.title || 'Untitled article'}}</h2>

    <div class="metadata">
      <!-- date -->
      <div
        class="metadata_item"
        v-if="article.authorship.creation_date">
        <MaterialIconCalendar/>
        <span class="article_date" >
          {{format_date(article.authorship.creation_date)}}
        </span>
      </div>

      <!-- Author -->
      <div
        class="metadata_item"
        v-if="article.author">
        <MaterialIconAccount />
        <span class="author">
          {{article.author.display_name || 'Unnnamed'}}
        </span>
      </div>

      <!-- Publishing status and views only visible to users logged in -->
        <div
          class="metadata_item"
          v-if="article.views">
          <MaterialIconEye />
          <span>
            {{article.views}}
          </span>
        </div>

      <template v-if="$auth.user">
        <div
          class="metadata_item" >
          <MaterialIconEarth v-if="article.published"/>
          <MaterialIconLock v-else />
        </div>
      </template>

    </div>


    <img
      class="thumbnail"
      v-if="article.thumbnail_src"
      :src="article.thumbnail_src"
      alt="">


    <!-- Summary -->
    <div
      class="summary"
      v-html="article.summary || 'No summary available'"/>


    <div class="tags">

      <template v-if="article.tags && article.tags.length">
        <MaterialIconTag />

        <Tag
          :clickable="false"
          v-for="(tag, index) in article.tags.slice(0,max_tags)"
          v-bind:key="`tag_${index}`"
          v-bind:tag="tag"/>

        <span v-if="article.tags.length > max_tags">
          +{{article.tags.length - max_tags}}
        </span>
      </template>

      <MaterialIconTagOff v-else/>



    </div>


  </NuxtLink>

</template>

<script>



import Tag from './Tag.vue'


export default {
  name: 'ArticlePreview',
  props: {
    article: Object
  },
  components: {
    Tag,
  },
  data(){
    return {
      max_tags: 5,
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
  },
  computed:{
    article_id(){
      return this.article._id
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


  line-height: var(--line-height);



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
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5em;
}


.tags > *{
  color: #666666;
}




















</style>
