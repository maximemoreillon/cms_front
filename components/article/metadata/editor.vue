<template>
  <!-- TODO: Would benefit from having section titles -->
  <section>
    <h3>Summary</h3>
    <textarea
      class="summary text_input"
      v-model="article.summary"
      placeholder="Article summary"
    />
  </section>

  <section>
    <h3>Tags</h3>
    <TagList
      class="tags"
      v-model="article.tags"
      :link="false"
      :input="true"
      :truncate="null"
      :removable="true"
    />
  </section>

  <section class="thumbnail_visibility">
    <div>
      <h3>Thumbnail</h3>
      <ArticleMetadataThumbnailManagement
        class="thumbnail"
        v-model="article.thumbnail_src"
      />
    </div>
    <div>
      <h3>Visibility</h3>
      <!-- Visibility -->
      <div class="visibility">
        <div class="radio_option">
          <input
            id="private"
            v-model="article.published"
            type="radio"
            :value="false"
          />
          <label for="private">
            <Icon name="mdi:lock" />
            <span>Private</span>
          </label>
        </div>

        <div class="radio_option">
          <input
            id="public"
            v-model="article.published"
            type="radio"
            :value="true"
          />
          <label for="public">
            <Icon name="mdi:earth" />
            <span>Public</span>
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import type Article from "~~/types/Article"

const props = defineProps<{ modelValue: Article }>()

const emit = defineEmits(["update:modelValue"])

const article = computed({
  get: () => props.modelValue,
  set: (newVal) => emit("update:modelValue", newVal),
})
</script>

<style scoped>
.summary {
  resize: vertical;
  width: 100%;
}

.thumbnail_visibility {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.thumbnail_visibility > div {
  flex-grow: 1;
  flex-basis: 10rem;
}
</style>
