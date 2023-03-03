<template>
  <div class="form-box">
    <el-form>
      <el-form-item label="userName">
        <el-input v-model:model-value="formData.username" />
      </el-form-item>
      <el-form-item label="password">
        <el-input
          v-model:model-value="formData.password"
          type="password"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="postForm"
        >
          submit
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import {reactive,shallowRef,ref} from "vue";
import '@wangeditor/editor/dist/css/style.css'
import http from "../http";
import {setToken} from '../utils/token'
import {useRouter} from "vue-router";
const formData = reactive({
  username:'',
  password: '',
})

const router = useRouter()

const postForm = ()=>{
  http.post('/api/auth',Object.assign({},formData,)).then(res=>{
    if(res.status===201){
      setToken(res.data.access_token)
      router.replace('/')
    }
  })
}
</script>

<style scoped>
.form-box {
  width: 600px;
  margin: 0 auto;
}
</style>