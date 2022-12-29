<template>
  <NuxtLink
    v-for="{ value, icon, isDefault } in orderingOptions"
    :key="value"
    :class="{
      active: route.query.order === value || (isDefault && !route.query.order),
    }"
    class="button"
    :to="{ query: { ...route.query, order: value } }"
  >
    <Icon :name="icon" />
  </NuxtLink>
</template>

<script lang="ts" setup>
const route = useRoute()

const orderingOptions = ref([
  { icon: "mdi:sort-descending", value: "DESC", isDefault: true },
  { icon: "mdi:sort-ascending", value: "ASC" },
])
</script>

<style scoped></style>
