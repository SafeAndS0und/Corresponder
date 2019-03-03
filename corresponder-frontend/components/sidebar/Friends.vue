<template>
  <div class="friends">
    <header>
      <h3 class="name" @click="expandFriendList = !expandFriendList">Friends</h3>

      <div class="options">
        <v-icon name="search" class="option"/>
      </div>
    </header>

    <div class="friends-list" v-if="expandFriendList">
      <article v-for="friend of friends" @click="switchFriend(friend)">
        <h3 class="friend-name">{{friend.name}}</h3>
        <v-icon name="ellipsis-h" class="interact" scale="1.3"/>
      </article>
    </div>


  </div>
</template>

<script>
  export default {
    name: "Friends",
    data(){
      return {
        expandFriendList: true,
        friends: [
          {name: 'Ericka'},
          {name: 'Michael Toyd'},
          {name: 'John Redneck'},
          {name: 'Stancy'},
          {name: 'Peter Grunt'},
        ]
      }
    },
    methods: {
      switchFriend(friend){
        this.$store.dispatch('chat/switchChat', {
          name: friend.name,
          chatType: 'friend',
          chatId: 1
        })
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

        .interact{
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          color: #595b60;

          &:hover{
            color: white;
          }
        }
      }

    }

  }


</style>
