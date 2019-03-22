export const state = () => ({
  username: '',
  id: '',
  token: '',
  firstname: '',
  surname: ''
})

export const mutations = {
  login(state, payload){
    state.username = payload.username
    state.token = payload.token
    state.id = payload.id
    state.firstname = payload.firstname
    state.surname = payload.surname

    localStorage.setItem('token', state.token)
    localStorage.setItem('username', state.username)
    localStorage.setItem('id', state.id)
    localStorage.setItem('firstname', state.firstname)
    localStorage.setItem('surname', state.surname)
  },
  logout(state){
    localStorage.clear()
    state.username = ''
    state.token = ''
    state.id = ''
    state.firstname = ''
    state.surname = ''
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
