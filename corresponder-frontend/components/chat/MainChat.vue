<template>
  <section class="chat">
    <div class="room-window">

      <header :class="{dark: isDark}">

        <img :src="$store.state.chat.pic" v-if="$store.state.chat.pic"
             class="pic"
             alt="Profile picture">

        <div class="name">
          <h3 :class="{darkH3: isDark}">{{$store.state.chat.name}}</h3>
          <p>{{$store.state.chat.description}}</p>
        </div>

      </header>

      <Messages class="messages" :class="{dark: isDark}">

      </Messages>

      <div class="send-container">
        <CustomTextArea :class="{dark: isDark}"
                        @keypress.enter.native="sendMsg"
                        v-model="content"
                        placeholder="Type here" class="textArea"/>

        <button
          :class="{darkBtn: isDark}"
          @click="sendMsg"
        >
          Send
          <!--<span>(or just press enter)</span>-->
        </button>

      </div>

      <!--<video style="width:250px;height: 250px;background-color: #adb8e2"></video>-->

    </div>


  </section>
</template>

<script>
  import CustomTextArea from '../partials/CustomTextArea.vue'
  import Messages from './Messages.vue'
  import webRTC from '../../assets/js/webRTC/index'

  export default {
    name: "MainChat",
    components: {CustomTextArea, Messages},
    data(){
      return {
        content: '',
        msgNode: null
      }
    },
    computed: {
      isDark(){
        return this.$store.state.appThemeColor === 'dark'
      }
    },
    mounted(){
      this.msgNode = document.querySelector('.messages')
      this.msgNode.scrollTop = 0
    },
    methods: {
      sendMsg(){
        const msgObj = {
          content: this.content,
          owner: {
            firstname: this.$store.state.user.firstname,
            surname: this.$store.state.user.surname,
            _id: this.$store.state.user.id
          },
          createdAt: Date.now()
        }

        this.$store.dispatch('chat/pushMessage', {message: msgObj}) // update the messages localy

        this.$store.state.chat.chatType === 'friend'
          ? webRTC.sendMessage(msgObj) // send it to the peer connected
          : webRTC.broadcast(msgObj)

        this.axios.post(`/messages/${this.$store.state.chat.chatType}`, {
          parent: this.$store.state.chat.id,
          content: this.content
        })
          .then(res =>{
            // scroll to bottom
            this.content = ''
            this.msgNode.scrollTo({
              top: this.msgNode.scrollHeight,
              behavior: 'smooth'
            })
          })
          .catch(err => console.log(err.response.data))
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables.scss';

  .chat {
    margin: -20px 0 80px 0;

    .room-window {
      margin: 0 120px 0 80px;
      padding: 5px 20px;
      color: #555555;

      header {
        background-color: #fafafa;
        padding: 4px 20px;
        border-radius: 50px;
        display: inline-block;
        -webkit-box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        -moz-box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        transition: .5s;

        .pic {
          max-height: 55px;
          max-width: 55px;
          border-radius: 30px;
          display: inline-block;
          position: relative;
          transform: translateY(10px);
          margin-right: 20px;

        }
        .name {
          display: inline-block;
          margin: 12px 0;

          h3 {
            font-size: 22px;
            font-weight: 300;
            letter-spacing: 2px;
            margin-bottom: 5px;
            color: #555555;
          }
          .darkH3{
            color: #d6d3d0;
          }
          p {
            padding-left: 2px;
            color: #8e8e8e;
          }
        }
      }

      .messages {
        margin: 15px 0;
        width: 100%;
        background-color: #fafafa; // #e8e8e8;
        border-radius: 10px;
        -webkit-box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        -moz-box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);

        transition: 0.5s;
        max-height: 54vh;

      }

      .dark {
        background-color: #1f1f23 !important;

        &:active, &:focus {
          color: #cdbdc9;
          background-color: #23242f !important;
        }

      }

      .darkBtn {
        background-color: #23242f !important;

        &:hover {
          background-color: #2d2f38 !important;
        }
      }

      .send-container {
        display: grid;
        grid-template-columns: 1fr .3fr;
        grid-template-rows: 130px;
        grid-gap: 15px;
        margin-top: 20px;

        .textArea {
          resize: vertical;
          border-radius: 3px;
          display: inline-block;
        }

        button {
          border: none;
          background-color: $basicLightGreen;
          color: white;
          font-size: 1.05em;
          transition: 0.3s;
          cursor: pointer;
          border-radius: 3px;

          &:hover {
            background-color: $basicMiddleGreen;
          }

          span {
            display: block;
            font-size: 0.85em;
            color: #e6e6e6;
          }
        }
      }
    }
  }

  @media screen and (max-width: $tablet) {
    .chat {

      .room-window {
        margin: 0 60px 0 60px;
        padding: 5px 20px;

        header {

        }
      }
    }
  }

  @media screen and (max-width: $mobile) {
    .chat {
      padding-top: 0;
      margin-left: 0;

      .room-window {
        margin: 0 6px;
        padding: 0;
        position: relative;

        header {
          width: 100%;
          border-radius: 5px;
          display: grid;
          grid-template-columns: 60px 1fr;

          .pic {
            max-height: 45px;
            max-width: 45px;
            border-radius: 25px;
            display: inline-block;
            position: relative;
            transform: translateY(10px);
            margin-right: 15px;

          }
          .name {
            display: inline-block;
            margin: 12px 0;

            h3 {
              font-size: 1em;
              font-weight: 400;
              letter-spacing: 2px;
              margin-bottom: 5px;
              color: #555555;
            }
            p {
              font-size: 0.9em;
              color: #999999;
            }
          }
        }

        .messages {
          height: auto;
          border-radius: 3px;
        }

        .send-container {
          position: fixed;
          bottom: 5px;
          width: 95%;
          left: 2.5%;
          display: grid;
          grid-template-columns: 1fr .5fr;
          grid-template-rows: 65px;
          grid-gap: 5px;

          .textArea {
            resize: none;
            border-radius: 0;
            display: inline-block;
          }
        }
      }

    }
  }


</style>
