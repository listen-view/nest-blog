<template>
  <p>user center</p>
  <div
    v-for="item in Object.keys(userMsg)"
    :key="item"
  >
    <span class="label">{{ item }}:</span>
    <span class="value">{{ userMsg[item] }}</span>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import http from "../http";

const userMsg = reactive<any>({})
onMounted(()=>{
  http.get('/api/user').then(res=>{
    if(res.data){
      Object.keys(res.data).forEach(k=>{
        userMsg[k] = res.data[k]
      })
    }
  })
})
</script>

<style scoped>

</style>