export const state = () => ({
  username: ''
})

export const mutations = {
  login(state, payload){
    state.username = payload.username
  }
}

export const actions = {
  login({commit}, payload){
    commit('login', payload)
  }
}


export const getters = {
  isLoggedIn(state){
    return state.username !== ''
  }
}
