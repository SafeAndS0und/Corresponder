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

    <Rooms v-if="loggedIn && !folded" :class="{goUp: pageYOffset > 60}" class="rooms"/>
    <Friends v-if="loggedIn && !folded" class="friends"/>

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
        body: null
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

    .rooms {
      transition: 0.5s;
      margin-top: 90px;
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
