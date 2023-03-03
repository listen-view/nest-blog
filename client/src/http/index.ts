import axios from "axios";
import {getToken} from '../utils/token'
import {ElNotification} from "element-plus";
const http = axios.create({
  timeout:10000
})
http.interceptors.request.use(function (config){
  config.headers['Authorization'] = `Bearer ${getToken()}`
  return config
})
http.interceptors.response.use((res)=>{
  return res.data
},(err)=>{
  if(err.response?.data?.message){
    ElNotification.error(err.response?.data?.message)
  }
  return Promise.reject(err.response)
})
export default http