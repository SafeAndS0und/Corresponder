<template>
  <nav>
    <h1 :class="{invisible: folded}">
      Cor<span>respond</span>er
    </h1>
    <p :class="{invisible: folded}">
      Simple Real-Time-Communication app
    </p>



    <nuxt-link to="/SignUp"
               v-if="!loggedIn"
               :class="{dark: $store.state.appThemeColor === 'dark'}">
      Sign up
    </nuxt-link>
    <button
      v-if="loggedIn && showLogout"
      class="logout"
      @click="logout"
      :class="{dark: $store.state.appThemeColor === 'dark'}">
      Logout
    </button>
  </nav>
</template>

<script>
  export default {
    props: ["folded"],
    name: "navbar",
    data(){
      return {
        body: '',
        width: null
      }
    },
    beforeMount(){
      this.width = document.documentElement.clientWidth
      window.onresize = () =>{
        this.width = document.documentElement.clientWidth
      }
    },
    methods: {
      logout(){
        this.$store.dispatch('user/logout')
      }
    },
    computed: {
      loggedIn(){
        if(process.client){
          return this.$store.getters['user/isLoggedIn']
        }
      },
      showLogout(){
        if(this.width > 860 && !this.folded)
          return true
        else if(!this.folded && this.width < 860)
          return true
        else
          return false
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../assets/css/variables.scss';

  nav {
    height: 50px;
    width: 100%;
    position: relative;

    h1 {
      line-height: 50px;
      padding-left: 15px;
      font-size: 30px;
      font-weight: 400;
      letter-spacing: 2px;
      color: white;
      margin: 0;

      span {
        color: $basicLightGreen;
      }
    }

    p {
      margin: 0;
      padding: 0 15px;
      font-size: 0.85em;
      color: #bcbcbc;

    }

    h1, p {
      transition: .5s;
    }

    a, .logout {
      padding: 12px 30px;
      position: absolute;
      right: 25px;
      top: 15px;
      font-weight: 400;
      color: white;
      background-color: $basicLightGreen;
      text-decoration: none;
      cursor: pointer;
      border: none;
      border-radius: 35px;

      font-size: 0.9em;

      -webkit-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
      -moz-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
      box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);

      transition: 0.2s;

      &:hover {
        background-color: #5bc35b;
      }
    }
  }

  .invisible {
    opacity: 0;
    transition: 0.2s !important;
  }

  @media screen and (max-width: $mobile) {

    nav {
      a, .logout {
        top: 8px;
        right: 8px;
        padding: 9px 15px;
        -webkit-box-shadow: none;
        -moz-box-shadow: none;
        box-shadow: none;
      }
    }
  }

</style>
<style>
  .dark {
    background-color: #18181c !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
  }
</style>
