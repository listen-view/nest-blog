<template>
  <div class="header">
    <div class="header-left">
      <svg
        t="1677936768373"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2815"
        width="200"
        height="200"
      ><path
        d="M853.344 0 170.656 0C76.416 0 0 76.416 0 170.688l0 682.624C0 947.584 76.416 1024 170.656 1024l682.688 0c94.24 0 170.656-76.416 170.656-170.688L1024 170.688C1024 76.416 947.584 0 853.344 0zM896 648.096C896 785.088 784.512 896 646.56 896L377.728 896C239.872 896 128 785.088 128 648.096L128 376c0.096-136.992 111.872-248 249.728-248l125.856 0C641.568 128 752 231.008 752 368c1.792 25.696 24.928 48 51.296 48l0.896 0 42.144 0C873.92 416 896 444.928 896 472.32L896 648.096zM704 640c0 35.2-28.8 64-64 64L384 704c-35.2 0-64-28.8-64-64l0 0c0-35.2 28.8-64 64-64l256 0C675.2 576 704 604.8 704 640L704 640zM576 384c0 35.2-28.8 64-64 64l-128 0c-35.2 0-64-28.8-64-64l0 0c0-35.2 28.8-64 64-64l128 0C547.2 320 576 348.8 576 384L576 384z"
        fill="#000000"
        p-id="2816"
      /></svg>
      <router-link to="/">
        home
      </router-link>
      <router-link to="/post">
        go to create a blog
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
        @click="showLogin=true"
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
  <login
    v-model="showLogin"
    @close="showLogin=false"
  />
</template>

<script lang="ts" setup>
import login from '../view/login.vue'
import {ref} from 'vue'
import {useUser} from '../store/user'
const userStore = useUser()
const showLogin = ref(false)
</script>

<style lang="less" scoped>
.header{
  display: flex;
  height: 50px;
  background: #fff;
  justify-content: flex-end;
  padding: 0 20px;
  border-bottom: 1px solid #cccccc;
  a {
    margin-right: 15px;
  }
  .header-left,.header-right {
    flex: 1;
    align-items: center;
    display: flex;
    svg {
      width: 35px;
      margin-right: 15px;
      height: 35px;
    }
  }
  .header-right {
    display: flex;
    justify-content: flex-end;
  }
}
</style>