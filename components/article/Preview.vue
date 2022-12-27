<template>
    <!-- WARNING: links in links cause hydration issues -->
    <NuxtLink :to="{ name: 'articles-id', params: { id: article._id }}" class="articlePreview">
        <h2 class="title">{{ article.title }}</h2>

        <!-- TODO: Thumbnail -->

        <img 
            v-if="article.thumbnail_src"
            class="thumbnail" 
            :src="article.thumbnail_src" 
            :alt="`${article.title} thumbnail`">
        
        <div>
            <Icon name="mdi:calendar-plus" />
            <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
        </div>

        
        <div>
            <Icon name="mdi:calendar-edit" />
            <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
        </div>
        
        <!-- WARNING: Author should not be a link -->
        <div>
            <Icon name="mdi:account"/>
            <Author :author="article.author" :link="false"/>
        </div>

        <template v-if="userIsAuthor">
            <div>
                <Icon name="mdi:eye" />
                <span>{{article.views}}</span>
            </div>
            
            <div v-if="userIsAuthor">
                <Icon :name="article.published? 'mdi:earth' : 'mdi:lock'" />
            </div>
        </template>
        

        <!-- WARNING: if summary contains tags, especially links, causes hydration problems -->
        <!-- <div v-html="article.summary" /> -->
        <div class="summary">{{ article.summary }}</div>

        <!-- WARNING: Ensure tags are not links to prevent hydration problems -->
        <TagList 
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
.summary {
    white-space: pre-line;
}

.thumbnail {
    max-width: 5em;
}
</style>