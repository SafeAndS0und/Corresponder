import Vue from 'vue'
import axios from 'axios'
import onPageRefresh from '../assets/js/onPageRefresh'

export default async({app: {store}}) =>{

  const axiosInstance = axios.create({
    baseURL: 'http://localhost:3002/'
  })

  await onPageRefresh(axiosInstance, store)

  Vue.prototype.axios = axiosInstance
}
