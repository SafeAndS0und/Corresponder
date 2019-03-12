<template>
  <section class="chat">
    <div class="room-window">
      <h3>{{$store.state.chat.name}}</h3>
      <p>{{$store.state.chat.description}}</p>

      <Messages class="messages" :class="{dark: $store.state.appThemeColor === 'dark'}">

      </Messages>

      <CustomTextArea :class="{dark: $store.state.appThemeColor === 'dark'}"
                      placeholder="Type here" class="textArea"/>

      <button
        :class="{darkBtn: $store.state.appThemeColor === 'dark'}"
      >
        Send
        <span>(or just press enter)</span>
      </button>
    </div>


  </section>
</template>

<script>
  import CustomTextArea from '../partials/CustomTextArea.vue'
  import Messages from './Messages.vue'

  export default {
    name: "MainChat",
    components: {CustomTextArea, Messages}
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables.scss';

  .chat {

    margin: 0 0 80px 0;

    .room-window {
      margin: 0 120px 0 80px;
      padding: 5px 20px;
      color: #555555;

      h3 {
        font-size: 26px;
        font-weight: 400;
        letter-spacing: 2px;
        margin-bottom: 5px;
      }
      p {
        padding-left: 2px;
        color: #979797;
      }

      .messages {
        margin: 15px 0;
        width: 100%;
        background-color: #e8e8e8;
        border-radius: 10px;

        -webkit-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
        -moz-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
        box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);


        transition: 0.5s;
        max-height: 50vh;

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

      .textArea {
        margin-top: 25px;
        width: 100%;
        height: 120px;
        resize: vertical;
        border-radius: 3px;
      }

      button {
        margin-top: 20px;
        width: 100%;
        border: none;
        background-color: $prettyBlue;
        padding: 20px 0;
        color: white;
        font-size: 1em;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background-color: #4067cf;
        }

        span {
          display: block;
          font-size: 0.8em;
          color: #d7d7d7;
        }
      }
    }

  }

</style>
