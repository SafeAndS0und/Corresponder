
export default function(axios, store){
  const token = localStorage.getItem('token')
  // It runs when the page is refreshed
  if(token){

    axios.get(`user/token/${token}`) // check if the token's still valid
      .then(res => {
        axios.defaults.headers.common['Authorization'] = localStorage.getItem('token') // assign the token to every axios request

        // save the data in store
        store.dispatch('user/login', {
          username: localStorage.getItem('username'), token
        })

      })
      .catch(err => console.log(err))

  }

}
