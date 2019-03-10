<template>
  <div class="searching">
    <CustomInput v-model="searchedValue" @keyup.enter.native="search" placeholder="I look for..."/>

    <section class="results">
      <article class="result" v-for="result of results">
        {{result[forWhat === 'rooms' ? 'name' : 'username']}}
        <span v-if="forWhat === 'friends'">({{result.firstname}} {{result.surname}})</span>
      </article>
    </section>
  </div>
</template>

<script>
  import CustomInput from '../partials/CustomInput.vue'

  export default {
    name: "Searching",
    components: {CustomInput},
    props: ['forWhat'],
    data(){
      return {
        searchedValue: '',
        results: []
      }
    },
    methods:{
      search(){
        this.axios.get(`/${this.forWhat}/${this.searchedValue}`)
          .then(res => {
            console.log(res.data)
            this.results = res.data[this.forWhat]
          })
          .catch(err => console.log(err))
      }
    }
  }
</script>

<style scoped lang="scss">

  .searching{
    padding: 12px 0 0 0;

    input {
      margin: 10px auto;
      display: block;
      height: 30px;
      width: 75%;
      font-size: 0.8em;
    }

    .results{

      .result{

        font-size: 0.92em;
        padding: 10px 0 10px 16px;
        color: white;
        transition: 0.1s;
        cursor: pointer;

        &:hover{
          background-color: rgba(130, 123, 126, 0.07);
        }

        span{
          color: #92949b;
          font-size: 0.85em;
        }
      }
    }
  }
</style>
