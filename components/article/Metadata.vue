<template>
    <!-- v-if not really nice -->
    <div v-if="article" class="article_metadat">

        <div class="creation_date">
            <Icon name="mdi:calendar-plus" />
            <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
        </div>

        <div class="edition_date">
            <Icon name="mdi:calendar-edit" />
            <span>{{ formatNeo4jDate(article.authorship.edition_date) }}</span>
        </div>

        <div class="tags_container">
            <Icon name="mdi:account" />
            <Author :author="article.author" :link="true" />
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

        

        <div class="tags_container">
            <Icon :name="article.tags.length ? 'mdi:tag' : 'mdi:tag-off'" />
            <Tag v-for="tag in article.tags" :key="tag._id" :tag="tag" link/>
        </div>
    </div>
</template>

<script lang="ts" setup>
import type Article from '~~/types/Article'

const props = defineProps<{
    article: Article | null
}>()

const user = userUser()
const userIsAuthor = computed(() => props.article?.author._id === user.value?._id)

</script>

<style scoped>

</style>