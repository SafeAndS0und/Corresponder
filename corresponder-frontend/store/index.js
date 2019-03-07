export const state = () => ({
  appThemeColor: 'light',
  loading: true
})

export const mutations = {
  switchThemeColor(state){
    state.appThemeColor = state.appThemeColor === 'light' ? 'dark' : 'light'
  },
  switchLoading(state){
    state.loading = !state.loading
  }
}

export const actions = {
  switchThemeColor({commit}){
    commit('switchThemeColor')
  },
  switchLoading({commit}){
    commit('switchLoading')
  }
}
