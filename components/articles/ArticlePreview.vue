<template>
    <!-- WARNING: links in links cause hydration issues -->
    <NuxtLink :to="{ name: 'articles-id', params: { id: article._id }}" class="articlePreview">
        <h3>{{ article.title }}</h3>
        
        <div>
            <Icon name="mdi:calendar" />
            <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
        </div>

        <div>
            <Icon name="mdi:calendar-edit" />
            <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
        </div>

        <!-- PROBLEM: Author can be a link -->
        <div>
            <Icon name="mdi:account"/>
            <Author :author="article.author" />
        </div>

        <!-- PROBLEM: if summary contains links, causes hydration problems -->
        <!-- <p v-html="article.summary" /> -->
        <p>{{ article.summary }}</p>

        <!-- PROBLEM: Tags can be links -->
        <div class="tags_container">
            <Icon name="mdi:tag" />
            <Tag v-for="tag in article.tags" :key="tag._id" :tag="tag" />
        </div>
    </NuxtLink>
</template>

<script lang="ts" setup>

import type Article from '~~/types/Article'
import Tag from '~~/components/Tag.vue';
import Author from '~~/components/Author.vue';
import { formatNeo4jDate } from '~~/utils'

defineProps<{
    article: Article
}>()




</script>

<style>
.articlePreview {
    border: 1px solid #dddddd;
    display: grid;
}
</style>