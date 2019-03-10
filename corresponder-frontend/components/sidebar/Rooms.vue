<template>
  <div class="rooms">
    <header>
      <h3 class="name" @click="expandRoomList = !expandRoomList">Rooms</h3>

      <div class="options">
        <v-icon name="plus-square" @click.native="togglePopups('creation')" class="option"/>
        <v-icon name="search"  @click.native="togglePopups" class="option"/>
      </div>
    </header>

    <div class="creation" v-if="showCreation">
      <h3>Room creation</h3>
      <CustomInput v-model="newRoomName" placeholder="Your room name"/>
      <CustomInput v-model="newRoomDesc"placeholder="Short description"/>
      <CustomButton @click.native="createNewRoom" class="btn">Create</CustomButton>
    </div>

    <Searching forWhat="rooms" v-if="showSearching"/>

    <div class="room-list" v-if="expandRoomList">
      <article v-for="room of rooms" @click="switchRoom(room)">
        <h3 class="room-name">{{room.name}}</h3>
        <v-icon name="times" @click.native="removeFromTheList(room._id)" class="leave" scale="1.4"/>
      </article>
    </div>


  </div>
</template>

<script>
  import CustomInput from '../partials/CustomInput.vue'
  import CustomButton from '../partials/CustomButton.vue'
  import Searching from './Searching.vue'

  export default {
    name: "Rooms",
    components: {CustomInput, CustomButton, Searching},
    data(){
      return {
        expandRoomList: true,
        rooms: [],
        showCreation: false,
        showSearching: false,

        newRoomName: '',
        newRoomDesc: '',

      }
    },
    created(){
      this.axios.get('/rooms')
        .then(res =>{
          this.rooms = res.data.roomList
        })
        .catch(err => console.log(err.response))
    },
    methods: {
      switchRoom(room){
        this.$store.dispatch('chat/switchChat', {
          name: room.name,
          description: room.description,
          chatType: 'room',
          chatId: 1
        })
      },
      createNewRoom(){
        this.axios.post('/rooms/new', {
          name: this.newRoomName,
          description: this.newRoomDesc,
          uniqueHref: this.newRoomName.toLowerCase()
        })
          .then(res => this.rooms.push(res.data.room))
          .catch(err => console.log(err.response))
      },
      togglePopups(popupName){
        if(popupName === 'creation'){
          this.showCreation = !this.showCreation
          this.showSearching = false
        }else{
          this.showSearching = !this.showSearching
          this.showCreation = false
        }
      },
      removeFromTheList(id){
        this.axios.delete('/rooms/fromList', {
          id
        })
          .then() // update the list
          .catch(err => console.log(err))
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

        &:hover {
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

    .creation {
      padding: 12px 4px;

      h3 {
        text-align: center;
        color: #999999;
        font-weight: 300;
        font-size: 1em;
      }

      input {
        margin: 10px auto;
        display: block;
        height: 30px;
        width: 75%;
        font-size: 0.8em;
      }

      .btn {
        margin-top: 10px;
        width: 75%;
        font-size: .9em;
      }
    }


    .room-list {
      article {
        position: relative;
        padding: 10px 15px;
        background-color: $s_articleGrey;
        color: #e6e6e6;
        cursor: pointer;
        border-bottom: 1px solid #2c2d30;
        transition: 0.15s;

        &:hover {
          background-color: #26252f;
        }

        .room-name {
          font-weight: 300;
          font-size: 0.8em;
          letter-spacing: 3px;
        }

        .leave {
          position: absolute;
          right: 24px;
          top: 50%;
          transform: translateY(-50%);
          color: #72191e;

          &:hover {
            color: #d42338;;
          }
        }
      }
    }

  }

</style>
