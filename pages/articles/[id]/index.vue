<template>
  <article v-if="article">
    <h1 class="article_title">{{ article.title }}</h1>

    <ArticleMetadata :article="article" />

    <NuxtLink
      v-if="userIsAuthor"
      class="edit_button"
      :to="`/articles/${route.params.id}/edit`"
    >
      <Icon name="mdi:pencil" />
    </NuxtLink>

    <TagList
      class="article_tags"
      v-model="article.tags"
      :link="true"
      :input="false"
      :truncate="5"
      :removable="false"
    />

    <!-- Ref used for applying image modals and code highlighting -->
    <div
      class="article_content"
      v-html="article?.content"
      ref="articleContent"
    />
  </article>

  <!-- TODO: Error display -->

  <!-- Modal to zoom on images -->
  <Modal v-model="modalOpen">
    <img :src="modalImageSrc" alt="" class="modal_image" />
  </Modal>
</template>

<script lang="ts" setup>
import Article from "~~/types/Article"
import { lowlight } from "lowlight"
import { toHtml } from "hast-util-to-html"

definePageMeta({
  middleware: ["auth"],
})

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const user = userUser()

const userIsAuthor = computed(
  () => article.value?.author._id === user.value?._id
)
const modalOpen = ref(false)
const modalImageSrc = ref("")
const articleContent = ref<HTMLElement>()

const url = `/articles/${route.params.id}`
const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}

// TODO: Error handling
const { data: article, error } = await useFetch<Article>(url, fetchOpts)

onMounted(() => {
  addEventListenerForImageModals()
  applyCodeStyling()
})

const applyCodeStyling = () => {
  // Replaces characters in a weird way, e.g. &lt

  articleContent.value
    ?.querySelectorAll("code")
    .forEach((code: HTMLElement) => {
      // TODO: Would be better to get the language from class of <code>
      const tree = lowlight.highlightAuto(code.innerHTML)
      code.innerHTML = toHtml(tree)
    })
}

const addEventListenerForImageModals = () => {
  articleContent.value?.querySelectorAll("img").forEach((img: HTMLElement) => {
    img.addEventListener(
      "click",
      (event: any) => {
        modalOpen.value = true
        modalImageSrc.value = event.target.src
      },
      false
    )
  })
}

useHead({
  title: article.value?.title,
  meta: [
    { name: "description", content: article.value?.summary },

    // Twitter
    { name: "twitter:card", content: "summary" },
    { name: "twitter:site", content: "@m_moreillon" },
    { name: "twitter:title", content: article.value?.title },
    { name: "twitter:description", content: article.value?.summary },
    { name: "twitter:image", content: article.value?.thumbnail_src },
    { name: "twitter:image:alt", content: `${article.value?.title} thumbnail` },

    // OpenGraph
    { name: "og:title", content: article.value?.title },
    { name: "og:description", content: article.value?.summary },
    { name: "og:image", content: article.value?.thumbnail_src },
    { name: "og:url", content: `${article.value?.title} thumbnail` },
    { name: "og:type", content: "article" },
    { name: "og:locale", content: "en_US" },
  ],
})
</script>

<!-- If scoped, cannot access v-html -->
<style>
.article_content h1 {
  /* h1 of the article content, show article.title as h1 */
  display: none;
}

.article_content img {
  max-width: 80%;
}

.modal_image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

article {
  display: grid;
  grid-template-areas:
    "title title"
    "content content";
}

.article_title {
  grid-area: title;
}

.article_content {
  grid-area: content;
}
</style>
