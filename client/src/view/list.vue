<template>
  <h1>it is home</h1>
  <section>
    <div
      v-for="item in bolgList"
      :key="item.id"
      class="post"
    >
      <p>{{ item.author }}</p>
      <router-link :to="`/detail?id=${item.id}`">
        {{ item.title }}
      </router-link>
      <div>{{ replaceTag(item.Content) }}</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import axios from 'axios'
import {onMounted, ref} from 'vue'
import http from "../http";

const bolgList = ref<any[]>([])
const replaceTag = (html:string) => {
  return html.replace(/<\/?[\s|\S].?>/g,'')
}
onMounted(() => {
  http.get('/api/posts').then(res => {
    if (res.status === 200) {
      bolgList.value = res.data
    }
  })
})
</script>

<style lang="less" scoped>
section {
  width: 800px;
  margin: 0 auto;
}
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
</style>
