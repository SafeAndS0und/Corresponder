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
    font-size: .95em;
    height: 25px;
    padding: 5px 8px;
    transition: 0.3s;

    &:active, &:focus{
      outline: none;
      background-color: #2c5db9;

      &::placeholder{
        color: #e1e1e1;
      }
    }
  }

</style>
