<template>
  <section class="chat">
    <div class="room-window">

      <header>

        <img :src="$store.state.chat.pic" v-if="$store.state.chat.pic"
             class="pic"
             alt="Profile picture">

        <div class="name">
          <h3>{{$store.state.chat.name}}</h3>
          <p>{{$store.state.chat.description}}</p>
        </div>

      </header>

      <Messages class="messages" :class="{dark: $store.state.appThemeColor === 'dark'}">

      </Messages>

      <div class="send-container">
        <CustomTextArea :class="{dark: $store.state.appThemeColor === 'dark'}"
                        v-model="content"
                        placeholder="Type here" class="textArea"/>

        <button
          :class="{darkBtn: $store.state.appThemeColor === 'dark'}"
          @click="sendMsg"
        >
          Send
          <span>(or just press enter)</span>
        </button>

      </div>

    </div>


  </section>
</template>

<script>
  import CustomTextArea from '../partials/CustomTextArea.vue'
  import Messages from './Messages.vue'

  export default {
    name: "MainChat",
    components: {CustomTextArea, Messages},
    data(){
      return {
        content: ''
      }
    },
    methods: {
      sendMsg(){
        this.axios.post(`/messages/${this.$store.state.chat.chatType}`, {
          parent: this.$store.state.chat.id,
          content: this.content
        })
          .then(res => console.log(res.data))
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
        padding: 4px 16px;
        border-radius: 50px;
        display: inline-block;
        -webkit-box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        -moz-box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);
        box-shadow: 4px 4px 5px 0 rgb(205, 205, 205);

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
            font-size: 24px;
            font-weight: 400;
            letter-spacing: 2px;
            margin-bottom: 5px;
            color: #565656;
          }
          p {
            padding-left: 2px;
            color: #999999;
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
        background-color: #28292d !important;

        h4 {
          color: #9b9b9b !important;
        }

        &:active, &:focus {
          color: #cdbdc9;
          background-color: #24262f !important;
        }

      }

      .darkBtn {
        background-color: #24262f !important;

        &:hover {
          background-color: #1c202c !important;
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

</style>
