<template>
  <div class="sort_and_order">
    <button
      :class="{ active: $route.query.sort !== 'title' && $route.query.sort !== 'views' }"
      @click="sort('date')"
    >
      <MaterialIconCalendar />
    </button>

    <button
      :class="{ active: $route.query.sort === 'title' }"
      @click="sort('title')"
    >
      <MaterialIconAlphabetical />
    </button>

    <button
      v-if="$auth.user"
      :class="{ active: $route.query.sort === 'views' }"
      @click="sort('views')"
    >
      <MaterialIconEye />
    </button>

    <div class="separator" />

    <button
      :class="{ active: $route.query.order !== 'ASC' }"
      @click="order('DESC')"
    >
      <MaterialIconSortAscending />
    </button>

    <button
      :class="{ active: $route.query.order === 'ASC' }"
      @click="order('ASC')"
    >
      <MaterialIconSortDescending />
    </button>
  </div>
</template>

<script>
// import IconButton from '@/components/vue_icon_button/IconButton.vue'

export default {
  name: 'ArticleSorting',
  components: {
    // IconButton
  },
  methods: {
    add_query_parameter(key, value){

      // Do nothing if already the right query
      if(this.$route.query[key] === value) return

      const { name } = this.$route

      // Unpack query and add new param
      const query = { ...this.$route.query, [key]: value }

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

<style >


.sort_and_order {
  display: flex;
  gap: 0.5em;
}


</style>
