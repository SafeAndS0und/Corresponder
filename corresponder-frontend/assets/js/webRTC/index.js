export default {
  clientPeer: null,
  id: null,
  connection: null,

  roomPeers: [],
  roomPeer: null,

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

    this.connection.on('error', err =>{
      console.log(err)
    })
  },

  createRoom(roomId){
    const roomPeer = new Peer(roomId)
    this.roomPeer = roomPeer

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
      console.log('I successfully connected to the room!')
      resolve({roomPeer: this.connection})
    })
  },

  broadcast(content){
    console.log('Broadcasting a message: ' + content + ' to users: ', this.roomPeers)

    this.roomPeers.forEach(connection => {
      if(connection.peer !== this.clientPeer.id){ // dont send a message to yourself lol
        content.broadcast = true // inform that its a broadcast and not a normal message
        connection.send(content)
      }
    })
  },

  sendList(to){
    console.log('Sending active users list to ', to)

    const peer = new Peer()

    peer.on('error', err => console.log(err))

    peer.on('open', id =>{
      const connection = peer.connect(to)
      connection.on('open', () => {
        let peersIds = [this.clientPeer.id] // initialize only with your id, because it wont be in the list
        this.roomPeers.forEach(peer => peersIds.push(peer.peer)) // we want to send only the IDs, because whole object aint WORKIN' IDK

        connection.send({roomPeers: peersIds})
      })
      connection.on('error', err =>{
        console.log(err)
      })
    })


  },

  sendMessage(content){
    console.log('Sending a message', content)
    if(this.connection.open)
      this.connection.send(content)
    else {
      this.connection = this.clientPeer.connect(this.connection.peer) // if the user was inactive try to connect to him when sending a message
      this.connection.on('open', () => this.connection.send(content))
    }
  }

}
