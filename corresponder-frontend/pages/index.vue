<template>
  <section class="container">
    <MainChat v-if="loggedIn && $store.state.chat.name"/>

    <div v-if="loggedIn && !$store.state.chat.name" class="not-chosen">
      Start a conversation with someone :)
    </div>

    <Login v-if="!loggedIn"/>
  </section>
</template>

<script>
  import MainChat from '../components/chat/MainChat.vue'
  import Login from '../components/Login.vue'

  export default {
    components: {MainChat, Login},
    computed: {
      loggedIn(){
        if(process.client){
          return this.$store.getters['user/isLoggedIn']
        }
      }
    }

  }
</script>

<style scoped lang="scss">
  .container{

    div{
      margin-top: 200px;
      text-align: center;
      color: #585858;
      font-size: 23px;
      letter-spacing: 3px;
      font-weight: 300;
    }
  }

</style>
