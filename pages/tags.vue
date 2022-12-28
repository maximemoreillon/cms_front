<template>
  <h1>Tags</h1>

  <!-- TODO: Search -->

  <table>
    <thead>
      <tr>
        <th>
          <Icon name="mdi:tag" />
        </th>
        <th>
          <Icon name="mdi:file-document-outline" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="tag in tags" :key="tag._id">
        <td>
          <Tag :tag="tag" :link="true" :removable="false" />
        </td>
        <td>
          {{ tag.article_count }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
import type Tag from "~~/types/Tag"

const runtimeConfig = useRuntimeConfig()

const url = `/tags`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: tags, error } = await useFetch<Tag[]>(url, fetchOpts)
</script>

<style scoped>
table {
  border-collapse: collapse;
}

td {
  padding: 0.5em;
}
</style>
