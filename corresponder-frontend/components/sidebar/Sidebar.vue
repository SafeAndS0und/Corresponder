<template>
  <section>

    <v-icon :name="folded ? 'arrow-right' : 'arrow-left'"
            @click.native="emitFold"
            class="arrow"
            scale="1.9"/>

    <h2 v-if="!isLogged && !folded">
      Hi, I will be your navigation sidebar.
      <br/>
      Just
      <nuxt-link to="/SignUp">Sign up</nuxt-link>
      or
      <nuxt-link to="#">Login</nuxt-link>
      first!
    </h2>

    <keep-alive>
      <Rooms v-if="isLogged && !folded" class="rooms"/>
    </keep-alive>

    <keep-alive>
      <Friends v-if="isLogged && !folded" class="friends"/>
    </keep-alive>

  </section>
</template>

<script>
  import Rooms from './Rooms.vue'
  import Friends from './Friends.vue'

  export default {
    name: "Sidebar",
    components: {Rooms, Friends},
    data(){
      return {
        isLogged: true,
        folded: false
      }
    },
    methods: {
      emitFold(){
        this.$emit('fold')
        this.folded = !this.folded
      }
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
      margin-top: 90px;
    }
  }

</style>
