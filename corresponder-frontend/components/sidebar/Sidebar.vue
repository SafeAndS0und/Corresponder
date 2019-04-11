<template>
  <section>

    <v-icon :name="folded ? 'arrow-right' : 'arrow-left'"
            @click.native="emitFold"
            class="arrow"
            scale="1.9"/>

    <div class="moon" @click="switchThemeColor">
      <v-icon :class="{invisible: folded}"
              name="regular/moon"
              scale="1.6"
      />
    </div>

    <h2 v-if="!loggedIn && !folded">
      Hi, I will be your navigation sidebar.
      <br/>
      Just
      <nuxt-link to="/SignUp">Sign up</nuxt-link>
      or Login first!
    </h2>


    <div class="collections" :class="{goUp: pageYOffset > 60}">
      <Rooms v-if="loggedIn && !folded"
             ref="rooms"
             class="rooms"/>
      <Friends v-if="loggedIn && !folded"
               ref="friends"
               class="friends"/>
    </div>
  </section>
</template>

<script>
  import Rooms from './Rooms.vue'
  import Friends from './Friends.vue'

  export default {
    name: "Sidebar",
    components: {Rooms, Friends},
    props: {
      folded: {default: false}
    },
    data(){
      return {
        pageYOffset: null,
        body: null,

        isMoving: {}
      }
    },
    beforeMount(){
      this.body = document.body
    },
    created(){
      document.addEventListener('scroll', () =>{
        this.pageYOffset = window.pageYOffset
      })
    },
    methods: {
      emitFold(){
        this.$emit('fold')
      },

      switchThemeColor(){
        this.$store.dispatch('switchThemeColor')
        this.body.classList.toggle('dark')
      },
    },
    computed: {
      loggedIn(){
        if(process.client){
          return this.$store.getters['user/isLoggedIn']
        }
      },
    }
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables';

  section {
    background-color: $s_mainGrey;
    position: relative;

    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    .arrow {
      position: absolute;
      bottom: 15px;
      right: 15px;
      color: #efe9f0;
      cursor: pointer;
      z-index: 100;

      &:hover {
        color: #ccc7cd;
      }
    }

    .moon {
      position: absolute;
      top: 50px;
      right: 16px;
      color: #69747d;
      cursor: pointer;
      transition: 1.5s;

      &:hover {
        color: #fff;
      }
    }

    h2 {
      box-sizing: border-box;
      width: 100%;
      display: block;
      margin: auto;
      text-align: center;
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      line-height: 30px;

      color: white;
      font-weight: 400;
      font-size: 1.1em;

      a {
        color: $prettyBlue;
      }
    }

    .collections {
      display: grid;
      margin-top: 90px;

      .rooms {
        transition: 0.1s;
        grid-row: 1;
      }

      .friends {
        transition: 0.1s;
        grid-row: 2;
      }
    }

    .goUp {
      margin-top: 0 !important;
    }
  }

  @media screen and (max-width: $mobile) {

    section {
      .arrow {
        display: none;
      }
    }

  }

</style>
