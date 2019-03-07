export const state = () => ({
  username: '',
  token: ''
})

export const mutations = {
  login(state, payload){
    state.username = payload.username
    state.token = payload.token

    localStorage.setItem('token', state.token)
    localStorage.setItem('username', state.username)
  },
  logout(state){
    localStorage.clear()
    state.username = ''
    state.token = ''
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
