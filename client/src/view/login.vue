<template>
  <el-dialog
    v-bind="$attrs"
    class="form-box"
  >
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
  </el-dialog>
</template>

<script lang="ts" setup>
import {reactive, shallowRef, ref, onMounted, getCurrentInstance} from "vue";
import '@wangeditor/editor/dist/css/style.css'
import http from "../http";
import {setToken} from '../utils/token'
import {useRouter} from "vue-router";
import {useUser} from "../store/user";
const formData = reactive({
  username:'',
  password: '',
})

const router = useRouter()
const user = useUser()
const emits = defineEmits(['close'])

const postForm = ()=>{
  http.post('/api/auth',Object.assign({},formData,)).then(res=>{
    if(res.status===201){
      setToken(res.data.access_token)
      user.fetchUser()
      emits('close')
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