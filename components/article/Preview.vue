<template>
  <!-- WARNING: links in links cause hydration issues -->
  <NuxtLink
    :to="{ name: 'articles-id', params: { id: article._id } }"
    class="article_preview"
    :class="{ with_thumbnail: !!article.thumbnail_src }"
  >
    <!-- TODO: H2 might not be ideal -->
    <h2 class="title">{{ article.title }}</h2>
    <ArticleMetadata :article="article" :link="false" />

    <div class="thumbnail_summary">
      <!-- TODO: consider wrapper thumbnail in a div because not playing well with flex -->
      <div class="thumbnail_wrapper" v-if="article.thumbnail_src">
        <img
          class="thumbnail"
          :src="article.thumbnail_src"
          :alt="`${article.title} thumbnail`"
        />
      </div>

      <!-- WARNING: if summary contains tags, especially links, causes hydration problems -->
      <!-- <div v-html="article.summary" /> -->
      <!-- TODO: Truncate summary if too long -->
      <div class="summary">
        {{ article.summary || "This article has no summary" }}
      </div>
    </div>

    <!-- WARNING: Ensure tags are not links to prevent hydration problems -->
    <TagList
      v-if="article.tags.length"
      class="tags"
      v-model="article.tags"
      :link="false"
      :input="false"
      :truncate="5"
      :removable="false"
    />
  </NuxtLink>
</template>

<script lang="ts" setup>
defineProps<{ article: Article }>()
</script>

<style scoped>
/* NOTE: Using flex and not grid because some items do not have tags, some items top not have thumbnails */

.article_preview {
  border: 1px solid var(--border-color);
  border-radius: var(--border-radius);
  padding: 1.5rem;

  color: inherit;
  text-decoration: none;

  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  transition: border-color 0.25s;
}

.article_preview:hover {
  border-color: var(--accent-color);
}

.article_preview:hover .title {
  color: var(--accent-color);
}

.title {
  margin: 0;
  transition: color 0.25s;
}

.metadata {
  margin-top: -1rem;
}

.thumbnail_summary {
  display: flex;
  /* WARNING: flex wrap results in constant wrapped state */
  flex-wrap: wrap;
  gap: 1.5rem;
}

.summary {
  flex-basis: 10rem;
  white-space: pre-line;
  flex-grow: 4;

  display: -webkit-box;
  -webkit-line-clamp: 8;
  -webkit-box-orient: vertical;
  overflow-y: hidden;
}

.thumbnail_wrapper {
  flex-basis: 5rem;
  flex-grow: 1;
  flex-shrink: 0;
}

.thumbnail {
  width: 100%;
  max-height: 10rem;
  /* aspect-ratio: 1; */
  display: flex;

  /* TODO: figure out how height works */

  object-fit: cover;
  border-radius: var(--border-radius);
}
</style>
