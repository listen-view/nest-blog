const TOKEN_KEY = 'access_token'
export const getToken = ():string=>{
  return sessionStorage.getItem(TOKEN_KEY)||''
}

export const setToken = (value:string)=>{
  return sessionStorage.setItem(TOKEN_KEY,value)
}