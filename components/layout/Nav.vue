<template>
  <nav>
    <NuxtLink to="/">
      <!-- TODO: find icon -->
      <Icon name="mdi:file-document-multiple-outline" />
      <span>Articles</span>
    </NuxtLink>

    <!-- TODO: Articles of user -->

    <NuxtLink to="/tags">
      <Icon name="mdi:tag-multiple" />
      <span>Tags</span>
    </NuxtLink>

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

    <NuxtLink to="/login">
      <template v-if="user">
        <Icon name="mdi:logout" />
        <span>Logout</span>
      </template>
      <template v-else>
        <Icon name="mdi:login" />
        <span>Login</span>
      </template>
    </NuxtLink>
  </nav>
</template>

<script lang="ts" setup>
import type Tag from "~~/types/Tag"

const user = useUser()
const pinnedTags = usePinnedTags()
const runtimeConfig = useRuntimeConfig()

const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
}

// TODO: use store instead
const url = `/tags?pinned=true`
const { data, error } = await useFetch<Tag[]>(url, fetchOpts)
pinnedTags.value = data.value
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

nav a svg {
  flex-shrink: 0;
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

/* TODO: Selector does not work with query search params */
/* nav a.router-link-exact-active {
  border-right-color: var(--accent-color);
} */
</style>
