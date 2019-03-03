export const state = () => ({
  name: '',
  description: '',
  chatType: '',
  chatId: ''
})

export const mutations = {
  switchChat(state, payload){
    state.chatType = payload.chatType
    state.chatId = payload.chatId
    state.name = payload.name
    state.description = payload.description
  }
}

export const actions = {
  switchChat({commit}, payload){
    commit('switchChat', payload)
  }
}

