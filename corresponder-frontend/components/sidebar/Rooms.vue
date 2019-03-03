<template>
  <div class="rooms">
    <header>
      <h3 class="name" @click="expandRoomList = !expandRoomList">Rooms</h3>

      <div class="options">
        <v-icon name="plus-square" class="option"/>
        <v-icon name="search" class="option"/>
      </div>
    </header>

    <div class="room-list"  v-if="expandRoomList">
      <article v-for="room of rooms" @click="switchRoom(room)">
        <h3 class="room-name">{{room.name}}</h3>
        <v-icon name="times" class="leave" scale="1.4" />
      </article>
    </div>


  </div>
</template>

<script>
  export default {
    name: "Rooms",
    data(){
      return {
        expandRoomList: true,
        rooms: [
          {name: 'Tesla Lovers', description: "For every tesla owner... and the future ones, too!"},
          {name: 'Memes', description: "Super funny memes omg"},
          {name: 'GAMES *.*', description: "Join only if you're a true gamer. No girls allowed!"},
        ]
      }
    },
    methods: {
      switchRoom(room){
        this.$store.dispatch('chat/switchChat', {
          name: room.name,
          description: room.description,
          chatType: 'room',
          chatId: 1
        })
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables';

  .rooms {

    header {
      width: 100%;
      padding: 12px 4px;
      background-color: $s_titleGrey;
      display: grid;
      grid-template-columns: 2fr 0.52fr;
      align-items: center;
      color: #d7d7d7;

      .name {
        color: #ffffff;
        padding-left: 10px;
        font-weight: 400;
        font-size: 1em;
        letter-spacing: 3px;
        cursor: pointer;
        transition: 0.2s;

        &:hover{
          color: #75df60;
        }
      }

      .options {
        display: grid;
        height: 100%;
        align-items: center;
        grid-auto-flow: column;

        .option {
          font-size: 0.80em;
          cursor: pointer;

          &:hover {
            color: white;
          }
        }
      }
    }

    .room-list {
      article{
        position: relative;
        padding: 10px 15px;
        background-color: $s_articleGrey;
        color: #e6e6e6;
        cursor: pointer;
        border-bottom: 1px solid #2c2d30;
        transition: 0.15s;

        &:hover{
          background-color: #26252f;
        }

        .room-name {
          font-weight: 300;
          font-size: 0.8em;
          letter-spacing: 3px;
        }

        .leave{
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          color: #72191e;

          &:hover{
            color: #d42338;;
          }
        }
      }
    }

  }

</style>
