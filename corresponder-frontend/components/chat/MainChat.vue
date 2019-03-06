<template>
  <section class="chat">
    <div class="room-window">
      <h3>{{$store.state.chat.name}}</h3>
      <p>{{$store.state.chat.description}}</p>

      <section class="messages" :class="{dark: $store.state.appThemeColor === 'dark'}">
        <h4>Here will be your messages</h4>
      </section>

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

  export default {
    name: "MainChat",
    components: {CustomTextArea}
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables.scss';

  .chat {

    .room-window {
      margin: 0 120px 0 80px;
      padding: 5px 20px;
      color: #404040;

      h3 {
        font-size: 26px;
        font-weight: 400;
        letter-spacing: 2px;
        margin-bottom: 5px;
      }
      p {
        color: #707070;
      }

      .messages {
        margin: 15px 0;
        width: 100%;
        background-color: #e5e5e5;
        border-radius: 5px;

        -webkit-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
        -moz-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
        box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);

        transition: 0.5s;
        max-height: 60vh;

        h4 {
          text-align: center;
          font-weight: 400;
          color: #525252;
          padding: 180px 0;
        }
      }

      .dark {
        background-color: #28292d !important;

        h4 {
          color: #9b9b9b !important;
        }

        &:active, &:focus{
          color: #cdbdc9;
          background-color: #24262f !important;
        }

      }

      .darkBtn{
        background-color: #222a41 !important;

        &:hover{
          background-color: #1f2537 !important;
        }
      }

      .textArea {
        margin-top: 25px;
        width: 100%;
        height: 120px;
        resize: vertical;
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

        span{
          display: block;
          font-size: 0.8em;
          color: #d7d7d7;
        }
      }
    }

  }

</style>
