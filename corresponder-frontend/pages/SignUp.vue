<template>
  <div class="container">
    <h2 class="title">Sign up and chat with others</h2>
    <div class="form">
      <article>
        <h4>Username</h4>
        <CustomInput v-model="user.username"/>
        <p class="error"></p>
      </article>
      <article>
        <h4>Password</h4>
        <CustomInput v-model="user.password"/>
        <p class="error"></p>
      </article>
      <article>
        <h4>Repeat Password</h4>
        <CustomInput/>
        <p class="error"></p>
      </article>
      <article>
        <h4>Firstname</h4>
        <CustomInput v-model="user.firstname"/>
        <p class="error"></p>
      </article>
      <article>
        <h4>Surname</h4>
        <CustomInput v-model="user.surname"/>
        <p class="error"></p>
      </article>

      <button @click="register(user)">Sign me up!</button>
    </div>
  </div>
</template>

<script>
  import CustomInput from '../components/partials/CustomInput.vue'

  export default {
    name: "SignUp",
    layout: "Empty",
    components: {CustomInput},
    data(){
      return {
        user: {
          username: '',
          password: '',
          firstname: '',
          surname: ''
        }
      }
    },
    methods: {
      register({username, password, firstname, surname}){
        this.axios.post('user', {
          username,
          password,
          firstname,
          surname
        })
          .then(res => console.log(res))
          .catch(err => console.log(err.response))
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../assets/css/variables.scss';

  .container {
    margin: 150px auto 0 auto;
    padding: 40px;
    width: 40%;
    display: grid;
    background-color: #ffffff;

    -webkit-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
    -moz-box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);
    box-shadow: 3px 3px 5px 0 rgba(173, 173, 173, 1);

    .title {
      text-align: center;
      font-weight: 400;
      font-size: 1.5em;
      letter-spacing: 3px;
      padding-bottom: 15px;
    }

    .form {
      margin-top: 20px;
      justify-self: center;
      width: 100%;

      article {
        display: grid;
        grid-template-columns: 35% 65%;
        padding: 12px 0;

        h4 {
          align-self: center;
          font-weight: 300;
          color: #41434b;
        }
      }

      button {
        margin-top: 20px;
        width: 100%;
        border: none;
        background-color: $prettyBlue;
        padding: 20px 0;
        color: white;
        font-size: 1em;
        transition: 0.3s;
        cursor: pointer;

        &:hover {
          background-color: #4067cf;
        }
      }
    }
  }

</style>
