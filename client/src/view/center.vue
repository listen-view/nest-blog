<template>
  <div class="center-page">
    <div class="user-base">
      <p class="module-title">
        基础信息
      </p>
      <div class="actions">
        <el-button
          v-if="!isEdit"
          type="primary"
          @click="isEdit = true"
        >
          edit
        </el-button>
        <el-button
          v-else
          type="danger"
          @click="update"
        >
          save
        </el-button>
        <el-button
          v-if="isEdit"
          @click="isEdit = false"
        >
          cancel
        </el-button>
      </div>
      <el-form>
        <el-form-item label="用户名：">
          <p>{{ userMsg.userName }}</p>
        </el-form-item>
        <el-form-item label="昵称：">
          <p v-if="!isEdit">
            {{ userMsg.nickName }}
          </p>
          <el-input
            v-else
            v-model="userMsg.nickName"
          />
        </el-form-item>
        <el-form-item label="邮箱：">
          <p v-if="!isEdit">
            {{ userMsg.email }}
          </p>
          <el-input
            v-else
            v-model="userMsg.email"
          />
        </el-form-item>
        <el-form-item label="头像：">
          <p>{{ userMsg.avatar }}</p>
        </el-form-item>
      </el-form>
    </div>
    <div class="user-post">
      <p class="module-title">
        我的文章
      </p>
      <div
        v-for="item in userMsg.post"
        :key="item.title"
        class="post"
      >
        <router-link :to="`/detail?id=${item.id}`">
          {{ item.title }}
        </router-link>
        <div class="content">
          {{ item.Content }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, reactive, ref } from "vue"
import http from "../http"

const isEdit = ref(false)
const userMsg = reactive<any>({})
onMounted(() => {
  getUser()
})

const getUser = () => {
  http.get("/api/user").then((res) => {
    if (res.data) {
      Object.keys(res.data).forEach((k) => {
        userMsg[k] = res.data[k]
      })
    }
  })
}

const update = () => {
  http
    .post("/api/user/update", userMsg)
    .then((res) => {
      console.log(res)
      getUser()
    })
    .finally(() => {
      isEdit.value = false
    })
}
</script>

<style lang="less" scoped>
.center-page {
  display: flex;
  background: #fff;
  padding: 30px;
  align-items: center;
  flex-direction: column;
  width: 1200px;
  margin: 0 auto;
}

.module-title {
  text-align: center;
  font-size: 18px;
  font-weight: bold;
}

.user-base {
  width: 100%;
  position: relative;

  .actions {
    position: absolute;
    top: 0;
    right: 0;
  }
}

.user-post {
  width: 100%;
  margin-top: 30px;

  .post {
    margin-bottom: 20px;

    a {
      font-size: 18px;
      font-weight: bold;
      text-decoration: none;
    }

    div {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
  }
}
</style>
