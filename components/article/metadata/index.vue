<template>
  <!-- v-if not really nice -->
  <div class="metadata" v-if="article">
    <div class="creation_date metadatum">
      <Icon name="mdi:calendar" />
      <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
    </div>

    <div class="edition_date metadatum" v-if="userIsAuthor">
      <Icon name="mdi:calendar-edit" />
      <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
    </div>

    <div class="author metadatum">
      <Icon name="mdi:account" />
      <Author :author="article.author" :link="link" />
    </div>

    <template v-if="userIsAuthor">
      <div class="views metadatum">
        <Icon name="mdi:eye" />
        <span>{{ article.views }}</span>
      </div>

      <div v-if="userIsAuthor" class="metadatum">
        <Icon :name="article.published ? 'mdi:earth' : 'mdi:lock'" />
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"

const props = defineProps<{
  article: Article | null
  link: boolean
}>()

const user = useUser()
const userIsAuthor = computed(
  () => props.article?.author._id === user.value?._id
)
</script>

<style scoped>
.metadata {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 1rem;
  font-size: 80%;
  color: var(--text-light-color);
}
.metadatum {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
~/types/article
