import Vue from 'vue'
import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001/'
})

Vue.prototype.axios= axiosInstance
