export default {
  clientPeer: null,
  roomPeers: [],
  id: null,
  connection: null,

  createPeer(id){
    return new Promise((resolve, reject) =>{

      const peer = new Peer(id)

      peer.on('error', err =>{
        reject(err)
      })

      peer.on('open', id =>{
        this.clientPeer = peer
        resolve(peer)
      })

    })

  },


  connectToAnotherPeer(peerId){
    console.log('changing peer to connect to', peerId)
    this.connection = this.clientPeer.connect(peerId)
  },

  createRoom(roomId){
    const roomPeer = new Peer(roomId)

    return new Promise((resolve, reject) =>{
      roomPeer.on('error', err =>{
        // If the room is already created, join it instead
        if(err.toString().match(/ID.*is taken/)){
          this.joinRoom(roomId, resolve)
        }
        else{
          reject(err)
        }

      })

      roomPeer.on('open', id =>{
        this.roomPeers.push(roomPeer)
        console.log('created a room server', roomPeer)
        resolve(roomPeer)
      })
    })

  },

  joinRoom(roomId, resolve){
    const connection = this.clientPeer.connect(roomId)
    connection.on('open', () => {
      resolve(connection)
    })

  },

  sendMessage(content){
    console.log('sending a message', content.content)
    this.connection.send(content)

  }

}
