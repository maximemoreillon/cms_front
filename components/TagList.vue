<template>
  <div class="tag_list">
    <Icon :name="tags.length ? 'mdi:tag' : 'mdi:tag-off'" />

    <Tag
      v-for="(tag, index) in tags"
      :key="tag._id"
      :tag="tag"
      :removable="removable"
      :link="link"
      @remove="removeTag(index)"
    />

    <input
      v-if="input"
      class="text_input"
      type="text"
      v-model="newTagName"
      list="existingTags"
      @keyup.enter="addTag()"
      placeholder="New tag"
    />

    <datalist id="existingTags">
      <option
        v-for="(tag, index) in existingTags"
        :key="`existing_tag_${index}`"
        :value="tag.name"
      />
    </datalist>
  </div>
</template>

<script lang="ts" setup>
import type Tag from "~~/types/Tag"

const runtimeConfig = useRuntimeConfig()
const props = defineProps<{
  modelValue: Tag[]
  input: boolean
  truncate: number | null
  link: boolean
  removable: boolean
}>()

const emit = defineEmits(["update:modelValue"])

const newTagName = ref("")

const fetchOpts = {
  baseURL: runtimeConfig.public.apiBase,
  headers: { authorization: `Bearer ${useCookie("jwt").value}` },
}

// TODO: Error handling
const { data: existingTags, error } = await useFetch<Tag[]>("/tags", fetchOpts)

const tags = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})

const addTag = async () => {
  const options = {
    method: "POST",
    body: { name: newTagName.value },
    baseURL: runtimeConfig.public.apiBase,
    headers: { authorization: `Bearer ${useCookie("jwt").value}` },
  }

  try {
    const newTag = await $fetch<Tag>("/tags", options)
    tags.value.push(newTag)
    newTagName.value = ""
  } catch (error) {
    console.error(error)
  }
}

const removeTag = (index: number) => {
  tags.value.splice(index, 1)
}
</script>

<style scoped>
.tag_list {
  display: flex;
  align-items: center;
  gap: 0.5em;
}
</style>
