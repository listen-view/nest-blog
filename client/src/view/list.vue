<template>
  <div class="tags">
    <div class="container">
      <span
        v-for="tag in tags"
        :key="tag.id"
        class="tag"
        :class="routeMsg.query?.tag === tag.content && 'active'"
        @click="routerIns.push(`/list?tag=${tag.content}`)"
        >{{ tag.content || tag.label }}</span
      >
    </div>
  </div>
  <section>
    <div v-for="item in bolgList" :key="item.id" class="post">
      <p>{{ item.author }}</p>
      <router-link :to="`/detail?id=${item.id}`">
        {{ item.title }}
      </router-link>
      <div>{{ replaceTag(item.Content) }}</div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import axios from "axios"
import { onMounted, ref, watchEffect } from "vue"
import http from "../http"
import { useRoute, useRouter } from "vue-router"

const routerIns = useRouter()
const routeMsg = useRoute()
const bolgList = ref<any[]>([])
const tags = ref<any[]>([])
const replaceTag = (html: string) => {
  return html.replace(/<\/?[\s|\S].?>/g, "")
}
onMounted(() => {
  http.get("/api/tag").then((res) => {
    if (res.data)
      tags.value = [
        {
          label: "全部",
          content: ""
        }
      ].concat(res.data)
  })
})
watchEffect(() => {
  http
    .get("/api/posts", {
      params: { tag: routeMsg.query?.tag }
    })
    .then((res) => {
      if (res.status === 200) {
        bolgList.value = res.data
      }
    })
})
</script>

<style lang="less" scoped>
section {
  width: 800px;
  box-sizing: border-box;
  margin: 0 auto;
  background: #fff;
  padding: 30px;
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
.tags {
  background: #fff;
  box-shadow: 0 1px 2px 0 rgb(0 0 0 / 5%);
  margin-bottom: 20px;
  .container {
    display: flex;
    height: 35px;
    width: 800px;
    margin: 0 auto;
    justify-content: flex-start;
    align-items: center;
    .tag {
      cursor: pointer;
      color: #71717c;
      padding: 0 15px;
      &:first-child {
        padding-left: 0;
      }
      &:hover {
        color: #d23669;
      }
      &.active {
        color: #d23669;
      }
    }
  }
}
</style>
