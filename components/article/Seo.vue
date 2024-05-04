<template>
  <!-- TODO: delimiter for date -->
  <meta itemprop="publisher" content="Maxime Moreillon" />
  <meta itemprop="image" :content="imageSrc" />
  <meta
    itemprop="datePublished"
    :content="formatNeo4jDate(article.authorship.creation_date)"
  />
  <meta
    itemprop="dateModified"
    :content="formatNeo4jDate(article.authorship.edition_date)"
  />
</template>

<script setup lang="ts">
import type Article from "~~/types/Article"

const props = defineProps<{ article: Article }>()
const runtimeConfig = useRuntimeConfig()

const { _id, title, summary, thumbnail_src } = props.article
const { canonicalUrl } = runtimeConfig.public

const imageSrc = ref(thumbnail_src || `${canonicalUrl}/images/meta_img.png`)

useHead({
  title: title,
  meta: [
    { name: "description", content: summary },

    // OpenGraph
    { name: "og:title", content: title },
    { name: "og:description", content: summary },
    { name: "og:image", content: imageSrc.value },
    { name: "og:url", content: `${canonicalUrl}/articles/${_id}` },
    { name: "og:type", content: "article" },
    { name: "og:locale", content: "en_US" },

    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@m_moreillon" }, // TODO: handle customizable
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: summary },
    { name: "twitter:image", content: imageSrc.value },
    { name: "twitter:image:alt", content: `${title} thumbnail` },
  ],
})
</script>
