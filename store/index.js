export const state = () => ({
  current_user: null,
  pinned_tags: []
})

export const mutations = {
  set_current_user(state,user){
    state.current_user = user
  },
  set_pinned_tags(state,tags){
    state.pinned_tags = tags
  }
}
