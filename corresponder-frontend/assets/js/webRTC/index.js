export default {
  clientPeer: null,
  id: null,
  connection: null,

  roomPeers: [],

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

      // this happen only on host
      roomPeer.on('open', id => {
        console.log('Created a room server', roomPeer)
        resolve({roomPeer: roomPeer, roomPeers: this.roomPeers})
      })
    })

  },

  joinRoom(roomId, resolve){
    console.log('Room already exists, trying to connect to it')
    this.connection = this.clientPeer.connect(roomId)
    this.connection.on('open', () => {
      resolve({roomPeer: this.connection})
    })
  },

  broadcast(content){
    console.log('Broadcasting a message: ' + content + ' to users: ', this.roomPeers)

    this.roomPeers.forEach(connection => {
      connection.send(content)
    })
  },

  sendList(to){
    console.log('Sending active users list to ', to)

    const connection = this.clientPeer.connect(to)

    connection.on('open', () => {
      connection.send({roomPeers: this.roomPeers})
    })
    connection.on('error', err =>{
      console.log(err)
    })
  },

  sendMessage(content){
    console.log('Sending a message', content)
    this.connection.send(content)

  }

}
