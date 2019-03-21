import webRTC from './webRTC/index'

// It runs when the page is refreshed
export default function(axios, store){


  const token = localStorage.getItem('token')


  if(token){
    axios.get(`user/token/${token}`) // check if the token's still valid
      .then(res => {
        store.dispatch('switchLoading')

        webRTC.createPeer(res.data.id) // start webRTC peer

        // save the data in store
        store.dispatch('user/login', {
          username: localStorage.getItem('username'), token
        })

      })
      .catch(err => {
        console.log(err)
        localStorage.clear()
        store.dispatch('switchLoading')
      })
  }
  else{
    localStorage.clear()
    setTimeout(() => {
      store.dispatch('switchLoading')
    }, 300)
  }

}
