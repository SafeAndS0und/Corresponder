
export default {
  peer: null,
  id: null,
  connection: null,

  createPeer(id){
    this.peer = new Peer(id)

    this.peer.on('open', id => {
      this.id = id
      this.peer.on('connection', connection => {
          console.log('somebodys calling?')
      })
      return {peer: this.peer, id}
    })
  },

  connectToAnotherPeer(peerId){
    this.connection = this.peer.connect(peerId)
  }

}
