<template>
  <section class="login">
    <h2 class="title">Please login to browse the Corresponder content</h2>
    <CustomInput v-model="username" placeholder="Username"/>
    <CustomInput v-model="password" placeholder="Password"/>
    <p class="errMsg">{{err}}</p>
    <p class="success">{{success}}</p>
    <button @click="login">Login</button>
  </section>
</template>

<script>
  import CustomInput from './partials/CustomInput.vue'

  export default {
    name: "Login",
    components: {CustomInput},
    data(){
      return {
        username: '',
        password: '',
        err: '',
        success: ''
      }
    },
    methods: {
      login(){
        this.axios.post('/user/login', {
          username: this.username,
          password: this.password
        })
          .then(res =>{
            this.success = res.data.msg
            this.$store.dispatch('user/login', {
              username: this.username, token: res.data.token
            })
          })
          .catch(err => this.err = err.response.data)
      }
    }
  }
</script>

<style scoped lang="scss">

  @import '../assets/css/variables.scss';

  .login {
    margin: 100px 20%;
    padding: 40px;
    background-color: white;

    -webkit-box-shadow: 3px 3px 10px 0 rgba(179, 179, 179, 1);
    -moz-box-shadow: 3px 3px 10px 0 rgba(179, 179, 179, 1);
    box-shadow: 3px 3px 10px 0 rgba(179, 179, 179, 1);

    .title {
      font-size: 1.2em;
      font-weight: 400;
      margin-bottom: 30px;
      text-align: center;
    }

    input {
      margin: 10px auto;
      display: block;
      height: 30px;
      width: 75%;
    }

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

    .errMsg, .success {
      text-align: center;
      font-size: 0.9em;
    }

    .errMsg {
      color: #ad0000;
    }
    .success {
      color: #3b8239;
    }
  }
</style>
