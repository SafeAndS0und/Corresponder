import Vue from 'vue'
import axios from 'axios'
import onPageRefresh from '../assets/js/onPageRefresh'


export default async({app: {store}}) =>{

  const axiosInstance = axios.create({
    baseURL: 'http://192.168.100.6:3002/'
  })

  await onPageRefresh(axiosInstance, store)

  axiosInstance.defaults.headers.common['Authorization'] = localStorage.getItem('token') // assign the token to every axios request

  Vue.prototype.axios = axiosInstance
}
