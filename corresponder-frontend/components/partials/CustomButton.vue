<template>
  <button @click="login"><slot></slot></button>
</template>

<script>
   export default {
      name: "CustomButton"
   }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables.scss';

  button {
    display: block;
    margin: 20px auto 0 auto;
    width: 75%;
    border: none;
    background-color: $prettyBlue;
    padding: 10px 0;
    color: white;
    font-size: 1em;
    transition: 0.3s;
    cursor: pointer;

    &:hover {
      background-color: #4067cf;
    }
  }
</style>
