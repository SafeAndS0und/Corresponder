<template>
    <section class="chat">
      <div class="room-window">
        <h3>{{$store.state.chat.name}}</h3>
        <p>{{$store.state.chat.description}}</p>

        <section class="messages">
          <h4>Here will be your messages</h4>
        </section>

      </div>


    </section>
</template>

<script>
   export default {
      name: "MainChat"
   }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables.scss';

  .chat{

    .room-window{
      margin: 0 120px 0 80px;
      padding: 5px 20px;
      color: #404040;

      h3{
        font-size: 26px;
        font-weight: 400;
        letter-spacing: 2px;
        margin-bottom: 5px;
      }
      p{
        color: #707070;
      }

      .messages{
        margin: 15px 0;
        width: 100%;
        background-color: #e5e5e5;
        border-radius: 5px;

        -webkit-box-shadow: 3px 3px 5px 0 rgba(173,173,173,1);
        -moz-box-shadow: 3px 3px 5px 0 rgba(173,173,173,1);
        box-shadow: 3px 3px 5px 0 rgba(173,173,173,1);

        h4{
          text-align: center;
          font-weight: 400;
          color: #525252;
          padding: 150px 0;
        }
      }
    }

  }

</style>
