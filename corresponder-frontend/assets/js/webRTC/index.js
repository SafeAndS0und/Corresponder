
export default {
  peer: null,
  id: null,
  connection: null,

  createPeer(id){
    this.peer = new Peer(id)

    this.peer.on('err', err => {
      throw err
    })

    return this.peer
  },

  connectToAnotherPeer(peerId){
    console.log('changing peer to connect to')
    this.connection = this.peer.connect(peerId)
  },

  sendMessage(content){
    console.log('sending a message', content.content)
    this.connection.send(content)
  }

}
