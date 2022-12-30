<template>
  <h1>About</h1>
  <p>CMS GUI v{{ versionRef }}</p>
  <p>Developed by Maxime Moreillon</p>
</template>

<script lang="ts" setup>
import { version } from "../package.json"

const versionRef = ref(version)
</script>
