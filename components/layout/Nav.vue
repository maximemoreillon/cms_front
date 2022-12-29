<template>
  <nav>
    <NuxtLink to="/">
      <!-- TODO: find icon -->
      <Icon name="mdi:file-document-outline" />
      <span>Articles</span>
    </NuxtLink>

    <!-- TODO: Articles of user -->

    <!-- <NuxtLink to="/tags">
      <Icon name="mdi:tag-multiple" />
      <span>Tags</span>
    </NuxtLink> -->

    <NuxtLink
      v-for="tag in pinnedTags"
      :key="tag._id"
      :to="`/?tag_id=${tag._id}`"
    >
      <Icon name="mdi:tag" />
      <span>{{ tag.name }}</span>
    </NuxtLink>

    <!-- <NuxtLink to="/authors">
      <Icon name="mdi:account" />
      <span>Auhtors</span>
    </NuxtLink> -->

    <NuxtLink v-if="user" to="/logout">
      <Icon name="mdi:logout" />
      <span>Logout</span>
    </NuxtLink>
    <NuxtLink v-else to="/login">
      <Icon name="mdi:login" />
      <span>Login</span>
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
import type Tag from "~~/types/Tag"

const user = userUser()
const runtimeConfig = useRuntimeConfig()

const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
}
const { data: pinnedTags, error } = await useFetch<Tag[]>(
  `tags?pinned=true`,
  fetchOpts
)
</script>

<style scoped>
nav a {
  padding: 0.5em 1em;
  text-decoration: none;
  color: var(--nav-color);
  display: flex;
  align-items: stretch;
  gap: 1em;
  border-right: 3px solid transparent;
  transition: border-color 0.25s;
}

/* Ellipsis on nav items that are too long */
nav a span {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

nav a:hover {
  border-right-color: #666666;
}

nav a.router-link-exact-active {
  border-right-color: var(--accent-color);
}
</style>
