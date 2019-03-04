<template>
  <section class="container">
    <MainChat v-if="loggedIn"/>
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

<style>


</style>
