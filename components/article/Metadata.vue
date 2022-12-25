<template>
    <div>

        <div>
            <Icon name="mdi:calendar" />
            <span>{{ formatNeo4jDate(article.authorship.creation_date) }}</span>
        </div>

        <div class="tags_container">
            <Icon name="mdi:account" />
            <Author :author="article.author" />
        </div>

        <div class="tags_container">
            <Icon name="mdi:tag" />
            <Tag v-for="tag in article.tags" :key="tag._id" :tag="tag" />
        </div>

    </div>
</template>

<script lang="ts" setup>
import type Article from '~~/types/Article'


defineProps<{
    article: Article
}>()

</script>