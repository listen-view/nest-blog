<template>
  <div class="form-box">
    <el-form label-width="80">
      <el-form-item label="title">
        <el-input v-model:model-value="formData.title" />
      </el-form-item>
      <el-form-item label="tag">
        <el-select
          v-model="formData.tags"
          multiple
          filterable
          allow-create
          default-first-option
          :reserve-keyword="false"
          placeholder="Choose tags for your article"
        >
          <el-option
            v-for="item in options"
            :key="item.content"
            :label="item.content"
            :value="item.content"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="">
        <div style="border: 1px solid #ccc">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            mode="default"
          />
          <Editor
            v-model="valueHtml"
            style="height: 500px; overflow-y: hidden"
            :default-config="{ placeholder: '请输入内容' }"
            mode="default"
            @onCreated="handleCreated"
          />
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="postForm"> submit </el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive, shallowRef, ref, onMounted } from "vue"
import { Toolbar, Editor } from "@wangeditor/editor-for-vue"
import "@wangeditor/editor/dist/css/style.css"
import http from "../http"
import { ElNotification } from "element-plus"
import { useRouter } from "vue-router"
const formData = reactive({
  Content: "",
  title: "",
  tags: []
})
const router = useRouter()
const options = ref<Array<{ content: string }>>([])
// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()

// 内容 HTML
const valueHtml = ref("<p></p>")

onMounted(() => {
  http.get("/api/tag").then((res) => {
    if (res.data) {
      options.value = res.data
    }
  })
})
const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const postForm = () => {
  if (!valueHtml.value) return
  http
    .post(
      "/api/posts",
      Object.assign({}, formData, {
        Content: valueHtml.value
      })
    )
    .then((res) => {
      if (res.status === 201) {
        ElNotification.success("发布成功！")
        router.push("/")
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
