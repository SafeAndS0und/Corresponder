<template>
  <textarea
    type="text"
    v-bind:value="value"
    v-on:input="$emit('input', $event.target.value)"
    spellcheck="false"
  ></textarea>
</template>

<script>
  export default {
    name: "CustomTextArea",
    props: ['value'],
  }
</script>

<style scoped lang="scss">

  textarea{
    min-height: 80px;
    max-height: 250px;
    padding: 10px;

    border: none;
    background-color: #e1e1e1;
    color: #545454;
    -webkit-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
    -moz-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
    box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
    font-size: 1em;
    transition: 0.25s;

    &:active, &:focus{
      outline: none;
      background-color: #4572dc;
      color: white;

      &::placeholder{
        color: #d7d7d7;
      }
    }
  }

</style>
