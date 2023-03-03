<template>
  <div class="header">
    <div class="header-left">
      <router-link to="/">
        home
      </router-link>
      <router-link to="/post">
        go create a blog
      </router-link>
    </div>
    <div
      v-if="!Object.keys(userStore.user).length"
      class="header-right"
    >
      <el-button
        class="header-right__register"
        @click="$router.push('/register')"
      >
        sign up
      </el-button>
      <el-button
        class="header-right__login"
        type="primary"
        @click="$router.push('/login')"
      >
        login
      </el-button>
    </div>
    <div
      v-else
      class="right"
    >
      <router-link to="/center">
        {{ userStore.user?.userName }}
      </router-link>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {useUser} from '../store/user'
const userStore = useUser()
</script>

<style lang="less" scoped>
.header{
  display: flex;
  height: 50px;
  align-items: center;
  margin-bottom: 20px;
  justify-content: flex-end;
  padding: 0 20px;
  a {
    margin-right: 15px;
  }
  .header-left,.header-right {
    flex: 1;
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>