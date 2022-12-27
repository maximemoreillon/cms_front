<template>
    <!-- WARNING: links in links cause hydration issues -->
    <NuxtLink :to="{ name: 'articles-id', params: { id: article._id }}" class="articlePreview">
        <h3 class="title">{{ article.title }}</h3>

        <!-- TODO: Thumbnail -->
        
        <div>
            <Icon name="mdi:calendar-plus" />
            <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
        </div>

        
        <div>
            <Icon name="mdi:calendar-edit" />
            <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
        </div>
        
        <!-- WARNING: Author can be a link -->
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
        

        <!-- PROBLEM: if summary contains tags, especially links, causes hydration problems -->
        <!-- <p v-html="article.summary" /> -->
        <!-- TOOD: respect white spaces -->
        <div class="summary">{{ article.summary }}</div>

        <!-- WARNING: Tags can be links -->
        <div class="tags">
            <Icon :name="article.tags.length ? 'mdi:tag' : 'mdi:tag-off'" />
            <!-- TODO: use TagList component -->
            <Tag v-for="tag in article.tags" :key="tag._id" :tag="tag" :link="false"/>
        </div>
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

<style>
.summary {
    white-space: pre-line;
}
</style>