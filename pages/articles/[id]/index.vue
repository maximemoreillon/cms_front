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

    <!-- Ref used for applying image modals and code highlighting -->
    <div class="content" v-html="article?.content" ref="articleContent" />

    <!-- Edit button -->
    <!-- TODO: Consider in metadata -->
    <NuxtLink
      v-if="userIsAuthor"
      class="fab"
      :to="`/articles/${route.params.id}/edit`"
    >
      <Icon name="mdi:file-document-edit" />
    </NuxtLink>
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
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

h1 {
  /* <article> h1 have a different style than normal h1 */
  font-size: 2em;
}

.modal_image {
  border-radius: var(--border-radius);
  max-width: 100%;
  max-height: 90vh;
  object-fit: contain;
  display: flex;
}

.content h1 {
  /* hide h1 of article.content, show article.title as h1 instead */
  display: none;
}
</style>
