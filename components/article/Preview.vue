<template>
    <!-- WARNING: links in links cause hydration issues -->
    <NuxtLink :to="{ name: 'articles-id', params: { id: article._id }}" class="articlePreview">
        <h3>{{ article.title }}</h3>
        
        <div>
            <Icon name="mdi:calendar" />
            <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
        </div>

        
        <div v-if="userIsAuthor">
            <Icon name="mdi:calendar-edit" />
            <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
        </div>
        

        <!-- PROBLEM: Author can be a link -->
        <div>
            <Icon name="mdi:account"/>
            <Author :author="article.author" />
        </div>

        <div v-if="userIsAuthor">
            <Icon name="mdi:eye" />
            <span>{{article.views}}</span>
        </div>

        <!-- PROBLEM: if summary contains links, causes hydration problems -->
        <!-- <p v-html="article.summary" /> -->
        <p>{{ article.summary }}</p>

        <!-- PROBLEM: Tags can be links -->
        <div class="tags_container">
            <Icon name="mdi:tag" />
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

</style>