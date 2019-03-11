<template>
  <div class="friends">
    <header>
      <h3 class="name" @click="expandFriendList = !expandFriendList">Friends</h3>

      <div class="options">
        <v-icon name="search" @click.native="showSearching = !showSearching" class="option"/>
      </div>
    </header>

    <Searching forWhat="friends" @addedToList="refreshFriendList" v-if="showSearching"/>

    <div class="friends-list" v-if="expandFriendList">
      <article v-for="(friend, index) of friends" @click="switchFriend(friend)">
        <h3 class="friend-name">{{friend.firstname}} {{friend.surname}}</h3>
        <v-icon name="ellipsis-h" @click.native="toggleMenu(friend._id)" class="interact" scale="1.3"/>

        <div class="menu" v-if="showMenu[friend._id]">
          <button>
            <div>
              <p>Show profile</p>
              <v-icon name="user" class="icon" scale="1"/>
            </div>
          </button>
          <button>
            <div>
              <p>Make a voice call</p>
              <v-icon name="phone" class="icon phone" scale="1"/>
            </div>
          </button>
          <button>
            <div>
              <p>Make a video call</p>
              <v-icon name="video" class="icon video" scale="1"/>
            </div>
          </button>
          <button>
            <div>
              <p>Remove Friend</p>
              <v-icon name="times" class="icon times" scale="1"/>
            </div>
          </button>
        </div>
      </article>
    </div>


  </div>
</template>

<script>
  import Searching from './Searching.vue'

  export default {
    name: "Friends",
    components: {Searching},
    data(){
      return {
        expandFriendList: true,
        friends: [],

        showSearching: false,
        showMenu: []
      }
    },
    created(){
      this.axios.get('/friends')
        .then(res =>{
          this.friends = res.data

          this.friends.forEach((friend, index) =>{
            this.$set(this.showMenu, friend._id, false) // needed to make it reactive
          })
        })
        .catch(err => console.error(err.response))
    },
    methods: {
      switchFriend(friend){
        this.$store.dispatch('chat/switchChat', {
          name: friend.firstname + ' ' + friend.surname,
          chatType: 'friend',
          chatId: 1
        })
      },
      toggleMenu(id){
        this.showMenu[id] = !this.showMenu[id]
      },
      refreshFriendList({inside}){
        if(inside !== 'friends') return
        this.axios.get('/friends')
          .then(res => this.friends = res.data)
          .catch(err => console.error(err.response))
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables';

  .friends {

    header {
      width: 100%;
      padding: 12px 4px;
      background-color: $s_titleGrey;
      display: grid;
      grid-template-columns: 2fr 0.25fr;
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

        .option {
          font-size: 0.80em;
          cursor: pointer;

          &:hover {
            color: white;
          }
        }
      }
    }

    .friends-list {
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

        .friend-name {
          font-weight: 300;
          font-size: 0.8em;
          letter-spacing: 3px;
        }

        .interact {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #595b60;

          &:hover {
            color: white;
          }
        }

        .menu {
          position: absolute;
          left: 100%;
          top: 0;
          border: 2px solid #abbacd;
          border-left: none;

          -webkit-box-shadow: 3px 2px 7px 0 #aaaaaa;
          -moz-box-shadow: 3px 2px 7px 0 #aaaaaa;
          box-shadow: 3px 2px 7px 0 #aaaaaa;

          button {
            width: 200px;
            padding: 14px 15px 0 15px;
            border: none;
            background-color: #ffffff;
            color: #4f6985;
            cursor: pointer;

            div {
              border-bottom: 1px solid #d7d7d7;
              padding-bottom: 14px;
              width: 100%;
              text-align: left;

              .icon {
                display: inline-block;
                float: right;
                margin-right: 5px;
              }

              .times{
                color: #9a1617;
              }
              .phone{
                color: #69c54c;
              }
              .video{
                color: #0064c2;
              }

              p {
                display: inline;

              }

            }

            &:hover {
              background-color: $prettyBlue;


              div {
                color: white !important;
                border-bottom: 1px solid transparent;

                .icon{
                  color: white !important;
                }
              }
            }

            &:last-child {

              div{
                border: none;
              }
            }
          }
        }
      }

    }

  }


</style>
