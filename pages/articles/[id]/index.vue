<template>
  <article v-if="article" itemscope itemtype="http://schema.org/Article">
    <!-- Meta tags for SEO -->
    <!-- TODO: delimiter for date -->
    <meta itemprop="publisher" content="Maxime Moreillon" />
    <meta itemprop="image" content="/logo.png" />
    <meta
      itemprop="datePublished"
      :content="formatNeo4jDate(article.authorship.creation_date)"
    />
    <meta
      itemprop="dateModified"
      :content="formatNeo4jDate(article.authorship.edition_date)"
    />

    <h1 class="title">{{ article.title }}</h1>
    <section>
      <ArticleMetadata :article="article" link />
    </section>

    <section>
      <TagList
        v-if="article.tags.length"
        class="tags"
        v-model="article.tags"
        :link="true"
        :input="false"
        :truncate="0"
        :removable="false"
      />
    </section>

    <!-- Ref used for applying image modals and code highlighting -->
    <div class="content" v-html="article.content" ref="articleContent" />
    <!-- WARNING: Using TipTap as content renderer might be bad for SEO -->
    <!-- <ArticleContent :content="article.content" /> -->

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

import css from "highlight.js/lib/languages/css"
import js from "highlight.js/lib/languages/javascript"
import ts from "highlight.js/lib/languages/typescript"
import html from "highlight.js/lib/languages/xml"

lowlight.registerLanguage("html", html)
lowlight.registerLanguage("css", css)
lowlight.registerLanguage("js", js)
lowlight.registerLanguage("ts", ts)

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
  codeBlockSyntaxHightlight()
})

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

const codeBlockSyntaxHightlight = () => {
  // DOES NOT WORK IN PRODUCTION
  articleContent.value?.querySelectorAll("pre").forEach((pre: HTMLElement) => {
    const code = pre.querySelector("code")
    if (!code) return

    // TODO: use language that is provided if any
    const tree = lowlight.highlightAuto(code.innerText)
    const html = toHtml(tree)
    if (!html) return
    code.innerHTML = html
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
    // { name: "og:url", content: `${article.value?.title} thumbnail` },
    { name: "og:type", content: "article" },
    { name: "og:locale", content: "en_US" },
  ],
})
</script>

<style scoped>
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

.content:deep() h1 {
  /* hide h1 of article.content, show article.title as h1 instead */
  display: none;
}

.content:deep() img {
  cursor: pointer;
}
</style>
