import Vue from 'vue'
import axios from 'axios'

let Url = 'http://localhost:3000/api/v1/'

axios.interceptors.request.use(config => { //用请求拦截器添加token
  config.headers.Authorization = `Bearer ${window.sessionStorage.getItem('token')}`
  return config
})

axios.defaults.baseURL = Url

Vue.prototype.$http = axios