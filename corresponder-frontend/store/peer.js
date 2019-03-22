export const state = () => ({
  // peer: '',
  id: '',
  connection: ''
})

export const mutations = {
  initPeer(state, payload){
    // state.peer = payload.peer
    state.id = payload.id
    state.connection = payload.connection
  }
}

export const actions = {
  initPeer({commit}, payload){
    commit('initPeer', payload)
  }
}
