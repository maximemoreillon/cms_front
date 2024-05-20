<template>
  <h1>Authors</h1>

  <table>
    <thead>
      <tr>
        <th>
          <Icon name="mdi:account" />
        </th>
        <th>
          <Icon name="mdi:file-document-outline" />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="author in authors" :key="author._id">
        <td>
          <Author :author="author" :link="true" />
        </td>
        <td>
          {{ author.article_count }}
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts" setup>
const runtimeConfig = useRuntimeConfig()

const url = `/authors`
const fetchOpts = { baseURL: runtimeConfig.public.apiBase }
const { data: authors, error } = await useFetch<Author[]>(url, fetchOpts)
</script>
