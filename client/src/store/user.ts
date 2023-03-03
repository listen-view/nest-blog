import {defineStore} from "pinia";

export const useUser = defineStore('user',{
  state(){
    return{
      user:{}
    }
  },
  actions:{
    fetchUser(state:object){
      this.user = state
    }
  }
})