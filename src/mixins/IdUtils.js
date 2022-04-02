// Using these functions because ID have changed multiple times over the course of time
export default {
  methods: {
    get_id_of_item(item){

      let id = item._id

      if(!id && item.properties ) {
        item.properties._id
      }

      if(!id && item.identity) {
        id = item.identity.low
        || item.identity
      }

      return id
    }
  },
  computed: {
    current_user_id () {
      const {current_user} = this.$store.state
      if(!current_user) return undefined
      return this.get_id_of_item(current_user)
    }
  }
}
