import {defineStore} from "pinia";
import http from "../http";

export const useUser = defineStore('user',{
  state(){
    return{
      user:{}
    }
  },
  actions:{
    async fetchUser(){
      try {
        const res = await http.post('/api/auth/msg')
        this.user = res.data
      }catch (e){
        console.log(e)
      }
    }
  }
})