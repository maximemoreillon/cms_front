<template lang="html">
<div class="tag_management">

  <button
    type="button"
    class="button"
    @click="prompt_for_rename()">
    <pencil-icon/>
    <span>Rename tag</span>
  </button>

  <button
    type="button"
    class="button"
    @click="delete_tag()">
    <delete-icon/>
    <span>Delete tag</span>
  </button>

  <button
    type="button"
    class="button"
    :class="{active:tag.navigation_item}"
    @click="pin_to_navbar()">
    <pin-icon/>
    <span>Pin to nav</span>
  </button>

</div>
</template>

<script>
import IdUtils from '@/mixins/IdUtils'


export default {
  name: 'TagManagement',
  props: {
    tag: Object,
  },
  mixins: [
    IdUtils
  ],
  methods:{
    update_tag(){
      // Used for admins to edit tags

      this.tag_loading = true

      const tag_id = this.get_id_of_item(this.tag)

      const url = `${process.env.VUE_APP_CMS_API_URL}/v1/tags/${tag_id}`
      const body = this.tag

      this.axios.put(url, body)
      .then( ({data}) => {

        this.tag = data

        this.$store.commit('update_categories')

        this.$emit('tagUpdate')


      })
      .catch(error => alert(error))
      .finally(() => {
        this.tag_loading = false
      })

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

      const tag_id = this.get_id_of_item(this.tag)

      this.axios.delete(`${process.env.VUE_APP_CMS_API_URL}/v1/tags/${tag_id}`)
      .then( () => {
        this.$router.push({ name: 'article_list' })
      })
      .catch(error => alert(error))

    },
  }

}
</script>

<style lang="css" scoped>
.tag_management {
  display: flex;
  gap: 0.5em;
}
</style>
