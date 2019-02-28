<template>
  <div>

    <Navbar class="navbar"/>
    <Sidebar class="sidebar"/>

    <nuxt class="content"/>
  </div>
</template>

<script>
  import Navbar from '../components/Navbar.vue'
  import Sidebar from '../components/Sidebar.vue'

  export default {
    components: {Navbar, Sidebar}

  }
</script>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Questrial');

  html {
    font-size: 16px;
    word-spacing: 1px;
    -ms-text-size-adjust: 100%;
    -webkit-text-size-adjust: 100%;
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    box-sizing: border-box;
    margin: 0;
    padding: 0;

  }
  *{
    font-family: 'Questrial', cursive;
  }

  body{
    margin: 0;
    padding: 0;
    background-color: #f3f3f3;
  }

  *,
  *:before,
  *:after {
    box-sizing: border-box;
    margin: 0;
  }


  div{
    position: relative;

    .sidebar{
      z-index: 1;
      position: fixed;
      left: 0;
      top: 0;
      height: 100vh;
      width: 25%;
    }

    .navbar{
      position: relative;
      z-index: 12;
    }
    .content{
      position: absolute;
      left:25%;
      top: 50px;
      width: 75%;

    }
  }

</style>
