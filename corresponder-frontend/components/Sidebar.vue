<template>
  <section>

    <h2>
      Hi, I will be your navigation sidebar.
      <br/>
      Just <nuxt-link to="/SignUp">Sign up</nuxt-link> or
      <nuxt-link to="#">Login</nuxt-link> first!
    </h2>

  </section>
</template>

<script>
   export default {
      name: "Sidebar"
   }
</script>

<style scoped lang="scss">

  @import '../assets/css/variables.scss';

  section{
    background-color: #323437;


    h2{
      box-sizing: border-box;
      width: 100%;
      display: block;
      margin: auto;
      text-align: center;
      position: absolute;
      top:50%;
      transform: translateY(-50%);
      line-height: 30px;

      color: white;
      font-weight: 400;
      font-size: 1.2em;

      a{
        color: $prettyBlue;
      }
    }
  }

</style>
