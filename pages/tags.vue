<template>
  <h1>Tags</h1>

  <!-- TODO: Search -->

  <section class="search_wrapper">
    <input
      type="text"
      class="text_input"
      placeholder="Search"
      v-model="search"
    />
    <Icon name="mdi:magnify" />
  </section>

  <section>
    <table>
      <tbody>
        <tr v-for="tag in sortedTags" :key="tag._id">
          <td>
            <Tag :tag="tag" :link="true" :removable="false" />
          </td>
          <td>
            <Icon name="mdi:file-document-multiple-outline" />
            {{ tag.article_count }}
          </td>
          <td>
            <template v-if="user?.isAdmin">
              <TagEdit :tag="tag" @update="refresh()" />
            </template>
            <Icon v-else-if="tag.navigation_item" name="mdi:pin" />
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</template>

<script lang="ts" setup>
import type Tag from "~~/types/Tag"

definePageMeta({
  middleware: ["auth"],
})

const runtimeConfig = useRuntimeConfig()
const user = useUser()
const search = ref("")
const url = `/tags`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: tags, error, refresh } = await useFetch<Tag[]>(url, fetchOpts)

const filteredTags = computed(() => {
  if (!search.value) return tags.value
  else
    return tags.value?.filter((t) =>
      t.name.toLowerCase().includes(search.value.toLowerCase())
    )
})

const sortedTags = computed(() =>
  filteredTags.value?.slice().sort((a, b) => b.article_count - a.article_count)
)
</script>

<style scoped>
.search_wrapper {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

input {
  flex-grow: 1;
}

table {
  width: 100%;
  border-collapse: collapse;
  /* table-layout: fixed; */
}

th {
  text-align: left;
}

td,
th {
  padding: 0.25em;
}
</style>
