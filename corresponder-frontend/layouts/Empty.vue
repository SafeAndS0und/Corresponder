<template>
  <div>
    <div class="home" @click="$router.push('/')">
      <v-icon name="home" scale="1.6"/>
    </div>
    <nuxt/>
  </div>
</template>

<script>
  export default {
    name: "Empty"
  }
</script>

<style scoped lang="scss">

  .home {
    z-index: 10;
    position: fixed;
    top: 0;
    left: 0;
    padding: 22px 28px;
    color: #ffffff;
    transition: 0.3s;
    background-color: #c9d0e1;
    cursor: pointer;
    border-bottom-right-radius: 15px;

    &:hover{
      color: white;
      background-color: #2963ff;
    }
  }

</style>
