<template>
  <section>

    <span class="scrollbar"
          :style="{
          top: scrollPercentage >= 95 ? (95 * proportion) + '%' : scrollPercentageProportion + '%'}"
          :class="{moving: isScrollbarMoving}"
          v-if="showScrollbar && !isEmpty"
    ></span>

    <div class="msg-list" v-if="!isEmpty">

      <article v-for="message of $store.state.chat.messages">

        <div class="msg-info">
          <h2>{{message.owner.firstname}} {{message.owner.surname}}</h2>
          <p>{{new Date(message.createdAt).toLocaleString()}}</p>
        </div>

        <div class="msg-content" v-html="colorizedMsg(message.content)"></div>

      </article>

    </div>

    <div v-else class="empty">
      It's just silence and darkness here : ( <br/>
      Don't be shy - why don't you start the conversation?
    </div>

  </section>
</template>

<script>
  export default {
    name: "Messages",
    data(){
      return {
        messages: [],

        scrollPercentage: null,
        scrollPercentageProportion: 3,
        proportion: 1,
        isScrollbarMoving: false,
        showScrollbar: false
      }
    },

    computed: {
      isEmpty(){
        return this.$store.state.chat.messages.length <= 0
      }
    },

    mounted(){
      const messages = document.querySelector('.messages')
      this.showScrollbar = messages.scrollHeight > messages.clientHeight

      messages.addEventListener('wheel', e =>{
        setTimeout(() =>{
          this.isScrollbarMoving = true // For toggling .moving class transition

          this.showScrollbar = messages.scrollHeight > messages.clientHeight

          const containerHeight = messages.scrollHeight - messages.clientHeight
          const scrolledFromTop = messages.scrollTop

          this.proportion = (messages.scrollHeight / messages.clientHeight) > 1
            ? (messages.scrollHeight / messages.clientHeight)
            : 1

          this.scrollPercentage = (scrolledFromTop / containerHeight * 100)
          this.scrollPercentageProportion = (scrolledFromTop / containerHeight * 100) * this.proportion
          console.log(this.scrollPercentageProportion)

          if(this.scrollPercentageProportion < 4)
            this.scrollPercentageProportion = 3

          setTimeout(() => this.isScrollbarMoving = false, 300)
        }, 180)
      })
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

    .scrollbar {
      position: absolute;
      background-color: #373737;
      opacity: .25;
      right: 4px;
      width: 7px;
      height: 15%;
      border-radius: 20px;
      transition: .45s;
      transition-timing-function: linear;

      &:hover {
        opacity: .65;
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

          /deep/ .mention {
            color: #1d6cdb;
          }

          border-bottom: 1px solid #dcdcdc;

        }
      }
    }

    .empty{
      padding: 12px 0;
      font-size: 0.95em;
      color: #848788;
      text-align: center;
      line-height: 18px;
    }
  }

  /* Transitions */

  .moving {
    transform: scaleX(0.7) scaleY(1.5);
  }

</style>
