<template>
  <!-- v-if not really nice -->
  <template v-if="article">
    <div class="article_creation_date">
      <Icon name="mdi:calendar-plus" />
      <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
    </div>

    <div class="article_edition_date">
      <Icon name="mdi:calendar-edit" />
      <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
    </div>

    <div class="article_author">
      <Icon name="mdi:account" />
      <Author :author="article.author" :link="true" />
    </div>

    <template v-if="userIsAuthor">
      <div class="article_views">
        <Icon name="mdi:eye" />
        <span>{{ article.views }}</span>
      </div>

      <div v-if="userIsAuthor">
        <Icon :name="article.published ? 'mdi:earth' : 'mdi:lock'" />
      </div>
    </template>
  </template>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article";

const props = defineProps<{
  article: Article | null;
}>();

const user = userUser();
const userIsAuthor = computed(
  () => props.article?.author._id === user.value?._id
);
</script>

<style scoped>
.article_metadata {
  display: flex;
  gap: 0.5em;
  align-items: center;
}
</style>
