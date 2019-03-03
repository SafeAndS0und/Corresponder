export const state = () => ({
  appThemeColor: 'light'
})

export const mutations = {
  switchThemeColor(state){
    state.appThemeColor = state.appThemeColor === 'light' ? 'dark' : 'light'
  }
}

export const actions = {
  switchThemeColor({commit}){
    commit('switchThemeColor')
  }
}
