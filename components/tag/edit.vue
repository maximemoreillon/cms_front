<template>
  <template v-if="tag">
    <button class="button" @click="promptForRename()">
      <Icon name="mdi:pencil" />
    </button>

    <button
      class="button"
      @click="pinToNav()"
      :class="{ active: tag.navigation_item }"
    >
      <Icon name="mdi:pin" />
    </button>

    <button class="button" @click="deleteTag()">
      <Icon name="mdi:delete" />
    </button>

    <Snackbar v-model="snackbar.show" :class="snackbar.class">
      {{ snackbar.message }}
    </Snackbar>
  </template>
</template>

<script setup lang="ts">
import type Tag from "~~/types/Tag"

const runtimeConfig = useRuntimeConfig()
const router = useRouter()
const updating = ref(false)
const deleting = ref(false)
const pinnedTags = usePinnedTags()
const props = defineProps<{ modelValue: Tag | null }>()
const emit = defineEmits(["update:modelValue"])
const tag = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})

const snackbar = reactive({
  show: false,
  message: "",
  class: "",
})

const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}

const updateTag = async () => {
  const url = `/tags/${tag.value?._id}`
  const options = {
    method: "PATCH",
    ...fetchOpts,
    body: tag.value,
  }

  updating.value = true

  try {
    await $fetch(url, options)
    snackbar.show = true
    snackbar.message = `Tag updated`
    snackbar.class = ""
    await updatePinnedTags()
  } catch (error) {
    snackbar.show = true
    snackbar.message = `Tag update failed`
    snackbar.class = "error"
    console.error(error)
  } finally {
    updating.value = false
  }
}

const updatePinnedTags = async () => {
  const url = `/tags?pinned=true`
  const newPinnedTags = await $fetch<Tag[]>(url, fetchOpts)
  pinnedTags.value = newPinnedTags
}

const deleteTag = async () => {
  if (!confirm(`Delete tag ${tag.value?.name} ?`)) return

  const url = `/tags/${tag.value?._id}`
  const options = {
    method: "DELETE",
    ...fetchOpts,
  }

  deleting.value = true

  try {
    await $fetch(url, options)
    await updatePinnedTags()
    router.push("/")
  } catch (error) {
    snackbar.show = true
    snackbar.message = `Tag deletion failed`
    snackbar.class = "error"
    console.error(error)
  } finally {
    deleting.value = false
  }
}

const promptForRename = () => {
  if (!tag.value) return
  const newName = prompt("New tag name", tag.value.name)
  if (!newName) return
  tag.value.name = newName
  updateTag()
}

const pinToNav = async () => {
  if (!tag.value) return
  tag.value.navigation_item = !tag.value.navigation_item
  await updateTag()
}
</script>
