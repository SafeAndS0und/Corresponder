<template>
  <div>
    <transition name="fade">
      <div class="page" v-if="!isLoading" v-touch:swipe.right="unfold">

        <Navbar class="navbar" :folded="folded"/>
        <Sidebar class="sidebar"
                 :class="{folded}"
                 :folded="folded"
                 v-touch:swipe.left="fold"
                 @fold="forwardFold"/>

        <nuxt
          class="content"
          :class="{fullscreen: folded}"
        />
      </div>
    </transition>

    <transition name="fadeL">
      <div class="loading" v-if="isLoading">

        <h1>HOLD ON A SECOND</h1>

        <div class="circles">
          <div name="circle" class="circle c1"></div>
          <div name="circle" class="circle c2"></div>
          <div name="circle" class="circle c3"></div>
        </div>
      </div>
    </transition>

  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import Sidebar from '../components/sidebar/Sidebar.vue'
  import webRTC from '../assets/js/webRTC/index'

  export default {
    components: {Navbar, Sidebar},
    data(){
      return {
        folded: false
      }
    },
    async mounted(){

      const peer = await webRTC.createPeer(localStorage.getItem('id')) // start webRTC peer

      peer.on('connection', incomingCon =>{ //When connected
        console.log('someone s connected')

        incomingCon.on('data', async msg =>{ // When recieved a messages by connection.send(data)

          if(msg.broadcast){
            const msgNode = document.querySelector('.messages')
            await this.$store.dispatch('chat/pushMessage', {message: msg})

            msgNode.scrollTo({ // scroll to bottom
              top: msgNode.scrollHeight,
              behavior: 'smooth'
            })
            return
          }

          if(!msg.hasOwnProperty('roomPeers')){ // see if its not the room peers list
            console.log('I got a message ', msg)

            if(msg.owner && msg.owner._id === this.$store.state.chat.id){ //if user is in the chat with that person
              const msgNode = document.querySelector('.messages')
              await this.$store.dispatch('chat/pushMessage', {message: msg})

              msgNode.scrollTo({ // scroll to bottom
                top: msgNode.scrollHeight,
                behavior: 'smooth'
              })
            }
            else{ // if user is outside of the chat that he got message from
              this.$nuxt.$emit('notification', msg);
            }
          }
          else{
            console.log('I got the room peers list ', msg)
            msg.roomPeers.forEach(id => {

              const peer = new Peer()
              peer.on('open', () => {
                const connection = peer.connect(id)
                connection.on('open', () => {
                  webRTC.roomPeers.push(connection)
                })

              })
            })

          }
        })

      })


    },
    methods: {
      forwardFold(){
        this.folded = !this.folded
      },
      fold(){
        this.folded = true
      },
      unfold(){
        this.folded = false
      }
    },
    computed: {
      isLoading(){
        return this.$store.state.loading
      }
    }

  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Questrial');
  @import '../assets/css/variables.scss';

  html {
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

  }

  * {
    font-family: 'Questrial', sans-serif;
  }

  body {
    margin: 0;
    padding: 0;
    background-color: #eeeeee;
    transition: background-color 0.5s;
    // #f0f0f0
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }

  .folded {
    width: 55px !important;
  }

  .fullscreen {
    width: 95% !important;
    left: 5% !important;
  }

  div {

    .page {

      .sidebar {
        z-index: 1;
        position: fixed;
        left: 0;
        top: 0;
        height: 100vh;
        width: 25%;
        transition: 0.5s;
        overflow-y: scroll;

        &::-webkit-scrollbar {
          width: 0;
          background: transparent;
        }
      }

      .navbar {
        position: relative;
        z-index: 12;
      }
      .content {
        position: absolute;
        left: 25%;
        top: 50px;
        width: 75%;
        transition: 0.5s;

      }
    }

    .loading {
      display: grid;
      height: 100vh;
      grid-gap: 20px;

      h1 {
        align-self: end;
        text-align: center;
        font-weight: 400;
        font-size: 2em;
        color: #353137;
        margin-bottom: 50px;
        letter-spacing: 6px;
      }

      .circles {
        align-self: start;
        justify-self: center;

        .circle {
          padding: 7px;
          margin: 10px;
          border-radius: 50%;
          display: inline-block;
          animation: load .5s infinite alternate ease-out;
          background-color: #3b69d7;
        }

        .c1 {
          animation-delay: 0s;
        }

        .c2 {
          animation-delay: 0.15s;
        }
        .c3 {
          animation-delay: 0.30s;
        }
      }
    }
  }

  /* Loading animation */

  @keyframes load {
    from {
      transform: translateY(8px);
    }
    to {
      transform: translateY(-12px);
    }
  }

  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.61s;
    transition-delay: 0.5s;
    opacity: 1;
  }

  .fade-enter, .fade-leave-to {

    opacity: 0;
  }

  .fadeL-enter-active, .fadeL-leave-active {
    transition: all 0.5s;
    opacity: 1;
  }

  .fadeL-enter, .fadeL-leave-to {
    opacity: 0;
    transform: translateY(-100px);
  }




  @media screen and (max-width: $tablet) {

    div{
      .page{

        .content{
          width: 65%;
          left: 35%;
        }
        .sidebar{
          width: 35%;
        }
      }
    }

  }

  @media screen and (max-width: $mobile) {

    div{
      .page{

        .content{
          width: 0;
        }
        .sidebar{
          width: 100%;
        }
      }
    }

    .folded{
      width: 0 !important;
    }

    .fullscreen {
      width: 100% !important;
      left: 0 !important;
    }
  }




</style>
