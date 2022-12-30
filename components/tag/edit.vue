<template>
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

<script setup lang="ts">
import type Tag from "~~/types/Tag"

type TagUpdateBody = {
  name?: string
  navigation_item?: boolean
}

const runtimeConfig = useRuntimeConfig()
const updating = ref(false)
const deleting = ref(false)
const pinnedTags = usePinnedTags()
const props = defineProps<{ tag: Tag }>()
const emit = defineEmits(["update"])

const snackbar = reactive({
  show: false,
  message: "",
  class: "",
})

const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}

const updateTag = async (body: TagUpdateBody) => {
  const url = `/tags/${props.tag._id}`
  const options = {
    method: "PATCH",
    body,
    ...fetchOpts,
  }

  updating.value = true

  try {
    await $fetch(url, options)
    await updatePinnedTags()
    emit("update")
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
  if (!confirm(`Delete tag ${props.tag?.name} ?`)) return

  const url = `/tags/${props.tag?._id}`
  const options = {
    method: "DELETE",
    ...fetchOpts,
  }

  deleting.value = true

  try {
    await $fetch(url, options)
    await updatePinnedTags()
    emit("update")
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
  if (!props.tag) return
  const name = prompt("New tag name", props.tag.name)
  if (!name) return
  updateTag({ name })
}

const pinToNav = async () => {
  if (!props.tag) return
  await updateTag({ navigation_item: !props.tag.navigation_item })
}
</script>
