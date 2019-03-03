<template>
  <div class="rooms">
    <header>
      <h3 class="name" @click="expandRoomList = !expandRoomList">Rooms</h3>

      <div class="options">
        <p class="option">Find rooms</p>
        <p class="option">Create new room</p>
      </div>
    </header>

    <div class="room-list"  v-if="expandRoomList">
      <article v-for="room of rooms">
        <h3 class="room-name">{{room.name}}</h3>
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
          {name: 'Tesla Lovers'},
          {name: 'Memes'},
          {name: 'GAMES *.*'},
        ]
      }
    }
  }
</script>

<style scoped lang="scss">

  .rooms {

    header {
      width: 100%;
      padding: 12px 4px;
      background-color: #1a1b1e;
      display: grid;
      grid-template-columns: 1.7fr 1fr;
      align-items: center;
      color: #d7d7d7;

      .name {
        color: #ffffff;
        padding-left: 10px;
        font-weight: 400;
        font-size: 1.1em;
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

        .option {
          font-size: 0.85em;
          cursor: pointer;

          &:hover {
            color: white;
          }
        }

        .option:first-child {
          padding: 0 0 8px 0;
        }
      }
    }

    .room-list {
      article{
        padding: 10px;
        background-color: #222326;
        color: #e6e6e6;
        cursor: pointer;
        border-bottom: 1px solid #2c2d30;
        transition: 0.15s;

        &:hover{
          background-color: #2a2b2e;
        }

        .room-name {
          font-weight: 300;
          font-size: 0.9em;
          letter-spacing: 3px;
        }
      }
    }

  }

</style>
