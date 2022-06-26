<template>
  <div class="tag_list">

    <template v-if="tags && tags.length">
      <MaterialIconTag />

      <Tag :clickable="clickable" v-for="(tag, index) in tag_list" v-bind:key="`tag_${index}`" :tag="tag" />

      <span v-if="this.truncate && tags.length > this.truncate">
        +{{ tags.length - truncate }}
      </span>
    </template>

    <MaterialIconTagOff v-else />

    <!-- Input of new tags -->
    <input v-if="input" id="tag_input" v-model="new_tag_name" type="search" ref="tag_input" list="existing_tag_list" placeholder="New tag"
      @keyup.enter="add_tag()">

    <datalist id="existing_tag_list">
      <option v-for="(existing_tag, index) in existing_tags" :value="existing_tag.name"
        :key="`existing_tag_${index}`" />
    </datalist>



  </div>
</template>

<script>
import Tag from '~/components/Tag.vue'

export default {
  name: 'TagList',

  props: {
    tags: Array,
    truncate: Number,
    removable: Boolean,
    clickable: {
      type: Boolean,
      default: () => true
    },
    input: Boolean,
  },
  components: {
    Tag
  },
  data(){
    return {
      existing_tags: [],
      new_tag_name: '',
    }
  },
  mounted(){
    if (this.input) this.get_existing_tags()
  },

  methods: {
    tag_clicked(){
      if(!this.clickable) return
      const tag_id = this.tag._id
      if(!(this.$route.name === 'articles' && this.$route.query.tag_id !== tag_id)){
        this.$router.push({ name: 'index', query: { tag_id } })
      }

    },
    async get_existing_tags() {
      try {
        const url = `${this.$config.apiUrl}/v1/tags/`
        this.existing_tags = await this.$axios.$get(url)
      } catch (error) {
        console.error(error)
      }
    },
    add_tag(){
      this.$emit('newTag', this.new_tag_name)
      this.new_tag_name = ''
    }
  },
  computed:{
    tag_list(){
      if (this.truncate) return this.tags.slice(0, this.truncate)
      else return this.tags
    }
  }
}
</script>

<style scoped>



.tag_list {
  color: #666666;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.25em;
}



</style>
