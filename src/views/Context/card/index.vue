<!--页面-->
<template>
  <div class="item flex flex-col rounded">
    <img :src="data.image" style="width: 100%; height: 260px; border-radius: 5px" />
    <div class="flex flex-col rounded">
      <div class="topItem">
        <div class="title">{{ data.title }}</div>
        <div class="describe">
          <span>{{ formatDateToChinese(data.createTime) }}</span>
          <span>·&nbsp;{{ data.like || 1890 }}喜欢</span>
          <span>·&nbsp;{{ data.common || 2349 }}浏览</span>
          <span>·&nbsp;{{ data.common || 129 }}评论</span>
        </div>
      </div>
      <div class="output" v-html="output"></div>
    </div>
    <Common :blogId="data.id" />
  </div>
</template>

<script setup>
import { marked } from 'marked'
import hljs from 'highlight.js'
import { ref, watch, getCurrentInstance, onMounted, reactive, computed } from 'vue'
import { useRoute } from 'vue-router'
import { list, getBlog } from '@/api/blog'
import Common from '../common/index.vue'
const { proxy } = getCurrentInstance()
const route = useRoute()

const data = ref({})
const input = ref('')
const output = ref(null)

onMounted(async () => {
  const blogId = route.params && route.params.blogId
  const res = await getBlog(blogId)
  if (res.data) {
    data.value = res.data || {}
    input.value = data.value.text

    const renderer = new marked.Renderer()
    const options = {
      renderer: renderer, // 这个是必须填写的
      gfm: true, // 启动类似Github样式的Markdown,
      pedantic: false, // 只解析符合Markdown定义的，不修正Markdown的错误
      sanitize: false, // 原始输出，忽略HTML标签
      tables: true, // 支持Github形式的表格，必须打开gfm选项
      breaks: false, // 支持Github换行符，必须打开gfm选项
      smartLists: true, // 优化列表输出
      smartypants: false,
      highlight: function (code, language) {
        const validLanguage = hljs.getLanguage(language) ? language : 'plaintext'
        return hljs.highlight(validLanguage, code).value
      }
    }
    output.value = marked(input.value, options)
  }
})

// 时间格式转换
function formatDateToChinese(dateTimeString) {
  const dateTime = new Date(dateTimeString)
  const year = dateTime.getFullYear()
  const month = dateTime.getMonth() + 1
  const date = dateTime.getDate()
  const hour = dateTime.getHours()
  const minute = dateTime.getMinutes()
  const second = dateTime.getSeconds()
  return `${year}年${month}月${date}日 ${hour}时${minute}分${second}秒`
}
</script>
<style scoped src="./index.scss"></style>
