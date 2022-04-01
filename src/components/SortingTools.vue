<template lang="html">
  <div class="sort_and_order">

    <button
      :class="{ active: this.$route.query.sort !== 'title' && this.$route.query.sort !== 'views' }"
      @click="sort('date')">
      <calendar-icon/>
    </button>

    <button
      :class="{ active: this.$route.query.sort === 'title' }"
      @click="sort('title')">
      <alphabetical-icon/>
    </button>

    <button
      :class="{ active: this.$route.query.sort === 'views' }"
      @click="sort('views')">
      <eye-icon/>
    </button>

    <button
      :class="{ active: this.$route.query.order !== 'ASC' }"
      @click="order('DESC')">
      <sort-descending-icon/>
    </button>

    <button
      :class="{ active: this.$route.query.order === 'ASC' }"
      @click="order('ASC')">
      <sort-ascending-icon/>
    </button>

  </div>
</template>

<script>
// import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  name: 'SortingTools',
  components: {
    // IconButton
  },
  methods: {
    add_query_parameter(key, value){
      
      // Do nothing if already the right query
      if(this.$route.query[key] === value) return

      const { name } = this.$route

      // Unpack query
      const query = {...this.$route.query}

      // Add the new parameter
      query[key] = value

      this.$router.push({name, query})

    },
    sort(val){
      this.add_query_parameter('sort', val)
    },
    order(val){
      this.add_query_parameter('order', val)
    },
  }
}
</script>

<style lang="css" scoped>
</style>
