<template>
  <div>
    <transition name="fade">
      <div class="page" v-if="!isLoading">

        <Navbar class="navbar" :folded="folded"/>
        <Sidebar class="sidebar"
                 :class="{folded}"
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
      const peer = webRTC.createPeer(localStorage.getItem('id')) // start webRTC peer

      peer.on('open', id => {
        this.id = id

        peer.on('connection', incomingCon =>{ //When connected
          console.log('someone connected')

          incomingCon.on('data', msg =>{ // When recieved a messages by connection.send(data)
            console.log('got msg', msg)

            if(msg.owner._id === this.$store.state.chat.id)
              this.$store.dispatch('chat/pushMessage', {message: msg})
          })

        })
      })



    },
    methods: {
      forwardFold(){
        this.folded = !this.folded
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


</style>
