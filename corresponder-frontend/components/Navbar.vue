<template>
  <nav>
    <h1 :class="{invisible: folded}">
      Cor<span>respond</span>er
    </h1>
    <p :class="{invisible: folded}">
      Simple Real-Time-Communication app
    </p>

    <div class="moon" @click="switchThemeColor">
      <v-icon :class="{invisible: folded}"
              name="regular/moon"
              scale="1.6"
      />
    </div>

    <nuxt-link to="/SignUp"
               v-if="!loggedIn"
               :class="{dark: $store.state.appThemeColor === 'dark'}">
      Sign up
    </nuxt-link>
    <button
      v-if="loggedIn"
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
        body: ''
      }
    },
    beforeMount(){
      this.body = document.body
    },
    methods: {
      switchThemeColor(){
        this.$store.dispatch('switchThemeColor')
        this.body.classList.toggle('dark')
        console.log(this.body.className)
      },
      logout(){
        this.$store.dispatch('user/logout')
      }
    },
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

    .moon {
      position: absolute;
      top: 25px;
      left: 22%;
      color: #69747d;
      cursor: pointer;
      transition: 1.5s;

      &:hover {
        color: #fff;
      }
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

</style>
<style>
  .dark {
    background-color: #1f2023 !important;
    -webkit-box-shadow: none !important;
    -moz-box-shadow: none !important;
    box-shadow: none !important;
  }
</style>
