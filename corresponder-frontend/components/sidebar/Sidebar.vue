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


    <div class="collections"  :class="{goUp: pageYOffset > 60}">
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

        isMovingRooms: false
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
    mounted(){
      const rooms = this.$refs.rooms
      const friends = this.$refs.friends
      if(!rooms)
        return

      let mouseY = 0

      rooms.$el.addEventListener('mousedown', event =>{

        this.isMovingRooms = true
        rooms.$el.style.boxShadow = '8px 8px 8px 0px rgba(0,0,0,0.75)'
        rooms.$el.style.zIndex = '66'

        mouseY = event.y
      })


      let difference

      window.addEventListener('mousemove', event =>{

        if(this.isMovingRooms){
          difference = event.y - mouseY
          rooms.$el.style.transform = `translateY(${difference}px)`
        }

      })

      window.addEventListener('mouseup', event =>{
        this.isMovingRooms = false
        const fromTop = rooms.$el.offsetTop + difference
        rooms.$el.style.boxShadow = 'none'
        rooms.$el.style.transform = 'translateY(0)'

        if(fromTop > friends.$el.offsetTop){
          rooms.$el.style.gridRow = 2
          friends.$el.style.gridRow = 1
        }
        else{
          rooms.$el.style.gridRow = 1
          friends.$el.style.gridRow = 2
        }

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
