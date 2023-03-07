<template>
  <div class="detail-wrap">
    <h1>{{ detail.post?.title||'' }}</h1>
    <section v-html="detail.post?.Content||''" />
    <p
      v-for="(item,i) in detail.post?.comment"
      :key="item.id"
    >
      {{ i+1 }}楼：{{ item.content }}
    </p>
    <el-form style="margin-top: 25px">
      <el-form-item>
        <el-input
          v-model:model-value="comment"
          type="textarea"
        />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="post"
        >
          comment
        </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>

import {onMounted, reactive, ref} from "vue";
import http from "../http";
import {useRoute, useRouter} from "vue-router";
const router = useRoute()

let detail = reactive({
  post:{}
})
console.log(router)
const comment = ref<string>('')
const post = ()=> {
  http.post('/api/comment',{postId:router.query?.id,content:comment.value})
      .then(res=>{
        if(res.data){
          comment.value = ''
          getDetail()
        }
      })
}
const getDetail = ()=>{
  http.get(`/api/posts/detail`,{
    params:{
      id:router.query?.id
    }
  }).then(res=>{
    if(res.status===200){
      detail.post = res.data
    }
  })
}
onMounted(()=>{
  getDetail()
})
</script>

<style lang="less" scoped>
.detail-wrap {
  width: 1200px;
  margin: 0 auto;
  /deep/ img {
    width: 100%;
  }
  p {
    line-height: 35px;
    :first-child{
      margin-top: 25px;
    }
  }
}
</style>