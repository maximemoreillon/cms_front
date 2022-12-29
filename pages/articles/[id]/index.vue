<template>
  <article v-if="article">
    <h1 class="title">{{ article.title }}</h1>

    <ArticleMetadata :article="article" link />

    <TagList
      class="tags"
      v-model="article.tags"
      :link="true"
      :input="false"
      :truncate="5"
      :removable="false"
    />

    <!-- TODO: find where to put this button -->
    <NuxtLink
      v-if="userIsAuthor"
      class="edit_button button"
      :to="`/articles/${route.params.id}/edit`"
    >
      <Icon name="mdi:pencil" />
      <span>Edit</span>
    </NuxtLink>

    <!-- Ref used for applying image modals and code highlighting -->
    <div class="content" v-html="article?.content" ref="articleContent" />
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
  // applyCodeStyling()
})

const applyCodeStyling = () => {
  // Replaces characters in a weird way, e.g. &lt
  // probably because parent of <code> is <pre>

  articleContent.value
    ?.querySelectorAll("code")
    .forEach((code: HTMLElement) => {
      // TODO: Would be better to get the language from class of <code>
      const tree = lowlight.highlightAuto(code.innerHTML)
      code.innerHTML = toHtml(tree)
      console.log(toHtml(tree))
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

<style style>
article {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.modal_image {
  max-width: 90vw;
  max-height: 90vh;
  object-fit: contain;
}

.content h1 {
  /* hide h1 of article.content, show article.title as h1 instead */
  display: none;
}

.content img {
  max-width: 80%;
}

.metadata {
  margin-top: -1.5rem;
}

.edit_button {
  /* TODO: find better location */
  position: absolute;
  top: 1rem;
  right: 1rem;
}
</style>
