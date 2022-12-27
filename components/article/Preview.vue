<template>
    <!-- WARNING: links in links cause hydration issues -->
    <NuxtLink :to="{ name: 'articles-id', params: { id: article._id }}" class="article_preview">
        <h2 class="title">{{ article.title }}</h2>

        <img 
            v-if="article.thumbnail_src"
            class="thumbnail" 
            :src="article.thumbnail_src" 
            :alt="`${article.title} thumbnail`">

        <div class="metadata">
            <div class="metadata_item">
                <Icon name="mdi:calendar-plus" />
                <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
            </div>
            
            <!-- TODO: consider whether to show the edition date or not -->
            <!-- <div class="metadata_item"> 
                <Icon name="mdi:calendar-edit" />
                <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
            </div> -->
            
            <!-- WARNING: Author should not be a link -->
            <div class="metadata_item">
                <Icon name="mdi:account" />
                <Author :author="article.author" :link="false" />
            </div>
            
            <template v-if="userIsAuthor">
                <div class="metadata_item">
                    <Icon name="mdi:eye" />
                    <span>{{article.views}}</span>
                </div>
            
                <div class="metadata_item">
                    <Icon :name="article.published? 'mdi:earth' : 'mdi:lock'" />
                </div>
            </template>
        </div>
        
        

        <!-- WARNING: if summary contains tags, especially links, causes hydration problems -->
        <!-- <div v-html="article.summary" /> -->
        <div class="summary">{{ article.summary }}</div>

        <!-- WARNING: Ensure tags are not links to prevent hydration problems -->
        <TagList 
            class="tags"
            v-model="article.tags" 
            :link="false" 
            :input="false" 
            :truncate="5" 
            :removable="false"/>
    </NuxtLink>
</template>

<script lang="ts" setup>

import type Article from '~~/types/Article'

const props = defineProps<{
    article: Article
}>()

const user = userUser()
const userIsAuthor = computed(() => props.article?.author._id === user.value?._id)



</script>

<style scoped>
.article_preview {
    border: 1px solid #dddddd;
    border-radius: 0.5rem;
    padding: 1.5rem;

    color: initial;
    text-decoration: none;

    display: grid;
    gap: 1.5rem;
    /* TODO: deal with articles without thumbnails */
    grid-template-areas: 
        'title title'
        'metadata metadata'
        'thumbnail summary'
        'tags tags';
}

.title {
    grid-area: title;
    margin: 0;
}

.summary {
    grid-area: summary;
    white-space: pre-line;
}

.thumbnail {
    grid-area: thumbnail;
    max-width: 5rem;
}

.tags {
    grid-area: tags;
}

.metadata {
    grid-area: metadata;
    display: flex;
    align-items: center;
    gap: 1rem;
}

.metadata_item {
    display: flex;
    align-items: center;
    gap: 0.25rem
}
</style>