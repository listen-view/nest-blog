<template>
  <p>register center</p>
  <div class="register-box">
    <el-form label-width="120">
      <el-form-item label="username">
        <el-input v-model:model-value="formData.userName"></el-input>
      </el-form-item>
      <el-form-item label="nickName">
        <el-input v-model:model-value="formData.nickName"></el-input>
      </el-form-item>
      <el-form-item label="password">
        <el-input type="password" v-model:model-value="formData.password"></el-input>
      </el-form-item>
      <el-form-item label="email">
        <el-input v-model:model-value="formData.email"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">submit</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {onMounted, reactive} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const formData = reactive({
  userName:'',
  nickName:'',
  email:'',
  avatar:'ddd',
  password:''
})
const submit = ()=>{
  axios.post('/api/user',formData).then((res:any)=>{
    if(res?.data?.data?.msg==='ok'){
      useRouter().push('/login')
    }
  })
}
</script>

<style lang="less" scoped>
p {
  text-align: center;
  position: absolute;
  font-size: 24px;
  font-weight: bold;
  left: 0;
  right: 0;
  top: 25%;
}
.register-box {
  width: 800px;
  position: absolute;
  top: 50%;
  left: 50%;
  box-shadow: 1px 1px 3px rgba(0,0,0,.3);
  padding: 20px 10px;
  border-radius: 3px;
  transform: translate(-50%,-50%);
}
</style>