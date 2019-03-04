<template>
  <input type="text"
         v-bind:value="value"
         v-on:input="$emit('input', $event.target.value)"
  >
</template>

<script>
  export default {
    name: "CustomInput",
    props: ['value'],
  }
</script>

<style scoped lang="scss">

  input{
    border: none;
    background-color: #3e3e41;
    color: #ffffff;
    font-weight: 300;
    height: 25px;
    padding: 5px 8px;
    transition: 0.3s;

    &:active, &:focus{
      outline: none;
      background-color: #2659a0;
    }
  }

</style>
