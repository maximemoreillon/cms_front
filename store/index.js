export const state = () => ({
  pinned_tags: []
})

export const mutations = {
  set_pinned_tags(state,tags){
    state.pinned_tags = tags
  }
}
