export const state = () => ({
  current_user: null,
})

export const mutations = {
  set_current_user(state,user){
    state.current_user = user
  },
}
