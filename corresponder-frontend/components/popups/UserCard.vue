<template>
  <div class="user-popup">

    <header>
      <nuxt-link to="#">Visit profile</nuxt-link>
      <v-icon name="times" @click.native.stop="$emit('close')" class="close" scale="1.5" />
      <img :src="profilePic" alt="Profile Picture">
    </header>

    <main>
      <h1>{{name}}</h1>
      <h3>{{username}}</h3>

      <section class="icons">
        <v-icon name="brands/facebook" class="icon" scale="2.5"/>
        <v-icon name="brands/instagram" class="icon" scale="2.5"/>
        <v-icon name="brands/github" class="icon" scale="2.5"/>
        <v-icon name="brands/discord" class="icon" scale="2.5"/>
      </section>

      <p>Joined on {{joined}}</p>
    </main>

  </div>
</template>

<script>
  export default {
    name: "User",
    props: ["profilePic", "name", "username", "joined"]
  }
</script>

<style scoped lang="scss">

  @import '../../assets/css/variables.scss';

  .user-popup {
    background-color: $c_mainBlue;
    color: white;
    border: 7px solid $c_mainBlue;
    border-radius: 2px;
    opacity: .8;
    transition: .5s;

    -webkit-box-shadow: 4px 4px 10px 0 rgba(180, 180, 180, 0.75);
    -moz-box-shadow: 4px 4px 10px 0 rgba(180, 180, 180, 0.75);
    box-shadow: 4px 4px 10px 0 rgba(145, 145, 145, 0.75);

    &:hover {
      opacity: .96;
    }

    header {
      background-color: white;
      padding: 4px;
      position: relative;

      a {
        position: absolute;
        top: 0;
        left: 0;
        font-size: 0.88em;
        color: #fbfdff;
        text-decoration: none;
        padding: 10px 6px;
        border-bottom-right-radius: 10px;
        background-color: $c_mainBlue;

        &:hover{
          background-color: $c_socials;
        }
      }

      .close{
        position: absolute;
        top: 6px;
        right: 8px;
        color: #749bb8;

        &:hover{
          color: #308ce7;
        }
      }

      img {
        max-height: 120px;
        max-width: 120px;
        border-radius: 60px;
        display: block;
        margin: 10px auto;
        border: 2px solid #93b4d8;

        -webkit-box-shadow: 6px 4px 10px 0 rgba(180, 180, 180, 0.75);
        -moz-box-shadow: 4px 4px 10px 0 rgba(180, 180, 180, 0.75);
        box-shadow: 4px 5px 16px 0 rgba(145, 145, 145, 0.75);

      }
    }

    main {
      padding: 5px 15px;
      display: grid;

      h1 {
        text-align: center;
        font-size: 1.5em;
        padding: 6px;
        letter-spacing: 1px;
      }

      h3 {
        text-align: center;
        font-size: 1em;
      }

      .icons {
        justify-self: center;
        margin: 24px auto 12px auto;
        padding: 0;
        height: 50px;
        background-color: $c_socials;

        .icon {
          padding: 10px;
          margin: 0;
          height: 100%;
          width: 50px;
          cursor: pointer;
          transition: .25s;

          &:hover {
            transform: scale(1.1);
            background-color: #3f55aa;
          }
        }
      }

      p {
        margin-top: 20px;
        text-align: right;
        font-size: .9em;
      }

    }
  }

</style>
