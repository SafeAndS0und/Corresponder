export const state = () => ({
  name: '',
  description: '',
  chatType: '',
  pic: '',
  id: '',
  messages: []
})

export const mutations = {
  switchChat(...arr){
    // arr[0] is state; arr[1] is payload
    Object.keys(arr[0]).forEach(key => {
      arr[0][key] = arr[1][key]
    })
  }
}

export const actions = {
  switchChat({commit}, payload){
    commit('switchChat', payload)
  }
}

