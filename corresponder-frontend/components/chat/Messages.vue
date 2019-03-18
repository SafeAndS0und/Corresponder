<template>
  <section>

    <span class="scrollbar"></span> <!-- TODO: I thinks its gonna be outside the Messages.vue -->

    <div class="msg-list">

      <article v-for="message of $store.state.chat.messages">

        <div class="msg-info">
          <h2>{{message.owner.substring(0, 16)}}</h2>
          <p>{{message.createdAt}}</p>
        </div>

        <div class="msg-content" v-html="colorizedMsg(message.content)"></div>

      </article>

    </div>

  </section>
</template>

<script>
  export default {
    name: "Messages",
    data(){
      return {
        messages: []
      }
    },
    methods: {
      colorizedMsg(msg){
        let newStr = ''
        let begins = msg.indexOf('@')

        // TODO: make it into a while loop, to catch all '@'

        if(begins !== -1){
          let ends = msg.indexOf(' ', begins) !== -1
            ? msg.indexOf(' ', begins)
            : msg.length

          newStr = msg.substring(0, begins) + '<span class="mention">' + msg.substring(begins, ends) + '</span>' + msg.substring(ends, msg.length)
          return newStr
        }
        else return msg
      }
    }
  }
</script>

<style scoped lang="scss">

  section {
    padding: 10px 15px;
    position: relative;


    &::-webkit-scrollbar {
      width: 0;
      background: transparent;
    }
    overflow-y: scroll;

    .scrollbar{
      position: absolute;
      background-color: #1a1e28;
      opacity: 0.3;
      right: 4px;
      width: 7px;
      height: 40px;
      border-radius: 20px;
      transition: .25s;

      &:hover{
        opacity: .6;
      }
    }

    .msg-list {

      article {
        display: grid;
        grid-template-columns: 1fr 4fr;
        margin: 10px 0 20px 0;

        .msg-info {

          h2 {
            color: #535255;
            font-size: 1.05em;
            font-weight: 400;
            margin-bottom: 4px;
          }
          p {
            font-size: 0.82em;
            color: #9a969b;
          }
        }

        .msg-content {
          padding-top: 4px;
          padding-bottom: 10px;
          font-size: 0.92em;
          font-weight: 400;
          color: #5f5f5f;

          /deep/ .mention{
            color: #1d6cdb;
          }

          border-bottom: 1px solid #dcdcdc;

        }
      }
    }

  }

</style>
