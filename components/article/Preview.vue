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
      <img
        v-if="article.thumbnail_src"
        class="thumbnail"
        :src="article.thumbnail_src"
        :alt="`${article.title} thumbnail`"
      />

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
import type Article from "~~/types/Article"
defineProps<{ article: Article }>()
</script>

<style scoped>
/* NOTE: Using flex and not grid because some items do not have tags, some items top not have thumbnails */

.article_preview {
  border: 1px solid #dddddd;
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
  gap: 2rem;
}

.summary {
  white-space: pre-line;
  flex-grow: 1;
}

.thumbnail {
  width: 10rem;
  height: 10rem;
  object-fit: cover;
  border-radius: var(--border-radius);
}
</style>
