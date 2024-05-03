<template>
  <article v-if="article" itemscope itemtype="http://schema.org/Article">
    <ArticleSeo :article="article" />

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

  <!-- TODO: Improve error display -->
  <div v-if="error" class="error">
    <span v-if="error.statusCode === 404">Article not found</span>
    <span v-else>Failed to query article</span>
  </div>

  <!-- Modal to zoom on images -->
  <Modal v-model="modalOpen" ref="modal">
    <img :src="modalImageSrc" alt="" class="modal_image" />
  </Modal>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"
import { toHtml } from "hast-util-to-html"

definePageMeta({
  middleware: ["auth"],
})

const route = useRoute()
const runtimeConfig = useRuntimeConfig()
const user = useUser()

const userIsAuthor = computed(
  () => article.value?.author._id === user.value?._id
)

const modal = ref()
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
    // Language is provided as a class of pre
    const tree = lowlight.highlightAuto(code.innerText)
    const html = toHtml(tree)
    if (!html) return
    code.innerHTML = html
  })
}
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
