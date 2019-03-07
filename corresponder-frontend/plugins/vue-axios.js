import Vue from 'vue'
import axios from 'axios'
import onPageRefresh from '../assets/js/onPageRefresh'

export default ({app: {store}}) =>{

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3001/'
  })

  onPageRefresh(axiosInstance, store)

  Vue.prototype.axios = axiosInstance
}
