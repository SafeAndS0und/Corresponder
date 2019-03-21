export const state = () => ({
  username: '',
  id: '',
  token: ''
})

export const mutations = {
  login(state, payload){
    state.username = payload.username
    state.token = payload.token
    state.id = payload.id

    localStorage.setItem('token', state.token)
    localStorage.setItem('username', state.username)
    localStorage.setItem('id', state.id)
  },
  logout(state){
    localStorage.clear()
    state.username = ''
    state.token = ''
    state.id = ''
  }
}

export const actions = {
  login({commit}, payload){
    commit('login', payload)
  },
  logout({commit}){
    commit('logout')
  }
}


export const getters = {
  isLoggedIn(state){
    return state.token !== ''
  }
}
