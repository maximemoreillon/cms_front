<template>
  <NuxtLink
    v-for="{ value, icon, isDefault } in sortingOptions"
    :key="value"
    :class="{
      active: route.query.sort === value || (isDefault && !route.query.sort),
    }"
    class="button"
    :to="{ query: { ...route.query, sort: value } }"
  >
    <Icon :name="icon" />
  </NuxtLink>
</template>

<script lang="ts" setup>
const route = useRoute()
const user = userUser()
const sortingOptions = ref([
  { icon: "mdi:calendar", value: "date", isDefault: true },
  { icon: "mdi:order-alphabetical-ascending", value: "title" },
])

if (user) sortingOptions.value.push({ icon: "mdi:eye", value: "views" })
</script>
