<template>
  <div class="tag_management">
    <button type="button" class="button" @click="prompt_for_rename()">
      <MaterialIconPencil />
    </button>

    <button type="button" class="button" @click="delete_tag()">
      <MaterialIconDelete />
    </button>

    <button type="button" class="button" :class="{active:tag.navigation_item}" @click="pin_to_navbar()">
      <MaterialIconPin />
    </button>
  </div>
</template>

<script>


export default {
  name: 'TagManagement',
  props: {
    value: Object,
  },

  methods:{
    update_tag(){
      // Used for admins to edit tags

      this.tag_loading = true

      const tag_id = this.tag._id

      const url = `/tags/${tag_id}`
      const body = this.tag

      this.$axios.put(url, body)
      .then( () => {
        this.refresh_pinned_tags()

      })
      .catch(error => alert(error))
      .finally(() => {
        this.tag_loading = false
      })

    },
    async refresh_pinned_tags(){
      const url = `/tags`
      const params = { pinned: true }
      try {
        const { data: tags } = await this.$axios.get(url, { params })
        this.$store.commit('set_pinned_tags', tags)
      }
      catch (error) {
        console.error(`Failed to get pinned tags`)
      }
    },

    prompt_for_rename(){
      const new_name = prompt("New tag name", this.tag.name)
      if(!new_name) return
      this.tag.name = new_name
      this.update_tag()
    },

    pin_to_navbar(){
      this.tag.navigation_item = !this.tag.navigation_item
      this.update_tag()
    },

    delete_tag(){
      if(!confirm('Delete tag?')) return
      this.article_loading = true;

      const tag_id = this.tag._id

      this.$axios.delete(`tags/${tag_id}`)
      .then( () => {
        this.$router.push({ name: 'articles' })
      })
      .catch(error => alert(error))

    },
  },
  computed: {
    tag: {
      get() {
        return this.value
      },
      set(newVal){
        this.$emit('input', newVal)
      }
    }
  }


}
</script>

<style lang="css" scoped>
.tag_management {
  display: flex;
  gap: 0.5em;
}
</style>
