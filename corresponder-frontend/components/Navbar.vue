<template>
  <nav>
    <h1 :class="{invisible: folded}">
      Cor<span>respond</span>er
    </h1>
    <p :class="{invisible: folded}">
      Simple Real-Time-Communication app
    </p>

    <nuxt-link to="/SignUp">
      Sign up
    </nuxt-link>
  </nav>
</template>

<script>
  export default {
    props: ["folded"],
    name: "navbar"
  }
</script>

<style scoped lang="scss">

  @import '../assets/css/variables.scss';

  nav {
    height: 50px;
    width: 100%;

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

    p{
      margin: 0;
      padding: 0 15px;
      font-size: 0.85em;
      color: #bcbcbc;

    }

    h1, p{
      transition: .5s;
    }

    a{
      padding: 12px 30px;
      position: absolute;
      right: 25px;
      top:15px;
      font-weight: 400;
      color: white;
      background-color: $basicLightGreen;
      text-decoration: none;
      border-radius: 35px;

      -webkit-box-shadow: 3px 3px 5px 0 rgba(173,173,173,1);
      -moz-box-shadow: 3px 3px 5px 0 rgba(173,173,173,1);
      box-shadow: 3px 3px 5px 0 rgba(173,173,173,1);

      transition: 0.2s;

      &:hover{
        background-color: #5bc35b;
      }
    }
  }

  .invisible{
    opacity: 0;
  }

</style>
